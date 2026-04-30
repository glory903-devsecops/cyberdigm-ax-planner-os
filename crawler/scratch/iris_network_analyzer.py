import time
import json
from playwright.sync_api import sync_playwright

def analyze_iris_network():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        # 네트워크 요청 캡처
        requests = []
        page.on("request", lambda request: requests.append(request.url))
        
        print("🌐 IRIS 접속 및 네트워크 분석 중...")
        page.goto("https://www.iris.go.kr/contents/retrieveBsnsAncmList.do", wait_until="networkidle")
        time.sleep(10) # 충분히 대기
        
        # 스크린샷 저장 (눈으로 확인용)
        page.screenshot(path="iris_debug.png")
        print("📸 디버그 스크린샷 저장 완료: iris_debug.png")
        
        # 테이블 존재 여부 재확인
        has_table = page.query_selector("table") is not None
        print(f"🧐 테이블 발견 여부: {has_table}")
        
        if has_table:
            print("✅ 테이블 발견! 내부 텍스트 추출 중...")
            print(page.query_selector("table").inner_text()[:500])
        
        # API 의심 URL 필터링
        api_calls = [url for url in requests if ".do" in url or "api" in url]
        with open("iris_network.json", "w") as f:
            json.dump(api_calls, f, indent=2)
        print("📡 네트워크 로그 저장 완료: iris_network.json")
        
        browser.close()

if __name__ == "__main__":
    analyze_iris_network()
