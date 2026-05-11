-- ==========================================
-- Cyberdigm AX Planner OS: MASTER SQL SETUP
-- ==========================================

-- 0. 확장팩 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 크롤링 타겟 관리
CREATE TABLE IF NOT EXISTS public.crawling_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT,
    target_menu TEXT NOT NULL, -- grants, policy, trends
    priority TEXT DEFAULT 'Medium',
    frequency TEXT DEFAULT 'Daily',
    purpose TEXT,
    enabled BOOLEAN DEFAULT true,
    keywords TEXT[],
    last_crawled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 지원사업 및 프로젝트 현황 (grants)
CREATE TABLE IF NOT EXISTS public.grants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    agency TEXT,
    category TEXT DEFAULT '유지보수',
    budget TEXT,
    application_end DATE,
    description TEXT,
    source_url TEXT,
    status TEXT DEFAULT 'active',
    crawled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 경쟁사 정보 (Competitors)
CREATE TABLE IF NOT EXISTS public.competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    product TEXT,
    strength TEXT,
    weakness TEXT,
    market_share TEXT,
    radar_x FLOAT DEFAULT 0.5,
    radar_y FLOAT DEFAULT 0.5,
    last_updated TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. 경쟁사 시그널 (Signals)
CREATE TABLE IF NOT EXISTS public.competitor_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    competitor_id UUID REFERENCES public.competitors(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT, -- 'News', 'Technical', 'Financial', 'Strategic'
    impact TEXT, -- 'High', 'Medium', 'Low'
    summary TEXT,
    source_url TEXT,
    crawled_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. AI 전략 인사이트 (Insights)
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    summary TEXT NOT NULL,
    advice TEXT,
    priority TEXT DEFAULT 'Medium',
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. 정책 및 기술 이슈 (policy_items)
CREATE TABLE IF NOT EXISTS public.policy_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    ministry TEXT,
    effective_date DATE,
    status TEXT,
    summary TEXT,
    impact TEXT,
    action_required TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. 권한 및 RLS 설정
ALTER TABLE public.crawling_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- 공통 정책 (모든 사용자 읽기 허용)
DO $$ 
BEGIN
    EXECUTE 'CREATE POLICY "Allow public read" ON public.crawling_targets FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Allow public read" ON public.grants FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Allow public read" ON public.competitors FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Allow public read" ON public.competitor_signals FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Allow public read" ON public.insights FOR SELECT USING (true)';
EXCEPTION WHEN others THEN NULL;
END $$;

-- 권한 부여
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- 8. 초기 필수 데이터 (사이버다임 경쟁사 및 타겟)
INSERT INTO public.competitors (name, product, strength, weakness, market_share, radar_x, radar_y)
VALUES 
('더존비즈온', 'Amaranth 10', '전사적 자원관리(ERP) 연계성', '중소기업 중심의 이미지', '35%', 0.9, 0.8),
('파수 (Fasoo)', 'FED', 'DRM 원천기술 및 보안 시장 선점', '클라우드 전환 속도', '25%', 0.8, 0.7),
('지란지교시큐리티', '다큐원', '중소/중견기업 타겟팅 및 가격 경쟁력', '엔터프라이즈 하이엔드 시장 레퍼런스', '15%', 0.6, 0.5)
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.crawling_targets (name, url, category, target_menu, keywords) VALUES
('기업마당', 'https://www.bizinfo.go.kr', '공공', 'grants', ARRAY['문서보안', '디지털전환', 'AI']),
('보안뉴스', 'https://www.boannews.com', '산업', 'trends', ARRAY['문서중앙화', 'ECM', 'DLP'])
ON CONFLICT DO NOTHING;
