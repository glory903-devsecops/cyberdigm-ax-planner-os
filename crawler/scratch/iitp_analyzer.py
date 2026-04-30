import time
from playwright.sync_api import sync_playwright

def analyze_iitp():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        url = "https://www.iitp.kr/kr/1/business/businessAnnouncement/list.it"
        print(f"🌐 IITP 접속 중: {url}")
        
        try:
            page.goto(url, wait_until="networkidle", timeout=60000)
            time.sleep(5) # 동적 로딩 대기
            
            # 리스트가 포함된 테이블 또는 구역 찾기
            # 보통 .board_list, .list_type1, table 등을 사용함
            page.screenshot(path="iitp_debug.png")
            
            content = page.content()
            with open("iitp_rendered.html", "w", encoding="utf-8") as f:
                f.write(content)
            print("✅ 렌더링된 HTML 저장 완료: iitp_rendered.html")
            
            # 대략적인 구조 파악을 위해 텍스트 출력
            rows = page.query_selector_all("table tbody tr")
            print(f"🧐 발견된 행 개수: {len(rows)}")
            
            if rows:
                first_row = rows[0].inner_text().replace("\n", " ").strip()
                print(f"📝 첫 번째 행 샘플: {first_row}")
                
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    analyze_iitp()
