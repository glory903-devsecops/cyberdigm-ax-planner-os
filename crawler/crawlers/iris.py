"""
IRIS (범부처통합연구지원시스템) 크롤러
- 리스트 구조: li 태그 기반
- 동적 로딩: Playwright wait_for_selector 활용
"""
import hashlib
import re
from datetime import datetime
from typing import Optional, List
from playwright.sync_api import Page
from supabase import Client

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from base_crawler import BaseCrawler

BASE_URL = "https://www.iris.go.kr"
DETAIL_URL_TPL = "https://www.iris.go.kr/ntcn/PblntfcDtlView.do?pblntfcId={id}"

class Crawler(BaseCrawler):
    """IRIS 사업공고 크롤러"""

    def login(self, page: Page) -> bool:
        # 비로그인 접근을 위해 메인에서 메뉴 클릭 시뮬레이션
        try:
            print("🌐 IRIS 메인 접속 및 메뉴 우회 중...")
            page.goto("https://www.iris.go.kr/main.do", wait_until="networkidle")
            page.click("text=사업정보")
            # 호버링이 필요한 경우를 대비해 확실히 클릭
            page.click("a:has-text('사업공고')", timeout=10000)
            # 리스트가 뜰 때까지 대기 (위 분석에서 찾은 li 구조 대기)
            page.wait_for_selector(".inst_title", timeout=20000)
            return True
        except Exception as e:
            print(f"  ❌ 메뉴 우회 실패: {e}")
            return False

    def crawl_page(self, page: Page, page_num: int) -> List[dict]:
        # IRIS는 페이지네이션이 자바스크립트 함수일 가능성이 높음
        # 1페이지는 이미 login()에서 도달함. 2페이지부터는 클릭 필요.
        if page_num > 1:
            try:
                # 페이지네이션 버튼 클릭 (1, 2, 3... 숫자로 된 버튼)
                pagination_btn = page.query_selector(f"text='{page_num}'")
                if not pagination_btn:
                    return []
                pagination_btn.click()
                page.wait_for_timeout(3000) # 로딩 대기
                page.wait_for_selector(".inst_title", timeout=10000)
            except Exception as e:
                print(f"  ⚠️ 페이지 {page_num} 이동 실패: {e}")
                return []

        rows = page.query_selector_all("li:has(.title)")
        if not rows:
            return []

        items = []
        for row in rows:
            try:
                # 1. 부처/기관 추출
                inst_el = row.query_selector(".inst_title")
                agency = inst_el.inner_text().strip() if inst_el else "IRIS"
                
                # 2. 제목 및 링크 추출
                title_el = row.query_selector(".title a")
                if not title_el:
                    continue
                title = title_el.inner_text().strip()
                
                # 3. ID 추출 (onclick 함수에서 ID 추출)
                onclick = title_el.get_attribute("onclick") or ""
                # f_bsnsAncmBtinSituListForm_view('ID', ...) 패턴
                match = re.search(r"view\('(\d+)'", onclick)
                if match:
                    item_id = match.group(1)
                    detail_url = DETAIL_URL_TPL.format(id=item_id)
                else:
                    item_id = hashlib.md5(title.encode()).hexdigest()[:12]
                    detail_url = BASE_URL

                # 4. 날짜 추출
                date_el = row.query_selector(".ancmDe")
                date_text = date_el.inner_text().replace("공고일자 :", "").strip() if date_el else ""
                
                # 5. 상태 추출
                status_el = row.query_selector(".rcveSttSeNmLst")
                status_text = status_el.inner_text().replace("공고상태 :", "").strip() if status_el else "active"

                # 키워드 필터링 (반도체, R&D 등)
                if not self.is_relevant(title, agency):
                    continue

                items.append({
                    "source_id": f"iris_{item_id}",
                    "title": title,
                    "agency": agency,
                    "category": "정부 과제",
                    "application_start": date_text, # IRIS는 목록에 종료일이 명확치 않은 경우가 많음
                    "application_end": None,
                    "deadline": None,
                    "source": "iris",
                    "source_url": detail_url,
                    "status": "active" if "접수중" in status_text else "closed",
                    "crawled_at": datetime.utcnow().isoformat(),
                })
            except Exception as e:
                print(f"  ⚠️ 행 파싱 오류: {e}")
                continue

        return items
