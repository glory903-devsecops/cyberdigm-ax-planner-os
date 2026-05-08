-- 4. AI 인사이트 테이블 (AI Insights)
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL, -- 'Competitor', 'Grant', 'General'
    summary TEXT,
    strategic_advice TEXT,
    evidence_links JSONB, -- 참고한 데이터 링크들
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 권한 설정
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read insights" ON public.insights FOR SELECT USING (true);
GRANT ALL ON TABLE public.insights TO service_role;
GRANT SELECT ON TABLE public.insights TO anon;
GRANT SELECT ON TABLE public.insights TO authenticated;
