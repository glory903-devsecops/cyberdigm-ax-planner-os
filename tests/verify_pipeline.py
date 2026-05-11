import os
from dotenv import load_dotenv
from supabase import create_client, Client
from datetime import datetime, timedelta

load_dotenv("crawler/.env")

# Supabase 설정
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_competitor_signals():
    print("🔍 경쟁사 시그널 데이터 검증 중...")
    yesterday = (datetime.now() - timedelta(days=1)).isoformat()
    res = supabase.table("competitor_signals").select("*").gt("crawled_at", yesterday).execute()
    
    if len(res.data) > 0:
        print(f"✅ 성공: 최근 24시간 내 {len(res.data)}개의 새로운 시그널이 수집되었습니다.")
        for item in res.data[:3]:
            print(f"   - {item['title']} ({item['impact']})")
    else:
        print("⚠️ 경고: 최근 수집된 시그널 데이터가 없습니다. 크롤러 작동을 확인하세요.")

def test_gr_hub_grants():
    print("\n🔍 GR Hub 지원사업 데이터 검증 중...")
    res = supabase.table("grants").select("*").limit(5).execute()
    
    if len(res.data) > 0:
        print(f"✅ 성공: 총 {len(res.data)}개의 지원사업 데이터를 확인했습니다.")
    else:
        print("❌ 오류: 지원사업 데이터가 테이블에 존재하지 않습니다.")

def test_ai_insights():
    print("\n🔍 AI 인사이트 생성 여부 검증 중...")
    res = supabase.table("insights").select("*").order("created_at", desc=True).limit(1).execute()
    
    if len(res.data) > 0:
        print("✅ 성공: 최신 AI 전략 인사이트가 존재합니다.")
        print(f"   - 주제: {res.data[0]['topic']}")
        print(f"   - 요약: {res.data[0]['summary'][:100]}...")
    else:
        print("⚠️ 경고: 아직 생성된 AI 인사이트가 없습니다. Gemini API 연동을 확인하세요.")

def main():
    print("🚀 Cyberdigm AX Planner OS - 시스템 무결성 테스트 시작\n")
    try:
        test_competitor_signals()
        test_gr_hub_grants()
        test_ai_insights()
        print("\n✨ 모든 시스템 테스트가 완료되었습니다.")
    except Exception as e:
        print(f"\n❌ 테스트 중 오류 발생: {e}")

if __name__ == "__main__":
    main()
