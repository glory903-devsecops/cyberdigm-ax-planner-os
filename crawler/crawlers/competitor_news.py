import random
import time
import urllib.parse
from datetime import datetime
from playwright.sync_api import Page, sync_playwright
from base_crawler import BaseCrawler, CHROMIUM_ARGS, USER_AGENT, STEALTH_SCRIPT

class Crawler(BaseCrawler):
    def __init__(self, site_config, supabase_client=None):
        super().__init__(site_config, supabase_client)
        self.competitors = []

    def load_competitors(self):
        """DB에서 경쟁사 목록을 가져옵니다."""
        if self.supabase:
            try:
                response = self.supabase.table("competitors").select("id, name").execute()
                self.competitors = response.data
                print(f"  📡 Loaded {len(self.competitors)} competitors for tracking.")
            except Exception as e:
                print(f"  ⚠️ Failed to load competitors from DB: {e}")
        
        if not self.competitors:
            # Fallback for testing
            self.competitors = [{"id": None, "name": "S-Corp"}]

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        """BaseCrawler의 추상 메서드 구현 (직접 호출되지는 않음)"""
        return []

    def run(self):
        self.load_competitors()
        print("=" * 60)
        print(f"🌐 [{self.name}] 경쟁사 뉴스 모니터링 시작")
        print(f"   시작 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        all_news = []
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=CHROMIUM_ARGS)
            context = browser.new_context(user_agent=USER_AGENT)
            context.add_init_script(STEALTH_SCRIPT)
            page = context.new_page()

            for comp in self.competitors:
                raw_name = comp["name"]
                # 괄호와 국가명 제거 (예: S-Corp (Japan) -> S-Corp)
                name = raw_name.split('(')[0].strip()
                
                # 검색어 인코딩 (보안뉴스는 EUC-KR 사용 가능성 높음)
                try:
                    encoded_name = urllib.parse.quote(name.encode('euc-kr'))
                except:
                    encoded_name = urllib.parse.quote(name)
                
                # 보안뉴스(Boan News) 검색
                search_url = f"https://www.boannews.com/search/news_total.asp?search=all&find={encoded_name}"
                print(f"  🔍 '{name}' 검색 중... {search_url}")
                
                try:
                    page.goto(search_url, wait_until="networkidle", timeout=30000)
                    time.sleep(random.uniform(1, 2))
                    
                    # 뉴스 항목 추출 (보안뉴스 검색 결과 클래스: .news_list)
                    # 실제 구조에 맞춰 셀렉터 보강
                    news_items = page.query_selector_all(".news_list")
                    
                    if not news_items:
                        # 대체 셀렉터 시도
                        news_items = page.query_selector_all("div[class*='news_list']")
                    
                    count = 0
                    for item in news_items[:3]: # 최신 3건만
                        # 분석된 최신 셀렉터 적용
                        title_el = item.query_selector("span.news_txt")
                        if not title_el: 
                            title_el = item.query_selector("a.news_content font") # 대체
                        
                        if not title_el: continue
                        
                        title = title_el.inner_text().strip()
                        link_el = item.query_selector("a.news_content")
                        link = link_el.get_attribute("href") if link_el else "#"
                        
                        if link and not link.startswith("http"):
                            link = "https://www.boannews.com" + link
                            
                        news_data = {
                            "competitor_id": comp["id"],
                            "title": title,
                            "type": "News",
                            "impact": "Medium",
                            "summary": title,
                            "source_url": link,
                            "crawled_at": datetime.now().isoformat()
                        }
                        all_news.append(news_data)
                        count += 1
                    
                    print(f"  ✅ '{name}': {count}건 발견")
                    
                except Exception as e:
                    print(f"  ❌ '{name}' 검색 실패: {e}")
                
                time.sleep(random.uniform(1, 3))

            context.close()
            browser.close()

        # DB 저장
        total_saved = 0
        if self.supabase and all_news:
            try:
                # UUID가 없는 항목(테스트용)은 제외
                to_save = [n for n in all_news if n["competitor_id"] is not None]
                if to_save:
                    self.supabase.table("competitor_signals").upsert(to_save).execute()
                    total_saved = len(to_save)
                    print(f"  💾 {total_saved}건의 시그널을 Supabase에 저장했습니다.")
                else:
                    print("  ℹ️ 저장할 유효한 시그널이 없습니다. (DB competitor_id 누락)")
            except Exception as e:
                print(f"  ❌ DB 저장 오류: {e}")

        print(f"\n🎉 [{self.name}] 완료: 수집 {len(all_news)}건 | 저장 {total_saved}건")
        print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        return total_saved
