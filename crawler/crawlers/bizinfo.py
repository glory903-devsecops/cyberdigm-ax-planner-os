"""
기업마당 (bizinfo.go.kr) 크롤러
BaseCrawler 상속 — crawl_page() 만 구현
"""
import hashlib
from datetime import datetime
from typing import Optional
from playwright.sync_api import Page
from supabase import Client

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

BASE_URL    = "https://www.bizinfo.go.kr"
COL_CATEGORY = 1
COL_TITLE    = 2
COL_PERIOD   = 3
COL_MINISTRY = 4


def _make_source_id(href: str) -> str:
    return "bizinfo_" + hashlib.md5(href.encode()).hexdigest()[:12]


def _parse_date(text: str) -> Optional[str]:
    if not text:
        return None
    text = text.strip().replace(".", "-").replace("/", "-")
    try:
        datetime.strptime(text, "%Y-%m-%d")
        return text
    except ValueError:
        return None


def _parse_period(period_text: str):
    app_start, app_end = None, None
    if "~" in period_text:
        parts = period_text.split("~")
        app_start = _parse_date(parts[0].strip())
        app_end   = _parse_date(parts[1].strip())
    return app_start, app_end


class Crawler(BaseCrawler):
    """기업마당 지원사업 공고 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        url = self.page_url(page_num)
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        rows = page.query_selector_all("table tbody tr")
        if not rows:
            print("  ⚠️  테이블 행 없음")
            return []

        items = []
        for row in rows:
            cols = row.query_selector_all("td")
            if len(cols) < 6:
                continue
            try:
                title    = cols[COL_TITLE].inner_text().strip()
                category = cols[COL_CATEGORY].inner_text().strip()
                period   = cols[COL_PERIOD].inner_text().strip()
                ministry = cols[COL_MINISTRY].inner_text().strip()

                link_el = cols[COL_TITLE].query_selector("a")
                if not link_el:
                    continue
                href = link_el.get_attribute("href") or ""
                detail_url = BASE_URL + href if href.startswith("/") else href

                if not self.is_relevant(title, category):
                    continue

                app_start, app_end = _parse_period(period)

                items.append({
                    "source_id":         _make_source_id(href),
                    "title":             title,
                    "agency":            ministry,
                    "category":          category,
                    "application_start": app_start,
                    "application_end":   app_end,
                    "deadline":          app_end,
                    "source":            "bizinfo",
                    "source_url":        detail_url,
                    "status":            "active",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })
            except Exception as e:
                print(f"  ⚠️  행 파싱 오류: {e}")
                continue

        return items
