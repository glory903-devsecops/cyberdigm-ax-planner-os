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
        self.search_keywords = site_config.get("search_keywords", ["문서관리 솔루션", "전자문서", "문서중앙화"])

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
            # Fallback
            self.competitors = [{"id": None, "name": "사이버다임"}]

    def crawl_page(self, page: Page, page_num: int) -> list[dict]:
        """BaseCrawler의 추상 메서드 구현 (직접 호출되지는 않음)"""
        return []

    def run(self):
        self.load_competitors()
        print("=" * 60)
        print(f"🌐 [{self.name}] 구글 키워드 모니터링 시작")
        print(f"   시작 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        all_news = []
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=CHROMIUM_ARGS)
            context = browser.new_context(user_agent=USER_AGENT)
            context.add_init_script(STEALTH_SCRIPT)
            page = context.new_page()

            for comp in self.competitors:
                for kw in self.search_keywords:
                    query = f"{comp['name']} {kw}"
                    encoded_query = urllib.parse.quote(query)
                    
                    # 구글 뉴스 탭 검색
                    search_url = f"https://www.google.com/search?q={encoded_query}&tbm=nws"
                    print(f"  🔍 '{query}' 검색 중... {search_url}")
                    
                    try:
                        page.goto(search_url, wait_until="networkidle", timeout=30000)
                        time.sleep(random.uniform(2, 4)) # 구글은 조금 더 천천히
                        
                        # 뉴스 항목 추출 (구글 검색 결과 클래스: div.SoE5Pr, div.n0vPhd, div.UP5eCc 등)
                        # 2024년 기준 구글 뉴스 검색 결과 셀렉터
                        news_items = page.query_selector_all("div[data-ved][class*='SoE5Pr'], div[class*='n0vPhd']")
                        
                        if not news_items:
                            # 대체 셀렉터 (일반 검색 결과 혹은 다른 구조)
                            news_items = page.query_selector_all("a[data-ved] h3")
                        
                        count = 0
                        for item in news_items[:5]: # 상위 5건
                            # h3가 제목인 경우가 많음
                            title_el = item.query_selector("h3") if item.name != "h3" else item
                            if not title_el: continue
                            
                            title = title_el.inner_text().strip()
                            
                            # 부모 링크 찾기
                            link_el = item.query_selector("xpath=ancestor::a") if item.name == "h3" else item.query_selector("xpath=ancestor::a")
                            # 만약 item 자체가 a이면
                            if not link_el and item.tag_name == "a":
                                link_el = item
                            
                            link = link_el.get_attribute("href") if link_el else "#"
                            
                            if not link or link == "#": continue
                            
                            # 중복 방지 (간단히 제목 기준)
                            if any(n["title"] == title for n in all_news):
                                continue

                            news_data = {
                                "competitor_id": comp["id"],
                                "title": title,
                                "type": "Google News",
                                "impact": "Medium",
                                "summary": f"Google 검색 결과: {kw} 관련 소식",
                                "source_url": link,
                                "crawled_at": datetime.now().isoformat()
                            }
                            all_news.append(news_data)
                            count += 1
                        
                        print(f"  ✅ '{query}': {count}건 발견")
                        
                    except Exception as e:
                        print(f"  ❌ '{query}' 검색 실패: {e}")
                    
                    time.sleep(random.uniform(3, 6)) # 구글 밴 방지를 위해 딜레이 강화

            context.close()
            browser.close()

        # DB 저장 (competitor_signals 테이블 공유)
        total_saved = 0
        if self.supabase and all_news:
            try:
                to_save = [n for n in all_news if n["competitor_id"] is not None]
                if to_save:
                    # 제목과 competitor_id가 같으면 덮어쓰기 (upsert는 유니크 제약 필요, 여기서는 단순히 삽입 시도)
                    # 실제 서비스에서는 title 등을 유니크 키로 잡는 것이 좋음
                    self.supabase.table("competitor_signals").upsert(to_save).execute()
                    total_saved = len(to_save)
                    print(f"  💾 {total_saved}건의 구글 검색 시그널을 Supabase에 저장했습니다.")
                else:
                    print("  ℹ️ 저장할 유효한 시그널이 없습니다. (DB competitor_id 누락)")
            except Exception as e:
                print(f"  ❌ DB 저장 오류: {e}")

        print(f"\n🎉 [{self.name}] 완료: 수집 {len(all_news)}건 | 저장 {total_saved}건")
        print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        return total_saved
