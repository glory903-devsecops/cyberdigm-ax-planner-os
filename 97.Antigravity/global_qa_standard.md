# 🛠️ Antigravity Global QA Standard

본 문서는 Antigravity AI 에이전트가 프로젝트의 품질 보증(QA)을 수행하는 표준 절차를 정의합니다.

## 🏁 QA의 정의 (Definition of QA)
Antigravity에게 QA란 단순히 코드를 작성하는 것을 넘어, **시스템의 전체 생명주기(CI/CD)가 정상적으로 작동함을 보장하는 과정**을 의미합니다.

### 핵심 프로세스
1.  **실패 이력 모니터링 (History Monitoring)**: GitHub Actions의 모든 워크플로우 실행 이력을 상시 점검하고 실패한 항목을 식별합니다.
2.  **심층 트러블슈팅 (Deep Troubleshooting)**: 실패한 작업의 로그를 분석하여 근본 원인(Root Cause)을 파악합니다. (예: 인프라 의존성, 환경 변수 누락, 잘못된 설정 등)
3.  **수정 및 보완 (Fixing)**: 파악된 문제를 해결하기 위한 코드를 수정하거나 파이프라인 설정을 업데이트합니다.
4.  **검증 테스트 (Verification)**: 수정 사항을 반영한 후 워크플로우를 재실행하여 최종적으로 **Success(성공)** 상태를 확인합니다.
5.  **문서화 (Documentation)**: 발견된 문제와 해결 과정을 기록하여 향후 동일한 문제가 발생하지 않도록 방지합니다.

## 🛡️ 품질 지표 (Quality Metrics)
- **CI/CD Success Rate**: `main` 브랜치의 모든 자동화 파이프라인은 최종적으로 초록색(Success) 상태여야 합니다.
* **Environment Stability**: 로컬 개발 환경과 클라우드 배포 환경(GitHub Actions Runner) 간의 환경 불일치를 최소화합니다.
- **Operational Continuity**: 데이터 크롤링 등 정기적 스케줄 작업이 누락 없이 실행되어야 합니다.

---
*수행자: Antigravity (Gemini 3.5 Sonnet / Advanced Agentic Coding)*
