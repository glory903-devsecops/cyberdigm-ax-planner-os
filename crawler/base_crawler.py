"""
base_crawler.py
모든 사이트 크롤러가 상속하는 추상 기반 클래스.

새 사이트 추가 방법:
1. crawlers/template.py 복사 → crawlers/새사이트.py
2. crawl_page() 구현 (해당 사이트 HTML 파싱)
3. sites.yaml 에 사이트 블록 추가하고 enabled: true
"""
import os
import time
import random
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

from playwright.sync_api import sync_playwright, Page, BrowserContext, TimeoutError as PlaywrightTimeout
from supabase import Client


# ──────────────────────────────────────────────────────
# Playwright 스텔스 초기화 스크립트 (봇 탐지 우회)
# ──────────────────────────────────────────────────────
STEALTH_SCRIPT = """
Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
Object.defineProperty(navigator, 'plugins',   { get: () => [1, 2, 3] });
Object.defineProperty(navigator, 'languages', { get: () => ['ko-KR', 'ko', 'en-US'] });
window.chrome = { runtime: {} };
"""

CHROMIUM_ARGS = [
    "--disable-blink-features=AutomationControlled",
    "--disable-dev-shm-usage",
    "--no-sandbox",           # GitHub Actions 필수
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--window-size=1920,1080",
]

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36"
)


class BaseCrawler(ABC):
    """
    모든 사이트 크롤러의 공통 기반 클래스.
    Playwright 스텔스 설정, Supabase 저장, 실행 흐름을 공통 처리한다.
    서브클래스는 crawl_page() 만 구현하면 된다.
    """

    def __init__(self, site_config: dict, supabase_client: Optional[Client]):
        self.site_id    = site_config["id"]
        self.name       = site_config["name"]
        self.url_tpl    = site_config["url"]          # {page} 플레이스홀더 포함 가능
        self.max_pages  = site_config.get("max_pages", 10)
        self.keywords   = site_config.get("keywords", [])
        self.frequency  = site_config.get("frequency", "daily")
        self.supabase   = supabase_client
        self.credentials = self._load_credentials(site_config)

    # ── 자격증명 로드 ──────────────────────────────────
    def _load_credentials(self, config: dict) -> dict:
        """sites.yaml credentials.username_env → 실제 환경변수 값으로 변환"""
        creds = config.get("credentials", {})
        return {
            "username": os.environ.get(creds.get("username_env", ""), ""),
            "password": os.environ.get(creds.get("password_env", ""), ""),
        }

    # ── 키워드 필터 ────────────────────────────────────
    def is_relevant(self, *texts: str) -> bool:
        """키워드 목록이 비어 있으면 전체 수집, 있으면 하나라도 포함 시 True (대소문자 무시)"""
        if not self.keywords:
            return True
        combined = " ".join(texts).lower()
        return any(kw.lower() in combined for kw in self.keywords)

    # ── URL 생성 ───────────────────────────────────────
    def page_url(self, page_num: int) -> str:
        return self.url_tpl.format(page=page_num)

    # ── 로그인 (필요 시 서브클래스에서 오버라이드) ──────
    def login(self, page: Page) -> bool:
        """
        로그인이 필요한 사이트는 이 메서드를 오버라이드한다.
        성공 시 True, 실패 시 False 반환.
        기본 구현: 로그인 불필요 → True 반환
        """
        return True

    # ── 페이지 파싱 (서브클래스 필수 구현) ─────────────
    @abstractmethod
    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        """
        한 페이지의 공고 데이터를 파싱해 반환.
        반환 형식: grants 테이블 컬럼과 일치하는 dict 리스트

        필수 키: source_id, title, source, source_url, crawled_at
        선택 키: agency, category, application_start, application_end,
                 deadline, budget, status
        """
        raise NotImplementedError

    # ── Supabase 저장 ──────────────────────────────────
    def save(self, grants: list[dict]) -> int:
        """Supabase grants 테이블에 upsert (source_id 기준 중복 방지)"""
        if not grants or not self.supabase:
            return 0
        try:
            self.supabase.table("grants").upsert(
                grants, on_conflict="source_id"
            ).execute()
            return len(grants)
        except Exception as e:
            print(f"  ❌ [{self.site_id}] Supabase 저장 오류: {e}")
            return 0

    # ── 공통 실행 흐름 ─────────────────────────────────
    def run(self) -> int:
        """Playwright 실행 → 로그인 → 페이지 크롤링 → 저장"""
        print("=" * 60)
        print(f"🌐 [{self.name}] 크롤러 시작")
        print(f"   시작 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

        total_collected = 0
        total_saved = 0

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=CHROMIUM_ARGS)
            context: BrowserContext = browser.new_context(
                user_agent=USER_AGENT,
                viewport={"width": 1920, "height": 1080},
                locale="ko-KR",
                timezone_id="Asia/Seoul",
                java_script_enabled=True,
                ignore_https_errors=True,
            )
            context.add_init_script(STEALTH_SCRIPT)
            page = context.new_page()

            # 로그인 (필요한 경우)
            if not self.login(page):
                print(f"  ❌ [{self.site_id}] 로그인 실패. 크롤링 중단.")
                browser.close()
                return 0

            # 페이지별 크롤링
            for page_num in range(1, self.max_pages + 1):
                try:
                    grants = self.crawl_page(page, page_num)
                except Exception as e:
                    print(f"  ❌ [{self.site_id}] 페이지 {page_num} 오류: {e}")
                    break

                if not grants and page_num == 1:
                    print(f"  📭 [{self.site_id}] 첫 페이지에서 관련 공고 없음.")
                    break
                elif not grants:
                    print(f"  📭 [{self.site_id}] 페이지 {page_num}: 마지막. 종료.")
                    break

                total_collected += len(grants)
                print(f"  ✅ [{self.site_id}] 페이지 {page_num}: {len(grants)}건 수집")

                if self.supabase:
                    saved = self.save(grants)
                    total_saved += saved
                    print(f"  💾 [{self.site_id}] Supabase 저장: {saved}건")
                else:
                    for g in grants:
                        print(f"    ✔ [{g.get('category', '-')}] {g['title'][:55]}")

                # 사람처럼 랜덤 딜레이
                time.sleep(1.5 + random.uniform(0, 1.0))

            context.close()
            browser.close()

        print(f"\n🎉 [{self.name}] 완료: 수집 {total_collected}건 | 저장 {total_saved}건")
        print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        return total_saved

    # ── 안전한 페이지 이동 ─────────────────────────────
    def goto(self, page: Page, url: str, wait: str = "networkidle") -> bool:
        """타임아웃 처리 포함 페이지 이동"""
        try:
            page.goto(url, wait_until=wait, timeout=30000)
            return True
        except PlaywrightTimeout:
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=20000)
                page.wait_for_timeout(3000)
                return True
            except Exception as e:
                print(f"  ❌ 페이지 로드 실패 ({url}): {e}")
                return False
