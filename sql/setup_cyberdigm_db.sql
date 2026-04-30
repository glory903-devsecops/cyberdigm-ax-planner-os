-- Cyberdigm AX Planner OS: Supabase Schema Setup (Engine Compatible)
-- 기존 엔진의 데이터 구조를 유지하여 코드 수정 없이 즉시 작동하도록 설계함

-- 1. 영업 기회 및 고객사 현황 (기존 grants 테이블 호환)
CREATE TABLE IF NOT EXISTS grants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL, -- 고객사명 또는 프로젝트명
    agency TEXT, -- 주요 부서 또는 담당자
    category TEXT DEFAULT '유지보수', -- 유지보수, 신규수주, 솔루션 등
    budget TEXT, -- 계약 금액 또는 예산
    application_end DATE, -- 계약 만료일 또는 입찰 마감일
    description TEXT, -- 상세 요구사항 또는 이슈 요약
    source_url TEXT, -- 관련 문서 또는 공고 링크
    status TEXT DEFAULT 'active', -- active (고정)
    crawled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 기술 지원 및 점검 현황 (기존 policy_items 테이블 호환 예정)
CREATE TABLE IF NOT EXISTS policy_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    ministry TEXT, -- 고객사명
    effective_date DATE,
    status TEXT, -- 정상, 점검필요, 이슈발생
    summary TEXT,
    impact TEXT,
    action_required TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 크롤링 대상 타겟 관리 (기존 구조 동일)
CREATE TABLE IF NOT EXISTS crawling_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT, -- 공공, 기업, 기술 등
    target_menu TEXT NOT NULL, -- grants, policy, trends
    priority TEXT DEFAULT 'Medium',
    frequency TEXT DEFAULT 'Daily',
    purpose TEXT,
    enabled BOOLEAN DEFAULT true,
    keywords TEXT[], -- 관심 키워드 (문서보안, DLP 등)
    last_crawled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 초기 크롤링 타겟 샘플 (사이버다임 영업 타겟)
INSERT INTO crawling_targets (name, url, category, target_menu, priority, frequency, purpose, keywords) VALUES
('조달청 나라장터', 'https://www.g2b.go.kr', '공공', 'grants', 'High', 'Daily', '문서중앙화 입찰 공고 모니터링', ARRAY['문서중앙화', 'ECM', 'VDI']),
('사이버다임 뉴스', 'https://www.cyberdigm.co.kr/news', '기업', 'policy', 'Medium', 'Weekly', '자사 공지 및 제품 업데이트 확인', ARRAY['패치', '업데이트']),
('보안뉴스', 'https://www.boannews.com', '산업', 'trends', 'Medium', 'Daily', '보안 솔루션 시장 동향 파악', ARRAY['문서보안', 'DLP', 'DRM']);
