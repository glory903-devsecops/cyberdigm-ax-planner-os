import time
from playwright.sync_api import sync_playwright

def analyze_iris_new_url():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        print("🌐 IRIS 새로운 공고 주소 접속 중...")
        page.goto("https://www.iris.go.kr/ntcn/PblntfcList.do", wait_until="networkidle")
        time.sleep(5)
        
        page.screenshot(path="iris_list_debug.png")
        print("📸 리스트 스크린샷 저장 완료: iris_list_debug.png")
        
        has_table = page.query_selector("table") is not None
        print(f"🧐 테이블 발견 여부: {has_table}")
        
        if has_table:
            rows = page.query_selector_all("table tbody tr")
            print(f"📊 행(Row) 개수: {len(rows)}")
            if len(rows) > 0:
                print("📝 첫 번째 행 텍스트:")
                print(rows[0].inner_text())
                # 상세 링크 확인
                link = rows[0].query_selector("a")
                if link:
                    print(f"🔗 링크 속성: {link.get_attribute('href')}")
                    print(f"🔗 링크 onclick: {link.get_attribute('onclick')}")

        browser.close()

if __name__ == "__main__":
    analyze_iris_new_url()
