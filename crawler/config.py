import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# 크롤링 설정
REQUEST_DELAY = 1.5       # 초 (서버 부하 방지)
REQUEST_TIMEOUT = 15      # 초
MAX_PAGES = 10            # 사이트별 최대 크롤링 페이지 수

# 반도체/소부장 관련 키워드 필터
TARGET_KEYWORDS = [
    "반도체", "소재", "부품", "장비", "소부장",
    "세라믹", "쿼츠", "R&D", "기술개발",
    "디지털전환", "스마트제조", "AX",
]

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    print("⚠️  경고: SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.")
    print("   crawler/.env 파일을 생성하거나 GitHub Secrets를 설정하세요.")
