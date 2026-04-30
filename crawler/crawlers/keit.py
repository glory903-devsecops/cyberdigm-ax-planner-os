import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """KEIT 한국산업기술기획평가원 (SROME) 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # SROME은 pageIndex 파라미터 사용
        url = f"{self.url_tpl}&pageIndex={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(3000)

        # 리스트 아이템 추출
        items = page.query_selector_all(".table_box")
        if not items:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for item in items:
            try:
                detail_area = item.query_selector(".table_box_detail")
                if not detail_area:
                    continue

                # 1. 제목 및 상세 링크 파싱
                title_el = detail_area.query_selector(".subject .title")
                if not title_el:
                    continue
                
                title = title_el.inner_text().strip()
                
                # onclick="f_detail('I20594', '2026'); return false;" 에서 ID와 연도 추출
                link_el = detail_area.query_selector(".subject a")
                onclick = link_el.get_attribute("onclick") or ""
                
                match = re.search(r"f_detail\('(.+?)', '(.+?)'\)", onclick)
                if match:
                    anncm_id = match.group(1)
                    anncm_year = match.group(2)
                    detail_url = f"https://srome.keit.re.kr/srome/biz/perform/opnnPrpsl/retrieveTaskAnncmDetailView.do?anncmId={anncm_id}&anncmYear={anncm_year}&prgmId=XPG201040000"
                else:
                    detail_url = url # 실패 시 현재 페이지라도 저장

                # 2. 날짜 및 기간 추출
                app_start = None
                app_end = None
                info_rows = detail_area.query_selector_all(".info p")
                for row in info_rows:
                    label = row.query_selector(".label")
                    value = row.query_selector(".value")
                    if label and value:
                        label_text = label.inner_text().strip()
                        val_text = value.inner_text().strip()
                        
                        if "접수기간" in label_text:
                            # 2026-04-06 09:00 ~ 2026-06-12 18:00
                            dates = val_text.split("~")
                            if len(dates) == 2:
                                app_start = dates[0].strip().split(" ")[0]
                                app_end = dates[1].strip().split(" ")[0]
                        elif "등록일" in label_text and not app_start:
                            app_start = val_text

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "keit_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "한국산업기술기획평가원(KEIT)",
                    "category":          "R&D",
                    "application_start": app_start,
                    "application_end":   app_end,
                    "deadline":          app_end,
                    "source":            "keit",
                    "source_url":        detail_url,
                    "status":            "공고중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
