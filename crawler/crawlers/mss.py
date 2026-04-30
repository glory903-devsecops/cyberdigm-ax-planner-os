import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """MSS 중소벤처기업부 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # MSS는 cpage 파라미터 사용
        url = f"{self.url_tpl}&cpage={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(3000)

        # 테이블 행 추출
        rows = page.query_selector_all("table.bss-list tbody tr")
        if not rows:
            # 대안 선택자
            rows = page.query_selector_all("table tbody tr")
            
        if not rows:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for row in rows:
            try:
                # 제목 (td.subject)
                subject_td = row.query_selector("td.subject")
                if not subject_td:
                    continue
                
                title_el = subject_td.query_selector("a")
                if not title_el:
                    continue
                
                title = title_el.inner_text().strip()
                
                # doBbsFView('86','1067781','16010100','1067781'); 에서 ID 추출
                onclick = title_el.get_attribute("onclick") or ""
                # 정규식으로 bcIdx(두번째 인자) 추출
                match = re.search(r"doBbsFView\('\d+','(\d+)'", onclick)
                if match:
                    bc_idx = match.group(1)
                    detail_url = f"https://www.mss.go.kr/site/smba/ex/bbs/View.do?cbIdx=86&bcIdx={bc_idx}"
                else:
                    detail_url = url

                # 날짜 추출 (보통 5번째 td)
                cols = row.query_selector_all("td")
                date_text = None
                for col in cols:
                    text = col.inner_text().strip()
                    if re.match(r"\d{4}\.\d{2}\.\d{2}", text):
                        date_text = text.replace(".", "-")
                        break

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "mss_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "중소벤처기업부(MSS)",
                    "category":          "정책",
                    "application_start": date_text,
                    "application_end":   None,
                    "deadline":          None,
                    "source":            "mss",
                    "source_url":        detail_url,
                    "status":            "진행중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
