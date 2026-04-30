import hashlib
import re
from datetime import datetime
from playwright.sync_api import Page

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

class Crawler(BaseCrawler):
    """KRIT 국방기술진흥연구소 크롤러"""

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        # KRIT은 pageIndex 파라미터 사용 가능성 높음
        url = f"{self.url_tpl}&pageIndex={page_num}"
        print(f"  📄 페이지 {page_num} → {url}")

        if not self.goto(page, url):
            return []

        # 데이터 렌더링 대기
        page.wait_for_timeout(2000)

        # 공고 아이템 추출
        items = page.query_selector_all("ul.listType li")
        if not items:
            print("  ⚠️  공고 목록을 찾을 수 없습니다.")
            return []

        results = []
        for item in items:
            try:
                # a 태그 찾기
                link_el = item.query_selector("a")
                if not link_el:
                    continue

                # onclick에서 IDX 추출 (fnView('notice','','6329','1','','');)
                onclick = link_el.get_attribute("onclick") or ""
                match = re.search(r"fnView\([^,]+,[^,]+,'(\d+)'", onclick)
                if not match:
                    continue
                
                bbs_idx = match.group(1)
                detail_url = f"https://www.krit.re.kr/krit/bbs/notice_view.do?gotoMenuNo=05010000&bbsIdx={bbs_idx}"

                # 제목 추출 (span 태그 등 제외하고 텍스트만)
                title = link_el.inner_text().strip()
                # '공지' 또는 번호(숫자) 제거 로직
                title = re.sub(r"^(공지|\d+)\s*", "", title).strip()

                # 날짜 추출
                date_el = item.query_selector("li.date")
                date_str = None
                if date_el:
                    date_str = date_el.inner_text().strip()
                    # '작성일' 텍스트 제거
                    date_str = date_str.replace("작성일", "").strip()

                # 관련성 체크
                if not self.is_relevant(title):
                    continue

                # 고유 ID 생성
                source_id = "krit_" + hashlib.md5(detail_url.encode()).hexdigest()[:12]

                results.append({
                    "source_id":         source_id,
                    "title":             title,
                    "agency":            "국방기술진흥연구소",
                    "category":          "국방/방산",
                    "application_start": date_str,
                    "application_end":   None,
                    "deadline":          None,
                    "source":            "krit",
                    "source_url":        detail_url,
                    "status":            "모집중",
                    "crawled_at":        datetime.utcnow().isoformat(),
                })

            except Exception as e:
                print(f"  ⚠️  항목 파싱 오류: {e}")
                continue

        return results
