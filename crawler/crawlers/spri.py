import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """SPRi 소프트웨어정책연구소 크롤러 (산업 인텔리전스)"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # SPRi는 data_page 파라미터 사용
        url = f"{self.url_tpl}&data_page={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(2000)

        # 제목 및 링크 추출 (div.title a)
        title_els = page.query_selector_all("div.title a")
        # 날짜 추출 (li span.text)
        date_els = page.query_selector_all("ul.writer li span.text")
        
        # 날짜 필터링 (순수 날짜 텍스트만 추출)
        dates = []
        for de in date_els:
            txt = de.inner_text().strip()
            if re.search(r"\d{4}-\d{2}-\d{2}", txt):
                clean_date = re.sub(r"날짜|조회수", "", txt).strip()
                dates.append(clean_date)

        if not title_els:
            print("  ⚠️  보고서 목록을 찾을 수 없습니다.")
            return []

        results = []
        # 제목과 날짜의 개수가 다를 수 있으므로 인덱스 체크
        for i, t_el in enumerate(title_els):
            try:
                href = t_el.get_attribute("href") or ""
                # 'posts/view'가 포함된 링크만 유효한 보고서로 간주
                if "/posts/view/" not in href:
                    continue
                    
                detail_url = f"https://spri.kr{href}" if href.startswith("/") else href
                clean_title = t_el.inner_text().strip()
                
                # 날짜 매칭 (제목 i번째에 해당하는 날짜 i번째 사용)
                # 만약 날짜 개수가 부족하면 None 처리
                date_str = dates[i] if i < len(dates) else None

                # 관련성 체크 (반도체, AI 등)
                if not self.is_relevant(clean_title):
                    continue

                source_id = "spri_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             clean_title,
                    "agency":            "소프트웨어정책연구소",
                    "category":          "산업리서치(연구보고서)",
                    "application_start": date_str,
                    "application_end":   None,
                    "deadline":          None,
                    "source":            "spri",
                    "source_url":        detail_url,
                    "status":            "발행완료",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
