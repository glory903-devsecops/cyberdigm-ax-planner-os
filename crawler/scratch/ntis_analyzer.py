import time
from playwright.sync_api import sync_playwright

def find_ntis_notice_url():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        print("🌐 NTIS 메인 페이지 접속 중...")
        try:
            page.goto("https://www.ntis.go.kr/ThMain.do", wait_until="networkidle", timeout=60000)
            time.sleep(3)
            
            # '사업' 또는 '공고' 관련 키워드 메뉴 찾기
            print("🖱️ '국가R&D통합공고' 메뉴 탐색 중...")
            # 메뉴 구조가 복잡할 수 있으므로 텍스트로 시도
            # 보통 상단 메뉴나 퀵 링크에 있음
            page.screenshot(path="ntis_main_debug.png")
            
            # 직접 주소 추측 및 이동 시도 (검색 결과 기반)
            # NTIS는 보통 /rndtl/pntc/list.do 형식을 많이 씀
            target_url = "https://www.ntis.go.kr/rndtl/pntc/list.do"
            print(f"🚀 추정 공고 주소로 이동 시도: {target_url}")
            page.goto(target_url, wait_until="networkidle", timeout=60000)
            time.sleep(5)
            
            page.screenshot(path="ntis_list_debug.png")
            
            # 리스트 테이블 존재 확인
            has_table = page.query_selector("table") is not None
            print(f"🧐 테이블 발견 여부: {has_table}")
            
            if has_table:
                print("✅ 공고 목록 발견!")
                with open("ntis_source.html", "w", encoding="utf-8") as f:
                    f.write(page.content())
                print("💾 HTML 소스 저장 완료: ntis_source.html")
            else:
                print("❌ 테이블을 찾지 못했습니다. 다른 경로를 탐색해야 합니다.")
                
        except Exception as e:
            print(f"❌ 오류 발생: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    find_ntis_notice_url()
