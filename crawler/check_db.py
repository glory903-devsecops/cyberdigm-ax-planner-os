import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

def check_tables():
    print("Checking tables...")
    try:
        res = supabase.table("competitors").select("*").limit(1).execute()
        print(f"competitors table exists. Count: {len(res.data)}")
    except Exception as e:
        print(f"competitors table error: {e}")

    try:
        res = supabase.table("competitor_signals").select("*").limit(1).execute()
        print(f"competitor_signals table exists. Count: {len(res.data)}")
    except Exception as e:
        print(f"competitor_signals table error: {e}")

if __name__ == "__main__":
    check_tables()
