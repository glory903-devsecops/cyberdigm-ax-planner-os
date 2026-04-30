import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """K-Startup 창업지원포털 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # K-Startup은 page 파라미터 사용
        url = f"{self.url_tpl}?page={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(3000)

        # 공고 아이템 추출 (slide 또는 일반 리스트 아이템)
        items = page.query_selector_all("div.slide a, ul.biz_p_list li a")
        if not items:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for item in items:
            try:
                # onclick 또는 href에서 ID 추출 (javascript:go_view(177338);)
                link_attr = item.get_attribute("href") or ""
                match = re.search(r"go_view\((\d+)\)", link_attr)
                if not match:
                    continue
                
                pbanc_sn = match.group(1)
                detail_url = f"https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do?pbancSn={pbanc_sn}"

                # 제목 추출
                title_el = item.query_selector("p.tit")
                if not title_el:
                    continue
                title = title_el.inner_text().strip()

                # 날짜 추출 (마감일자 2026-05-13)
                date_el = item.query_selector("p.txt")
                deadline = None
                if date_el:
                    date_match = re.search(r"(\d{4}-\d{2}-\d{2})", date_el.inner_text())
                    if date_match:
                        deadline = date_match.group(1)

                # 기관 및 카테고리 (ul li)
                agency = "K-Startup"
                category = "창업지원"
                info_list = item.query_selector_all("ul li")
                if len(info_list) >= 2:
                    category = info_list[0].inner_text().strip()
                    agency = info_list[1].inner_text().strip()

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "kstartup_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            agency,
                    "category":          category,
                    "application_start": None,
                    "application_end":   deadline,
                    "deadline":          deadline,
                    "source":            "kstartup",
                    "source_url":        detail_url,
                    "status":            "모집중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        # 중복 제거 (Top 슬라이드와 일반 리스트 중복 방지)
        seen = set()
        unique_results = []
        for r in results:
            if r["source_id"] not in seen:
                unique_results.append(r)
                seen.add(r["source_id"])

        return unique_results
