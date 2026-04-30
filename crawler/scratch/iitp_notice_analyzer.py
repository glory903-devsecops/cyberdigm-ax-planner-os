import time
from playwright.sync_api import sync_playwright

def analyze_iitp_notice():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 공지사항 리스트 주소
        url = "https://www.iitp.kr/web/lay1/bbs/S1T12C37/A/7/list.do"
        print(f"🌐 IITP 공지사항 접속 중: {url}")
        
        try:
            page.goto(url, wait_until="networkidle", timeout=60000)
            time.sleep(7) # 넉넉하게 대기
            
            # 리스트 구조 파악을 위한 스크린샷
            page.screenshot(path="iitp_notice_debug.png")
            
            # 렌더링된 HTML 저장
            content = page.content()
            with open("iitp_notice_rendered.html", "w", encoding="utf-8") as f:
                f.write(content)
            
            # 리스트 아이템 탐색
            # 1. table 기반인지 확인
            rows = page.query_selector_all("table tbody tr")
            print(f"🧐 발견된 Table 행 개수: {len(rows)}")
            
            # 2. 만약 table이 아니라면 ul/li 또는 div 기반일 수 있음
            if len(rows) == 0:
                list_items = page.query_selector_all(".board_list li, .list_type1 li, .list li")
                print(f"🧐 발견된 List 아이템 개수: {len(list_items)}")
                if list_items:
                    print(f"📝 첫 번째 아이템 샘플: {list_items[0].inner_text().strip()[:100]}")
            else:
                print(f"📝 첫 번째 행 샘플: {rows[0].inner_text().strip()[:100]}")
                
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    analyze_iitp_notice()
