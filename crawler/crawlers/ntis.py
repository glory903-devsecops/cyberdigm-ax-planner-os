"""
NTIS (국가과학기술지식정보서비스) 크롤러
BaseCrawler 상속 — crawl_page() 구현
"""
import hashlib
from datetime import datetime
from typing import Optional
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

BASE_URL = "https://www.ntis.go.kr"
LIST_URL = "https://www.ntis.go.kr/rndgate/eg/un/ra/mng.do"

def _make_source_id(uid: str) -> str:
    return "ntis_" + uid

def _parse_date(text: str) -> Optional[str]:
    if not text:
        return None
    # 2026.04.24 -> 2026-04-24
    text = text.strip().replace(".", "-")
    try:
        # 날짜 형식 검증
        datetime.strptime(text, "%Y-%m-%d")
        return text
    except ValueError:
        return None

class Crawler(BaseCrawler):
    """NTIS 국가연구개발사업 통합공고 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # NTIS는 pageIndex 파라미터 사용
        url = f"{LIST_URL}?pageIndex={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 테이블 행 선택 (tbody tr)
        rows = page.query_selector_all("table tbody tr")
        if not rows:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        items = []
        for row in rows:
            try:
                # 1. 공고명 및 링크
                title_el = row.query_selector('td[data-title="공고명"] a')
                if not title_el:
                    continue
                
                title = title_el.inner_text().strip()
                href = title_el.get_attribute("href") or ""
                
                # roRndUid 파라미터 추출 (source_id용)
                import urllib.parse as urlparse
                parsed_href = urlparse.urlparse(href)
                query_params = urlparse.parse_qs(parsed_href.query)
                uid = query_params.get("roRndUid", [None])[0]
                
                if not uid:
                    # href에서 ID를 찾지 못할 경우 해시 사용
                    uid = hashlib.md5(href.encode()).hexdigest()[:12]
                
                detail_url = BASE_URL + href if href.startswith("/") else href

                # 2. 부처명 (Agency)
                agency_el = row.query_selector('td[data-title="부처명"]')
                agency = agency_el.inner_text().strip() if agency_el else "미정"

                # 3. 접수일 및 마감일
                start_el = row.query_selector('td[data-title="접수일"]')
                end_el = row.query_selector('td[data-title="마감일"]')
                
                app_start = _parse_date(start_el.inner_text()) if start_el else None
                app_end = _parse_date(end_el.inner_text()) if end_el else None

                # 4. 현황 (Status)
                status_el = row.query_selector('td[data-title="현황"]')
                status_text = status_el.inner_text().strip() if status_el else "정보없음"

                # 관련성 체크 (키워드 기반 필터링 - BaseCrawler 기능)
                if not self.is_relevant(title, agency):
                    continue

                items.append({
                    "source_id":         _make_source_id(uid),
                    "title":             title,
                    "agency":            agency,
                    "category":          "R&D", # NTIS는 기본적으로 R&D
                    "application_start": app_start,
                    "application_end":   app_end,
                    "deadline":          app_end,
                    "source":            "ntis",
                    "source_url":        detail_url,
                    "status":            status_text,
                    "crawled_at":        datetime.utcnow().isoformat(),
                })
            except Exception as e:
                print(f"  ⚠️  행 파싱 오류: {e}")
                continue

        return items
