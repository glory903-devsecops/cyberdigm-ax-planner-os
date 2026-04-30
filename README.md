# CMTX AX Planner OS

<!-- 주요 기술 스택 뱃지 (버튼 형태) -->
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python_3.9-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

<!-- 데모 사이트 버튼 (새 창 열림) -->
<a href="https://glory903-devsecops.github.io/cmtx-ax-planner-os" target="_blank">
  <img src="https://img.shields.io/badge/🚀%20데모%20사이트%20바로가기-1D4ED8?style=for-the-badge" alt="Demo Site">
</a>

<br/>

> **Data-Driven Strategic Operation Platform for GR, Industry Research, and AX Planning**
>
> CMTX AX Planner OS는 대외협력(GR), 산업 리서치, 그리고 사내 AI Transformation(AX) 기획 업무를 통합적으로 관리하는 엔터프라이즈 운영 플랫폼입니다. 실시간 데이터 크롤링과 지능형 분석을 통해 중장기 의사결정을 지원합니다.

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

---

## 🏗️ 기능 및 기술 아키텍처 설계

CMTX AX Planner OS는 사용자 경험을 극대화하는 **Frontend**와 안정적이고 은밀한 데이터 수집을 담당하는 **RPA Crawler**, 그리고 이를 연결하는 **Supabase Backend** 구조로 설계되었습니다.

### 1. 시스템 아키텍처 (System Architecture)
- **Frontend (Next.js 14)**:
  - App Router 기반의 빠른 페이지 라우팅.
  - Tailwind CSS를 활용한 CMTX 브랜드 아이덴티티(Navy & Blue) 반영.
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
- **Industry Research**: 산업 동향 센싱 및 리스크 관리 (추후 AI 결합 예정).
- **AX Planning**: 사내 업무 마찰점(Friction) 분석 및 AI 도입 기회 발굴.

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

## 🛡️ 유지보수 및 품질 관리 (QA)
- `97.Antigravity/global_qa_standard.md`: 전체 프로젝트 관통 품질 보증 가이드.
- `crawler/qa_checklist.md`: 크롤러 확장을 위한 세부 체크리스트.
