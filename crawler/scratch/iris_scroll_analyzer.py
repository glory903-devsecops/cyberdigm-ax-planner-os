import time
from playwright.sync_api import sync_playwright

def find_iris_list_data():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        print("🌐 IRIS 사업공고 페이지 직접 접속 중...")
        # 시뮬레이션 대신 성공했던 URL로 직접 시도 (로그인 리다이렉트 방지를 위해 referer 설정 고려 가능하나 일단 시도)
        page.goto("https://www.iris.go.kr/main.do", wait_until="networkidle")
        page.click("text=사업정보")
        page.click("a:has-text('사업공고')")
        time.sleep(5)
        
        # 스크롤 다운하여 데이터 로딩 유도
        print("📜 스크롤 다운 중...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(3)
        
        page.screenshot(path="iris_scrolled_list.png")
        print("📸 스크롤 리스트 스크린샷 저장 완료: iris_scrolled_list.png")
        
        # 모든 가능한 리스트 요소 확인
        selectors = ["table", ".list_table", ".board_list", "ul.list", ".announcement_list"]
        for sel in selectors:
            el = page.query_selector(sel)
            if el:
                print(f"✅ 셀렉터 발견: {sel}")
                print(f"📝 내용 일부: {el.inner_text()[:200]}")
        
        # 텍스트로 데이터 존재 여부 확인
        if "검색 결과가 없습니다" in page.content():
            print("📭 검색 결과가 없습니다.")
        else:
            # 전체 HTML 저장
            with open("iris_scrolled_source.html", "w", encoding="utf-8") as f:
                f.write(page.content())
            print("✅ 최종 소스 저장 완료: iris_scrolled_source.html")

        browser.close()

if __name__ == "__main__":
    find_iris_list_data()
