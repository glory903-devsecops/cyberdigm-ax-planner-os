import time
from playwright.sync_api import sync_playwright

def simulate_iris_navigation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        print("🌐 IRIS 메인 페이지 접속 중...")
        page.goto("https://www.iris.go.kr/main.do", wait_until="networkidle")
        time.sleep(3)
        
        # 1. '사업정보' 메뉴 찾아서 클릭
        print("🖱️ '사업정보' 메뉴 클릭 중...")
        page.click("text=사업정보")
        time.sleep(2)
        
        # 2. '사업공고' 하위 메뉴 클릭
        # 스크린샷 1에서 보았던 구조 참고 (mnode -> mitem)
        print("🖱️ '사업공고' 하위 메뉴 클릭 중...")
        # 텍스트로 시도
        page.click("a:has-text('사업공고')")
        time.sleep(5)
        
        # 3. 결과 확인
        page.screenshot(path="iris_final_list.png")
        print("📸 최종 리스트 스크린샷 저장 완료: iris_final_list.png")
        
        has_table = page.query_selector("table") is not None
        print(f"🧐 테이블 발견 여부: {has_table}")
        
        if has_table:
            # 테이블 구조 분석
            rows = page.query_selector_all("table tbody tr")
            print(f"📊 수집된 행 개수: {len(rows)}")
            if len(rows) > 0:
                print("📝 데이터 예시:")
                print(rows[0].inner_text())
                
                # HTML 소스 저장
                with open("iris_final_source.html", "w", encoding="utf-8") as f:
                    f.write(page.content())
                print("✅ 최종 소스 저장 완료: iris_final_source.html")

        browser.close()

if __name__ == "__main__":
    simulate_iris_navigation()
