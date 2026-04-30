-- 크롤링 대상 관리 테이블 생성
CREATE TABLE IF NOT EXISTS crawling_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    target_menu TEXT NOT NULL, -- 'GR Hub', 'Intelligence', 'AX Planning' 등
    category TEXT,
    priority TEXT DEFAULT 'Medium',
    frequency TEXT DEFAULT 'daily',
    keywords TEXT[], -- 개별 키워드 배열
    purpose TEXT,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS 설정 (보안)
ALTER TABLE crawling_targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON crawling_targets FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON crawling_targets FOR INSERT WITH CHECK (true); -- 데모용으로 임시 개방 (실제 운영시 관리자 권한 필요)
