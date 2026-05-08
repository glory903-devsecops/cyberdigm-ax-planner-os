# 🛡️ Cyberdigm AX Planner OS: Security & ISMS-P Compliance Report

본 보고서는 프로젝트의 보안 정책, 시큐어 코딩 실무, 그리고 ISMS-P 기준에 따른 정보보호 가이드를 정리합니다.

## 1. 공급망 보안 (Supply Chain Security)
- **SHA-256 Pinning**: 모든 GitHub Actions는 버전 태그(예: `@v4`) 대신 고유한 **40자리 Commit SHA**를 사용하여 고정되었습니다. 이는 해킹된 액션이 배포 과정에 침투하는 것을 원천 차단하는 강력한 보안 조치입니다.
- **Minimal Permissions**: 워크플로우에 `permissions: read-all` 대신 필요한 권한(`contents: read` 등)만 명시적으로 부여하여 권한 남용을 방지합니다.

## 2. 데이터베이스 보안 (Supabase & Data Privacy)
- **Secret Management**: `SUPABASE_SERVICE_ROLE_KEY` 및 `GEMINI_API_KEY`와 같은 핵심 자격 증명은 절대로 소스 코드에 커밋되지 않으며, GitHub Secrets를 통해 관리됩니다.
- **Row Level Security (RLS)**:
    - **Service Role**: 크롤링 서버만 쓰기 권한을 가집니다.
    - **Public/Anon**: 프론트엔드 사용자는 읽기 권한만 가지며, RLS 정책을 통해 비공개 데이터에 대한 접근이 차단됩니다.
- **Credential Separation**: 프론트엔드에는 `anon` 키만 노출하고, 백엔드 관리용 `service_role` 키는 오직 GitHub Actions 내부에서만 활용합니다.

## 3. 시큐어 코딩 (Secure Coding)
- **Data Sanitization**: 크롤링된 데이터 저장 시 SQL Injection 방지를 위해 Supabase Client의 매개변수화된 쿼리를 사용합니다.
- **Error Handling**: 에러 메시지에 시스템 내부 경로가 노출되지 않도록 처리되어 있습니다.
- **Dependency Audit**: `requirements.txt` 및 `package.json`의 의존성을 상시 점검하여 취약한 라이브러리 사용을 배제합니다.

## 4. ISMS-P 대응 전략
- **관리적 보안**: GitHub 저장소의 권한 관리를 통해 인가된 인원만 코드 수정이 가능하도록 설정합니다.
- **기술적 보안**: HTTPS 통신 강제, API 키 순환(Rotation) 계획 수립 등이 권장됩니다.
- **데이터 보호**: 개인정보 수집이 없는 비즈니스 인텔리전스 중심이나, 수집 데이터 중 기밀 정보가 포함될 경우 암호화 저장 정책을 적용합니다.

---
*작성자: Antigravity AI Security Advisor*
