import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """KIAT 한국산업기술진흥원 (K-pass) 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # K-pass는 pageIndex 파라미터 사용
        url = f"{self.url_tpl}?pageIndex={page_num}"
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
                if len(cols) < 4:
                    continue

                # 제목 (td.subject)
                subject_td = row.query_selector("td.subject")
                if not subject_td:
                    continue
                
                title_el = subject_td.query_selector("span")
                if not title_el:
                    continue
                
                title = title_el.inner_text().strip()
                
                # onclick="javascript:ancList.ancView('P3023', 'NEW');" 에서 ID 추출
                onclick = title_el.get_attribute("onclick") or ""
                match = re.search(r"ancView\('(.+?)'", onclick)
                if match:
                    anc_id = match.group(1)
                    detail_url = f"https://www.k-pass.kr/notice/ancDetailView.do?ancId={anc_id}"
                else:
                    detail_url = url

                # 날짜 및 상태 추출 (td 4)
                date_td = cols[3]
                date_text = date_td.inner_text().strip()
                
                app_start = None
                app_end = None
                
                # 2026-04-22 ~ 2026-05-21
                match_dates = re.findall(r"(\d{4}-\d{2}-\d{2})", date_text)
                if len(match_dates) >= 2:
                    app_start = match_dates[0]
                    app_end = match_dates[1]
                elif len(match_dates) == 1:
                    app_start = match_dates[0]

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "kiat_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "한국산업기술진흥원(KIAT)",
                    "category":          "R&D",
                    "application_start": app_start,
                    "application_end":   app_end,
                    "deadline":          app_end,
                    "source":            "kiat",
                    "source_url":        detail_url,
                    "status":            "공고중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
