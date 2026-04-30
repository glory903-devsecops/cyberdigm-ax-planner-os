-- CMTX AX Planner OS - GR Hub 테이블 생성 스키마
-- Supabase SQL Editor에 복사하여 실행하세요.

-- 1. grants 테이블 생성
CREATE TABLE IF NOT EXISTS public.grants (
    source_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    agency TEXT,
    category TEXT,
    application_start DATE,
    application_end DATE,
    deadline DATE,
    source TEXT,
    source_url TEXT,
    status TEXT,
    crawled_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 권한 설정 (Service Role이 자유롭게 읽고 쓸 수 있도록)
-- (만약 RLS가 켜져 있다면 API 키로 접근 시 아래 권한이 필요합니다.)
GRANT ALL ON TABLE public.grants TO service_role;
GRANT ALL ON TABLE public.grants TO anon;
GRANT ALL ON TABLE public.grants TO authenticated;

-- 3. Row Level Security (RLS) 활성화 및 정책 추가
ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 정책 (프론트엔드용)
CREATE POLICY "Allow public read access" 
ON public.grants FOR SELECT 
USING (true);

-- Service Role만 수정 가능 정책 (크롤러용)
CREATE POLICY "Allow service_role write access" 
ON public.grants FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');
