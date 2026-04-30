import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """TIPA 중소기업기술정보진흥원 (SMTECH) 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # SMTECH은 pageIndex 파라미터 사용
        url = f"{self.url_tpl}?buclYy=&searchCondition=&searchKeyword=&pageIndex={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(3000)

        # 테이블 행 추출
        rows = page.query_selector_all("table.list_type01 tbody tr")
        if not rows:
            # 대안 선택자
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

                # 3번째 또는 4번째 컬럼이 제목 (구조에 따라 다름)
                # tipa_list.html 분석 결과:
                # td 0: 번호
                # td 1: 시스템구분 (SMTECH/IRIS)
                # td 2: 사업명
                # td 3: 공고명 (제목)
                # td 4: 접수기간
                
                system_type = cols[1].inner_text().strip()
                title_el = cols[3].query_selector("a.board")
                if not title_el:
                    # 가끔 구조가 다르면 td[2] 시도
                    title_el = cols[2].query_selector("a.board")
                    if not title_el: continue

                title = title_el.inner_text().strip()
                href = title_el.get_attribute("href") or ""
                
                # IRIS 이동 버튼은 제외 (상세 페이지가 없음)
                if "goMove" in href or system_type == "IRIS":
                    detail_url = "http://www.iris.go.kr"
                    # 실제 TIPA 공고만 수집하려면 여기서 continue 가능
                    # 하지만 목록 유지를 위해 일단 포함
                else:
                    if href.startswith("/"):
                        detail_url = f"https://www.smtech.go.kr{href}"
                    else:
                        detail_url = href

                # 기간 추출 (td 4)
                date_text = cols[4].inner_text().strip() if len(cols) > 4 else ""
                app_start = None
                app_end = None
                
                # 2026. 04. 28 ~ 2026. 05. 12
                match_dates = re.findall(r"(\d{4}\.\s?\d{2}\.\s?\d{2})", date_text)
                if len(match_dates) >= 2:
                    app_start = match_dates[0].replace(". ", "-").replace(".", "-")
                    app_end = match_dates[1].replace(". ", "-").replace(".", "-")
                elif len(match_dates) == 1:
                    app_start = match_dates[0].replace(". ", "-").replace(".", "-")

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "tipa_" + hashlib.md5(f"{title}_{app_start}".encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "중소기업기술정보진흥원(TIPA)",
                    "category":          "R&D",
                    "application_start": app_start,
                    "application_end":   app_end,
                    "deadline":          app_end,
                    "source":            "tipa",
                    "source_url":        detail_url,
                    "status":            "공고중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
