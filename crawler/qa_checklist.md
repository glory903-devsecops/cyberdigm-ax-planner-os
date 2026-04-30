# ✅ CMTX RPA Crawler 세부 QA 체크리스트

이 문서는 `Global QA Standard`를 바탕으로, 본 프로젝트(RPA 크롤러)의 특수성에 맞춰 작성된 세부 점검표입니다.

---

## 🕷️ 크롤러 특화 (Playwright RPA)
- [ ] **Stealth 가동 여부**: `base_crawler.py`의 스텔스 스크립트가 실행되어 `navigator.webdriver`가 정상적으로 숨겨지는가?
- [ ] **랜덤 딜레이**: 사이트 차단을 방지하기 위한 `random.uniform` 딜레이가 작동하는가?
- [ ] **Headless 동작**: UI가 없는 서버 환경(GitHub Actions)에서도 동일하게 동작하는가?

## 🗄️ 데이터 및 DB (Supabase)
- [ ] **Upsert 충돌 방지**: `source_id` 기반으로 중복 데이터가 걸러지는가?
- [ ] **날짜 포맷**: 공고의 시작/종료일이 ISO 포맷(YYYY-MM-DD)으로 정상 변환되는가?
- [ ] **카테고리 매칭**: 각 사이트의 카테고리가 프론트엔드 분류 기준과 일치하는가?

## 🚀 배포 및 확장성
- [ ] **sites.yaml 연동**: 설정 파일에서 `enabled: false` 처리 시 해당 크롤러가 정상적으로 건너뛰어지는가?
- [ ] **템플릿 유효성**: `template.py`를 복사했을 때 최소한의 수정으로 새 사이트 추가가 가능한 구조인가?
- [ ] **CI 워크플로우**: `.github/workflows/crawl.yml`에 브라우저 의존성 설치(`install-deps`)가 포함되었는가?

---

### 🕵️ 마지막 QA 수행 일시: 2026-04-25
수행자: Antigravity (Gemini 3 Flash)
결과: **All Green (Pass)**
