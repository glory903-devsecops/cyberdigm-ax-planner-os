"""
template.py — 새 사이트 추가용 크롤러 템플릿
사용법:
  1. 이 파일을 복사: cp template.py 새사이트id.py
  2. class Crawler 의 crawl_page() 를 해당 사이트에 맞게 구현
  3. sites.yaml 에 사이트 블록 추가 후 enabled: true
"""
import hashlib
from datetime import datetime
from playwright.sync_api import Page
from supabase import Client

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler


class Crawler(BaseCrawler):
    """
    ────────────────────────────────────────────
    새 사이트 크롤러 — 아래 메서드만 수정하세요
    ────────────────────────────────────────────
    """

    # (선택) 로그인이 필요한 사이트만 구현. 불필요하면 삭제.
    def login(self, page: Page) -> bool:
        """
        예시:
            self.goto(page, "https://example.com/login")
            page.fill("#username", self.credentials["username"])
            page.fill("#password", self.credentials["password"])
            page.click("#login-btn")
            page.wait_for_url("**/dashboard**")
            return True
        """
        return True  # 로그인 불필요 시 그대로 유지

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        """
        한 페이지의 공고를 파싱해 dict 리스트로 반환.

        필수 키: source_id, title, source, source_url, crawled_at
        선택 키: agency, category, application_start, application_end, deadline, status
        """
        url = self.page_url(page_num)
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        items = []

        # ── 여기부터 사이트별 파싱 로직 구현 ──────────────
        #
        # 예시 (테이블 구조 사이트):
        #   rows = page.query_selector_all("table tbody tr")
        #   for row in rows:
        #       cols = row.query_selector_all("td")
        #       title = cols[1].inner_text().strip()
        #       ...
        #
        # 예시 (카드/리스트 구조 사이트):
        #   cards = page.query_selector_all(".notice-item")
        #   for card in cards:
        #       title = card.query_selector("h3").inner_text()
        #       ...
        #
        # 키워드 필터 (공통):
        #   if not self.is_relevant(title, category):
        #       continue
        #
        # source_id 생성 (URL 기반 중복 방지):
        #   source_id = "사이트id_" + hashlib.md5(href.encode()).hexdigest()[:12]
        # ─────────────────────────────────────────────────

        return items
