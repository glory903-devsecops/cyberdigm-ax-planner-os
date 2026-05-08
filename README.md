# Cyberdigm AX Planner OS

<!-- 주요 기술 스택 뱃지 (버튼 형태) -->
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

<!-- 데모 사이트 버튼 (새 창 열림) -->
<a href="https://glory903-devsecops.github.io/cyberdigm-ax-planner-os" target="_blank">
  <img src="https://img.shields.io/badge/🚀%20데모%20사이트%20바로가기-1D4ED8?style=for-the-badge" alt="Demo Site">
</a>

<br/>

> **Cyberdigm's AI-Powered Strategic Command Center: Specialized in Competitor Decision Intelligence**
>
> Cyberdigm AX Planner OS는 **AI 기반의 경쟁사 분석 및 의사결정 지원**을 주 목적으로 하는 엔터프라이즈 운영 플랫폼입니다. 실시간으로 수집된 경쟁사 시그널을 AI가 분석하여 경영진의 전략적 판단을 돕고, 시장 변화에 선제적으로 대응할 수 있는 인사이트를 제공합니다.

---

## 📸 데모 사이트 탐색 (Tour)

플랫폼의 주요 기능을 시각적으로 확인해 보세요.
*(※ 아래 이미지 경로는 프로젝트 내 실제 캡처 파일 경로로 업데이트하여 사용하시기 바랍니다.)*

### 1. 종합 대시보드 (Main Cockpit)
> 3대 도메인(GR, 산업, AX)의 핵심 KPI와 현황이 한눈에 들어오는 콕핏 화면입니다.
![Main Dashboard](./docs/images/demo_main_dashboard.png)

### 2. GR Hub - 지원사업 파이프라인
> Supabase DB와 실시간 연동되어 수집된 정부 R&D 공고(기업마당, IRIS 등)를 확인하고 관리합니다.
![GR Hub Grants](./docs/images/demo_gr_hub_grants.png)

### 3. 정부 사업 상세 및 원본 연결
> 공고 클릭 시 상세 정보를 확인하고, '공식 공고 페이지' 버튼을 통해 외부 원본 사이트로 안전하게 이동(우회 접속)합니다.
![Detail View](./docs/images/demo_detail_view.png)

### 4. 경쟁사 인텔리전스 (Competitor Intelligence)
> 글로벌 티어 사별 신기술 점유율(Radar Chart)을 시각화하고, 경쟁사 관련 실시간 뉴스 시그널을 자동으로 수집하여 대시보드에 표시합니다.

---

## 🏗️ 기능 및 기술 아키텍처 설계

Cyberdigm AX Planner OS는 사용자 경험을 극대화하는 **Frontend**와 안정적이고 은밀한 데이터 수집을 담당하는 **RPA Crawler**, 그리고 이를 연결하는 **Supabase Backend** 구조로 설계되었습니다.

### 1. 시스템 아키텍처 (System Architecture)
- **Frontend (Next.js 14)**:
  - App Router 기반의 빠른 페이지 라우팅.
  - Tailwind CSS를 활용한 사이버다임(Cyberdigm) 브랜드 아이덴티티(Navy & Blue) 반영.
  - Supabase Client를 통한 실시간 데이터 Fetching 및 Mock 데이터 Fallback 구조 적용.
- **RPA Crawler (Python Playwright)**:
  - `BaseCrawler` 상속 구조를 통한 높은 확장성 (새로운 사이트 추가 용이).
  - Playwright Stealth 모드를 활용한 정부 및 공공기관 봇 탐지(Bot Detection) 우회.
  - `sites.yaml`을 통한 중앙 집중식 타겟 사이트 설정 및 관리.
- **Database (Supabase PostgreSQL)**:
  - RLS(Row Level Security) 및 Service Role Key를 활용한 강력한 데이터 보안.
  - 고유 ID(`source_id`) 해싱을 통한 데이터 중복 적재(Upsert) 방지.

### 2. 핵심 비즈니스 모듈
- **GR (Government Relations)**: 정부과제, R&D 공고 자동 수집 및 마감일(D-Day) 모니터링.
- **Competitor Intelligence**: 경쟁사 신기술 동향, 시장 점유율 레이더 및 실시간 뉴스 모니터링.
- **Google Keyword Monitoring**: 구글 검색 기반 경쟁사 및 산업 키워드(예: '문서관리 솔루션') 트래킹.
- **AX Planning**: 사내 업무 마찰점(Friction) 분석 및 AI 도입 기회 발굴.

---

## 🏛️ Cyberdigm AX Vision: 지능형 문서 관리의 미래
사이버다임은 국내 문서중앙화 시장의 개척자로서, 이제 **AX(AI Transformation)**를 통해 기업의 무형 자산인 지식 콘텐츠를 AI가 스스로 학습하고 비즈니스 인사이트로 변환하는 시대를 열어갑니다.

- **From Content to Insight**: 단순히 문서를 보관하는 단계를 넘어, AI가 문서의 맥락을 이해하고 필요한 순간에 최적의 해답을 제시합니다.
- **Strategic Command Center**: 본 OS 플랫폼은 정부 R&D 과제 수집부터 경쟁사의 기술 동향 분석까지, 사이버다임이 글로벌 AX 리더로 도약하기 위한 데이터 허브 역할을 수행합니다.
- **Secure AI Adoption**: 사이버다임의 강력한 보안 철학을 AI 환경에도 그대로 투영하여, 기업 내부 데이터의 유출 걱정 없는 안전한 AI 도입 가이드를 제시합니다.

---

## 🚀 로컬 셋업 가이드 (Local Setup)

본 프로젝트를 로컬 환경에서 실행하기 위한 단계별 안내입니다.

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase 계정 및 프로젝트

### 1. 환경 변수 설정
프로젝트 루트 폴더 및 각 하위 폴더에 환경 변수를 설정합니다.

**Frontend (`frontend/.env.local`)**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Crawler (`crawler/.env`)**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Frontend 실행
```bash
cd frontend
npm install
npm run dev
# localhost:3000 에서 확인
```

### 3. Crawler 구동 (데이터 수집)
크롤러를 실행하여 DB에 실제 데이터를 적재합니다.
```bash
cd crawler
# 1. 의존성 패키지 설치
pip install -r requirements.txt

# 2. Playwright 브라우저 엔진 설치 (최초 1회)
playwright install chromium

# 3. 전체 사이트 크롤링 실행
python3 run_all.py
```
> 특정 사이트만 실행하려면 `python3 run_all.py bizinfo` 와 같이 파라미터를 추가합니다.

### 4. 크롤링 운영 및 확장 가이드 (Crawling Plan)

Cyberdigm AX Planner OS의 핵심은 실시간으로 업데이트되는 고품질 데이터입니다.

#### 📅 운영 스케줄
- **실행 주기**: 매일 오전 09:00 (KST) 자동 실행
- **실행 도구**: GitHub Actions (`crawl.yml`)
- **데이터 보존**: Supabase PostgreSQL (Upsert 로직을 통해 중복 방지)

#### 🎯 현재 수집 대상 사이트 (Target Sites)
| 모듈 | 사이트/플랫폼 | 수집 데이터 | 상태 |
| :--- | :--- | :--- | :--- |
| **GR Hub** | 기업마당(bizinfo) | 정부 지원사업, 정책 공고 | 활성 |
| | IRIS, KEIT, TIPA 등 | 범부처 R&D 및 기술개발 과제 | 활성 |
| | K-Startup, NTIS | 스타트업 지원 및 국가과학기술 정보 | 활성 |
| **Intel** | 보안뉴스(Boan News) | 보안 업계 동향 및 경쟁사 뉴스 | 활성 |
| | ZDNet, 전자신문 | IT 산업 전반 및 신기술 트렌드 | 활성 |
| | **Google News** | 키워드('문서관리' 등) + 경쟁사 검색 | 활성 |

#### 🛠️ 크롤링 대상 및 키워드 커스텀 방법
1. **사이트 추가/제거**: `crawler/sites.yaml` 파일에서 `enabled: true/false`로 즉시 제어 가능합니다.
2. **구글 검색 키워드**: `sites.yaml` 내 `google_search` 섹션의 `search_keywords` 리스트를 수정하십시오.
3. **경쟁사 추적**: Supabase `competitors` 테이블에 새로운 경쟁사 이름을 추가하면, 다음 스케줄 실행 시 해당 기업에 대한 구글 검색 및 뉴스 수집이 자동으로 시작됩니다.
4. **신규 크롤러 개발**: `crawler/crawlers/template.py`를 복사하여 `crawl_page` 메서드만 구현하면 새로운 사이트를 손쉽게 추가할 수 있습니다.

---

## 🛠️ 나만의 환경 구축하기 (Custom DB & Actions Setup)

본 저장소를 Fork하여 자신만의 데이터 수집 자동화 환경을 구축하려는 경우, 아래 절차에 따라 독립된 데이터베이스와 배포 파이프라인을 설정해야 합니다.

### 1. Supabase 데이터베이스 구축
1. [Supabase](https://supabase.com/)에서 새 프로젝트를 생성합니다.
2. 프로젝트 대시보드 좌측 메뉴에서 **SQL Editor**로 이동합니다.
3. 본 프로젝트의 `sql/setup_supabase.sql` 파일 내용을 복사하여 SQL Editor에 붙여넣고 실행(Run)합니다.
   *(이 과정은 `grants` 테이블 생성 및 프론트엔드/크롤러 접근 권한 분리(RLS)를 자동으로 세팅합니다.)*
4. Project Settings > API 메뉴에서 `Project URL`, `anon public key`, `service_role secret` 값을 확인합니다.

### 2. GitHub Actions 자동화 설정 (Crawler)
매일 정해진 시간에 크롤러가 동작하도록 GitHub 저장소에 Secret을 등록해야 합니다.
1. Fork한 본인 GitHub 저장소의 **Settings > Secrets and variables > Actions** 로 이동합니다.
2. **New repository secret** 버튼을 눌러 다음 두 가지 환경변수를 등록합니다.
   - `SUPABASE_URL` : 위에서 확인한 Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` : 위에서 확인한 service_role secret
3. 이제 `.github/workflows/crawl.yml` 설정에 따라 봇이 자동으로 데이터를 수집하고 나만의 DB에 저장합니다!

---

## 🔍 경쟁사 분석 추천 사이트
현재 플랫폼에 통합되었거나 추가가 권장되는 주요 채널입니다.

- **보안뉴스 (Boan News)**: 정보보안 및 문서보안 관련 업계 소식 (활성화됨)
- **전자신문 (ETNews)** / **ZDNet Korea**: 국내 IT 및 소프트웨어 산업 전반 (활성화됨)
- **블로터 (Bloter)** / **디지털데일리**: 기업용 솔루션 및 테크 트렌드 (추가 권장)
- **Google News**: 경쟁사명 + "문서관리 솔루션", "전자문서" 키워드 기반 실시간 모니터링 (활성화됨)
