import hashlib
from datetime import datetime
from playwright.sync_api import Page

import sys, os
# 상위 디렉토리를 path에 추가하여 base_crawler를 임포트할 수 있게 함
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """IITP 정보통신기획평가원 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # IITP는 cpage 파라미터 사용
        url = f"{self.url_tpl}?cpage={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기 (Vue.js 로딩 대기)
        try:
            page.wait_for_selector(".board_list_area ul.list li", timeout=10000)
        except Exception:
            print("  ⚠️  목록 렌더링 타임아웃 (또는 데이터 없음)")
            return []

        # 리스트 아이템 추출 (.board_list_area 로 수정)
        items = page.query_selector_all(".board_list_area ul.list > li")
        if not items:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for item in items:
            try:
                # 1. 제목 및 상세 링크
                title_el = item.query_selector(".tit_area .tit")
                if not title_el:
                    continue
                
                title = title_el.inner_text().strip()
                href = title_el.get_attribute("href") or ""
                
                # 상세 링크 완성 (상대 경로 처리)
                # IITP는 보통 게시판 종류마다 base_url이 다를 수 있지만 여기선 기본 board_url 기준으로 생성
                if href.startswith("./"):
                    # 현재 URL의 기본 경로(S1T12C37/A/7/ 부분)와 합침
                    base_path = self.url_tpl.rsplit('/', 1)[0]
                    detail_url = f"{base_path}/{href[2:]}"
                else:
                    detail_url = "https://www.iitp.kr" + href if href.startswith("/") else href

                # 2. 등록일자 추출
                date_str = ""
                info_list = item.query_selector_all(".info_list_area ul.list li")
                for info in info_list:
                    if "등록일자" in info.inner_text():
                        date_el = info.query_selector(".txt")
                        if date_el:
                            date_str = date_el.inner_text().strip()
                        break
                
                # 날짜 정규화 (YYYY-MM-DD)
                if date_str:
                    date_str = date_str.replace(".", "-")

                # 3. 등록자 (Agency 성격)
                author = "정보통신기획평가원"
                # 첫번째 li가 보통 등록자
                author_el = item.query_selector(".info_list_area ul.list li")
                if author_el and "등록자" in author_el.inner_text():
                    txt_el = author_el.query_selector(".txt")
                    if txt_el:
                        author = f"IITP ({txt_el.inner_text().strip()})"

                # 관련성 체크 (BaseCrawler 기능 활용 - 키워드 필터링)
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "iitp_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            author,
                    "category":          "정부 과제", # 공지사항이지만 내용상 과제 관련이 많음
                    "application_start": date_str,
                    "application_end":   None,
                    "deadline":          None,
                    "source":            "iitp",
                    "source_url":        detail_url,
                    "status":            "공고중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
