-- 0. 확장팩 활성화 (UUID 생성용)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 경쟁사 정보 테이블 (Competitors)
CREATE TABLE IF NOT EXISTS public.competitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    product TEXT,
    strength TEXT,
    weakness TEXT,
    market_share TEXT, -- 예: "15%", "Top Tier"
    radar_x FLOAT DEFAULT 0.5, -- 레이더 차트 시각화용 X 좌표 (0~1)
    radar_y FLOAT DEFAULT 0.5, -- 레이더 차트 시각화용 Y 좌표 (0~1)
    last_updated TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 경쟁사 시그널 (Competitor Signals)
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

-- 3. 권한 설정 및 RLS
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_signals ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (중복 방지)
DROP POLICY IF EXISTS "Allow public read competitors" ON public.competitors;
DROP POLICY IF EXISTS "Allow public read competitor_signals" ON public.competitor_signals;

-- 경쟁사 정보 정책
CREATE POLICY "Allow public read competitors" ON public.competitors FOR SELECT USING (true);
GRANT ALL ON TABLE public.competitors TO service_role;
GRANT SELECT ON TABLE public.competitors TO anon;
GRANT SELECT ON TABLE public.competitors TO authenticated;

-- 경쟁사 시그널 정책
CREATE POLICY "Allow public read competitor_signals" ON public.competitor_signals FOR SELECT USING (true);
GRANT ALL ON TABLE public.competitor_signals TO service_role;
GRANT SELECT ON TABLE public.competitor_signals TO anon;
GRANT SELECT ON TABLE public.competitor_signals TO authenticated;

-- 4. [기존 테이블 복구] crawling_targets 권한 누락 수정
GRANT ALL ON TABLE public.crawling_targets TO service_role;
GRANT SELECT ON TABLE public.crawling_targets TO anon;
GRANT SELECT ON TABLE public.crawling_targets TO authenticated;

-- 5. 샘플 데이터 삽입
INSERT INTO public.competitors (name, product, strength, weakness, market_share, radar_x, radar_y)
VALUES 
('더존비즈온', 'Amaranth 10', '전사적 자원관리(ERP) 연계성', '중소기업 중심의 이미지', '35%', 0.9, 0.8),
('파수 (Fasoo)', 'FED', 'DRM 원천기술 및 보안 시장 선점', '클라우드 전환 속도', '25%', 0.8, 0.7),
('지란지교시큐리티', '다큐원', '중소/중견기업 타겟팅 및 가격 경쟁력', '엔터프라이즈 하이엔드 시장 레퍼런스', '15%', 0.6, 0.5)
ON CONFLICT (name) DO NOTHING;
