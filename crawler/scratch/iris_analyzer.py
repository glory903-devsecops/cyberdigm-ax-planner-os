import time
from playwright.sync_api import sync_playwright

def save_iris_source():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        print("🌐 IRIS 공고 페이지 접속 중...")
        try:
            page.goto("https://www.iris.go.kr/contents/retrieveBsnsAncmList.do", wait_until="networkidle", timeout=60000)
            time.sleep(5) # 추가 로딩 대기
            html = page.content()
            with open("iris_source.html", "w", encoding="utf-8") as f:
                f.write(html)
            print("✅ HTML 소스 저장 완료: iris_source.html")
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    save_iris_source()
