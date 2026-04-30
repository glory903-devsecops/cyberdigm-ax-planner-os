import os
from dotenv import load_dotenv
from supabase import create_client
# tabulate 제거 (표준 출력 사용)

load_dotenv()

def check_db_data():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    supabase = create_client(url, key)
    
    # 최신 10건 조회
    response = supabase.table("grants").select("*").order("crawled_at", desc=True).limit(10).execute()
    data = response.data
    
    if not data:
        print("데이터가 없습니다.")
        return

    print("\n### 📊 Supabase 실시간 적재 데이터 (최신 10건)\n")
    headers = ["출처", "카테고리", "공고명", "기관/부처", "공고일/시작일"]
    table_data = []
    for item in data:
        table_data.append([
            item.get("source", "-"),
            item.get("category", "-"),
            item.get("title", "-")[:30] + "...", # 제목은 30자까지만
            item.get("agency", "-")[:15],
            item.get("application_start", "-")
        ])
    
    # Markdown 표 형식으로 출력
    print("| " + " | ".join(headers) + " |")
    print("|" + "---|" * len(headers))
    for row in table_data:
        print("| " + " | ".join(str(x) for x in row) + " |")

if __name__ == "__main__":
    check_db_data()
