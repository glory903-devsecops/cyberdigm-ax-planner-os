import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client
import google.generativeai as genai

load_dotenv()

# Supabase 설정
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Gemini 설정
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None

def fetch_latest_data():
    """최근 24시간 내 수집된 데이터를 가져옵니다."""
    yesterday = (datetime.now() - timedelta(days=1)).isoformat()
    
    # 1. 경쟁사 시그널 가져오기
    signals = supabase.table("competitor_signals").select("*, competitors(name)").gt("crawled_at", yesterday).execute()
    
    # 2. 지원사업 가져오기
    grants = supabase.table("grants").select("*").gt("crawled_at", yesterday).execute()
    
    return signals.data, grants.data

def generate_ai_insight(signals, grants):
    if not model:
        return "Gemini API 키가 설정되지 않아 AI 분석을 수행할 수 없습니다.", "API 키를 설정해주세요."

    # 데이터 포맷팅
    signal_text = "\n".join([f"[{s['competitors']['name']}] {s['title']}: {s['summary']}" for s in signals])
    grant_text = "\n".join([f"[{g['agency']}] {g['title']} (마감: {g['deadline']})" for g in grants])

    prompt = f"""
당신은 사이버다임(Cyberdigm)의 전략 기획 AI 비서입니다. 
아래 수집된 최근 경쟁사 동향과 정부 지원사업 데이터를 바탕으로 경영진의 의사결정을 돕는 인사이트를 도출해주세요.

### 수집된 데이터
[경쟁사 시그널]
{signal_text if signal_text else "최근 수집된 데이터가 없습니다."}

[정부 지원사업]
{grant_text if grant_text else "최근 수집된 데이터가 없습니다."}

### 요청 사항
1. **요약**: 현재 시장에서 감지된 가장 중요한 변화를 3문장 이내로 요약해주세요.
2. **전략적 조언**: 사이버다임이 취해야 할 구체적인 액션 아이템(예: 특정 사업 응모, 경쟁사 대응 기술 개발 등)을 제시해주세요.
3. **근거**: 분석의 근거가 된 데이터들을 언급해주세요.

답변은 한국어로, 정중하고 전문적인 톤으로 작성해주세요.
"""

    try:
        response = model.generate_content(prompt)
        content = response.text
        
        # 요약과 전략적 조언 분리 (간이 파싱)
        parts = content.split("###")
        summary = parts[1] if len(parts) > 1 else content
        advice = parts[2] if len(parts) > 2 else "데이터 분석 결과를 참고하십시오."
        
        return summary.strip(), advice.strip()
    except Exception as e:
        print(f"AI 생성 오류: {e}")
        return f"AI 분석 중 오류가 발생했습니다: {e}", "나중에 다시 시도해주세요."

def save_insight(topic, summary, advice, links):
    data = {
        "topic": topic,
        "summary": summary,
        "strategic_advice": advice,
        "evidence_links": links
    }
    supabase.table("insights").insert(data).execute()

def main():
    print("🤖 AI 인사이트 생성 시작...")
    signals, grants = fetch_latest_data()
    
    if not signals and not grants:
        print("💡 분석할 새로운 데이터가 없습니다.")
        return

    # 1. 경쟁사 분석 인사이트
    if signals:
        summary, advice = generate_ai_insight(signals, [])
        links = [{"title": s["title"], "url": s["source_url"]} for s in signals]
        save_insight("Competitor", summary, advice, links)
        print("✅ 경쟁사 인사이트 저장 완료")

    # 2. 지원사업 인사이트
    if grants:
        summary, advice = generate_ai_insight([], grants)
        links = [{"title": g["title"], "url": g["source_url"]} for g in grants]
        save_insight("Grant", summary, advice, links)
        print("✅ 지원사업 인사이트 저장 완료")

if __name__ == "__main__":
    main()
