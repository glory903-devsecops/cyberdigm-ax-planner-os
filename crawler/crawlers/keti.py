import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """KETI 한국전자기술연구원 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # KETI는 pn 파라미터 사용
        url = f"{self.url_tpl}&pn={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(3000)

        # 테이블 행 추출
        rows = page.query_selector_all("table tbody tr")
        if not rows:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for row in rows:
            try:
                cols = row.query_selector_all("td")
                if len(cols) < 5:
                    continue

                # 제목 및 상세 링크 (td 1)
                title_el = cols[1].query_selector("a.subject")
                if not title_el:
                    continue

                title = title_el.inner_text().strip()
                href = title_el.get_attribute("href") or ""
                
                if href.startswith("/"):
                    detail_url = f"https://www.keti.re.kr{href}"
                else:
                    detail_url = href

                # 날짜 추출 (마지막 td)
                date_text = cols[-1].inner_text().strip()
                # YYYY-MM-DD 형식인지 확인
                if not re.match(r"\d{4}-\d{2}-\d{2}", date_text):
                    # 가끔 형식이 다르면 다른 td 확인
                    date_text = cols[5].inner_text().strip() if len(cols) > 5 else None

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "keti_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "한국전자기술연구원(KETI)",
                    "category":          "R&D",
                    "application_start": date_text,
                    "application_end":   None, # 목록에서 확인 불가
                    "deadline":          None,
                    "source":            "keti",
                    "source_url":        detail_url,
                    "status":            "공고중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
