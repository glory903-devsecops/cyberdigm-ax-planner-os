"""
run_all.py — 크롤링 파이프라인 진입점
sites.yaml 에서 enabled: true 인 사이트를 자동으로 실행합니다.

실행:
  python run_all.py           # 전체 실행
  python run_all.py bizinfo   # 특정 사이트만 실행
"""
import sys
import os
from datetime import datetime
from importlib import import_module

from typing import Optional, List, Dict
import yaml
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# ── Supabase 클라이언트 초기화 ─────────────────────────
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

supabase_client: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(f"✅ Supabase 연결: {SUPABASE_URL}")
else:
    print("⚠️  Supabase 미연결 → 콘솔 출력 모드")

# ── sites.yaml 로드 ────────────────────────────────────
SITES_YAML = os.path.join(os.path.dirname(__file__), "sites.yaml")
with open(SITES_YAML, encoding="utf-8") as f:
    config = yaml.safe_load(f)

# ── 타겟 사이트 구성 (YAML + DB) ──────────────────────
all_sites = config.get("sites", [])

# DB에서 타겟 가져오기
if supabase_client:
    try:
        response = supabase_client.table("crawling_targets").select("*").eq("enabled", True).execute()
        db_sites = response.data
        for ds in db_sites:
            # 중복 방지 (YAML에 이미 있는 경우 제외)
            if not any(s["id"] == ds.get("id") or s["name"] == ds["name"] for s in all_sites):
                all_sites.append({
                    "id": ds.get("id") or ds["name"].lower().replace(" ", "_"),
                    "name": ds["name"],
                    "url": ds["url"],
                    "enabled": True,
                    "target_menu": ds.get("target_menu", "GR Hub"),
                    "category": ds.get("category", "General")
                })
        print(f"📡 DB에서 {len(db_sites)}개의 활성 타겟을 로드했습니다.")
    except Exception as e:
        print(f"⚠️ DB 타겟 로드 실패: {e}")

# ── CLI 필터 (특정 사이트만 실행) ──────────────────────
target_id = sys.argv[1] if len(sys.argv) > 1 else None

if target_id:
    sites_to_run = [s for s in all_sites if s["id"] == target_id or s["name"] == target_id]
    if not sites_to_run:
        print(f"❌ '{target_id}' 사이트를 찾을 수 없습니다.")
        sys.exit(1)
else:
    sites_to_run = [s for s in all_sites if s.get("enabled", False)]

if not sites_to_run:
    print("ℹ️  실행할 사이트가 없습니다.")
    sys.exit(0)

# ── 실행 ───────────────────────────────────────────────
print(f"\n🚀 GR Hub 크롤러 파이프라인 시작")
print(f"   대상: {[s['name'] for s in sites_to_run]}")
print(f"   시작: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

results = {}
for site in sites_to_run:
    site_id = site["id"]
    try:
        module = import_module(f"crawlers.{site_id}")
        crawler = module.Crawler(site, supabase_client)
        results[site_id] = crawler.run()
    except ModuleNotFoundError:
        print(f"⚠️  [{site_id}] crawlers/{site_id}.py 파일이 없습니다. 건너뜁니다.")
        results[site_id] = -1
    except Exception as e:
        print(f"❌ [{site_id}] 실행 오류: {e}")
        results[site_id] = -1

# ── 최종 결과 요약 ─────────────────────────────────────
print("\n" + "=" * 60)
print("📊 전체 수집 결과")
print("=" * 60)
for site_id, count in results.items():
    status = f"{count}건 저장" if count >= 0 else "실패/건너뜀"
    print(f"   {site_id:20s}: {status}")
total = sum(c for c in results.values() if c >= 0)
print(f"\n   합계: {total}건")
print(f"   종료: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 60)
