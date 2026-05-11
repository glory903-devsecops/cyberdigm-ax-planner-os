export interface RelatedLink {
  title: string;
  url: string;
  type: "document" | "news" | "policy" | "external";
}

export interface Signal {
  id: number;
  category: string;
  title: string;
  status: "Critical" | "Monitor" | "Review" | "Strategic";
  time: string;
  impact: "High" | "Medium" | "Low";
  source?: string;
  summary?: string;
  deepAnalysis?: string;
  relatedLinks?: RelatedLink[];
}

export interface Grant {
  id: number;
  title: string;
  agency: string;
  type: string;
  budget: string;
  status: "Draft" | "Radar" | "Submitted" | "Approved";
  deadline: string;
  description?: string;
  requirements?: string[];
  clauses?: { title: string; content: string }[];
  sourceUrl?: string;
}

export interface AXOpportunity {
  id: number;
  title: string;
  domain: string;
  intensity: number;
  priority: "High" | "Medium" | "Low";
  savings: string;
}

export interface Feedback {
  user: string;
  content: string;
  time: string;
}

export interface PolicyItem {
  id: number;
  title: string;
  category: "규제" | "법률" | "고시/훈령" | "행정예고";
  ministry: string;
  status: "모니터링" | "대응 필요" | "검토 완료" | "대응 완료";
  urgency: "High" | "Medium" | "Low";
  effectiveDate: string;
  summary: string;
  impact?: string;
  actionRequired?: string;
  sourceUrl?: string;
}

export interface GovtActivity {
  id: number;
  title: string;
  ministry: string;
  contactPerson: string;
  type: "회의" | "공문" | "협약" | "방문" | "전화";
  date: string;
  status: "예정" | "완료" | "후속조치 필요";
  summary?: string;
  followUp?: string;
}

export interface GRTrendSignal {
  id: number;
  title: string;
  source: string;
  category: "정책변화" | "예산동향" | "산업규제" | "대외환경";
  time: string;
  impact: "High" | "Medium" | "Low";
  summary?: string;
}

/* --- 정책/규제 대응 데이터 (Cyberdigm AX - 문서 보안/관리 도메인) --- */
export const POLICY_ITEMS: PolicyItem[] = [
  {
    id: 1,
    title: "개인정보보호법 개정안 시행에 따른 비정형 데이터 관리 의무화",
    category: "법률",
    ministry: "개인정보보호위원회",
    status: "대응 필요",
    urgency: "High",
    effectiveDate: "2026-04-01",
    summary: "이미지, PDF 등 비정형 문서 내 포함된 개인정보에 대한 자동 탐지 및 마스킹 조치가 의무화됩니다. 미이행 시 매출액 기반 과징금 부과 대상 확대.",
    impact: "사이버다임의 AI 기반 문서 중앙화 솔루션 내 '개인정보 자동 탐지' 기능에 대한 신규 도입 수요 폭증 예상.",
    actionRequired: "기존 고객사 대상 업그레이드 프로모션 기획 및 기술 지원팀 매뉴얼 업데이트 완료.",
    sourceUrl: "https://www.pipc.go.kr",
  },
  {
    id: 2,
    title: "공공기관 클라우드 네이티브 전환 및 문서 자산화 가이드라인 v2.0",
    category: "고시/훈령",
    ministry: "행정안전부",
    status: "검토 완료",
    urgency: "High",
    effectiveDate: "2026-05-15",
    summary: "모든 공공 문서의 클라우드 내 중앙 관리 및 AI 분석을 위한 데이터 구조화가 필수 요건으로 지정됩니다.",
    impact: "공공 시장 내 ECM 도입 예산이 전년 대비 40% 이상 확보될 것으로 보이며, 사이버다임의 클라우드 서비스(Destiny Cloud) 입지 강화 기회.",
    actionRequired: "조달 등록 제품 스펙 현행화 및 공공 영업본부 입찰 전략 수립.",
  },
  {
    id: 3,
    title: "국가핵심기술 보호를 위한 문서 보안(DLP/DRM) 고도화 지원 사업",
    category: "행정예고",
    ministry: "산업통상자원부",
    status: "모니터링",
    urgency: "Medium",
    effectiveDate: "2026-07-01",
    summary: "첨단 산업(이차전지, 인공지능) 분야 중소/중견기업 대상 문서 보안 솔루션 도입 비용을 최대 70% 지원합니다.",
    impact: "신규 가망 고객군(전략 산업군) 확보를 위한 타겟 마케팅 및 파트너사 협력 강화 필요.",
    actionRequired: "지원 사업 연계 패키지 구성 및 마케팅팀 상세 페이지 제작 요청.",
    sourceUrl: "https://www.motie.go.kr",
  },
];

/* --- 정부/기관 협력 데이터 (GR Hub - 대관 및 협업) --- */
export const GOVT_ACTIVITIES: GovtActivity[] = [
  {
    id: 1,
    title: "디지털 플랫폼 정부 위원회 - 데이터 활용 소분과 회의",
    ministry: "디지털플랫폼정부위원회",
    contactPerson: "데이터표준화 팀장",
    type: "회의",
    date: "2026-05-02",
    status: "완료",
    summary: "행정 문서의 AI 학습 데이터 전환을 위한 비정형 문서 구조화 기술 표준안 논의. 사이버다임의 ECM 기술 사례 발표.",
    followUp: "표준안 초안 검토 후 의견서 제출 예정 (5월 말).",
  },
  {
    id: 2,
    title: "NIPA(정보통신산업진흥원) - 지능형 SW 확산 사업 면담",
    ministry: "정보통신산업진흥원",
    contactPerson: "SW산업본부 담당자",
    type: "방문",
    date: "2026-05-08",
    status: "후속조치 필요",
    summary: "생성형 AI 결합 문서 에이전트 과제 관련 기술 성숙도 및 실증 계획 협의.",
    followUp: "실증 고객사(금융권) 협약서 및 상세 아키텍처 문서 보완 필요.",
  },
  {
    id: 3,
    title: "한국인터넷진흥원(KISA) 클라우드 보안인증(CSAP) 갱신 심사",
    ministry: "한국인터넷진흥원",
    contactPerson: "보안인증단 심사원",
    type: "방문",
    date: "2026-05-12",
    status: "예정",
    summary: "사이버다임 클라우드 서비스의 공공 진출을 위한 보안인증 갱신 현장 실사.",
    followUp: "기술팀/인프라팀 실사 대응 준비 완료 및 증적 자료 점검.",
  },
];

/* --- 산업 인텔리전스 데이터 (Cyberdigm AI/AX 트렌드) --- */
export const SIGNALS: Signal[] = [
  { 
    id: 1, 
    category: "시장 동향", 
    title: "엔터프라이즈 LLM 도입 확대로 인한 '문서 자산화' 가치 재조명", 
    status: "Critical", 
    time: "2시간 전", 
    impact: "High",
    source: "가트너 / IDC 리포트",
    summary: "기업용 생성형 AI의 성능이 사내 문서 데이터의 정제 수준에 비례함에 따라, 파편화된 문서를 통합 관리하는 ECM/문서중앙화 도입이 기업 AX의 0순위 과제로 급부상했습니다.",
    deepAnalysis: "단순 보관을 넘어 AI가 바로 읽을 수 있는 '텍스트 추출 및 구조화' 기능이 차별화 요소입니다. 사이버다임의 텍스트 분석 엔진 고도화가 시장 점유율 확대의 핵심 키가 될 것입니다.",
    relatedLinks: [
      { title: "2026 글로벌 ECM 시장 전망", url: "#", type: "document" },
      { title: "LLM 기반 지식관리 솔루션 비교 분석", url: "#", type: "news" }
    ]
  },
  { id: 2, category: "경쟁사", title: "더존비즈온, Amaranth 10 내 AI 비서 기능 강화 발표", status: "Monitor", time: "5시간 전", impact: "High" },
  { id: 3, category: "기술 트렌드", title: "RAG(검색 증강 생성) 아키텍처 내 비정형 문서 색인 효율화 신기술 등장", status: "Strategic", time: "1일 전", impact: "High" },
  { id: 4, category: "규제/보안", title: "금융권 망분리 완화 가이드라인 - 클라우드 SaaS 보안 요건 강화", status: "Review", time: "2일 전", impact: "Medium" },
];

/* --- GR 전략 산업 동향 시그널 (Cyberdigm AX 도메인) --- */
export const GR_TREND_SIGNALS: GRTrendSignal[] = [
  {
    "id": 1,
    "title": "2026년 공공기관 클라우드 네이티브 전환 예산 20% 증액",
    "source": "행정안전부 중기재정계획",
    "category": "예산동향",
    "time": "2시간 전",
    "impact": "High",
    "summary": "공공 부문의 디지털 플랫폼 정부 구현을 위해 문서 자산화 및 AI 분석 인프라 구축 예산이 대폭 확대되었습니다."
  },
  {
    "id": 2,
    "title": "국가핵심기술 보유 기업 대상 보안 솔루션 의무 도입 법안 발의",
    "source": "국회 산업통상자원위원회",
    "category": "산업규제",
    "time": "5시간 전",
    "impact": "High",
    "summary": "기술 유출 방지를 위해 일정 규모 이상의 핵심기술 보유 기업은 반드시 문서중앙화(ECM) 또는 DRM을 도입해야 하는 법안이 논의 중입니다."
  },
  {
    "id": 3,
    "title": "생성형 AI 보안 가이드라인 배포: 사내 문서 유출 방지 대책 필수",
    "source": "과학기술정보통신부 / KISA",
    "category": "정책변화",
    "time": "1일 전",
    "impact": "Medium",
    "summary": "기업들이 생성형 AI를 안전하게 활용하기 위해, AI 학습 데이터로 활용되는 사내 문서의 보안 통제(DLP)를 강화하라는 권고안이 발표되었습니다."
  }
];

/* --- GR HUB 지원사업 (2026년 상반기) --- */
export const GRANTS: Grant[] = [
  { 
    id: 1, 
    title: "생성형 AI 결합 지능형 문서 중앙화 및 자동 분류 고도화 과제", 
    agency: "과학기술정보통신부", 
    type: "R&D", 
    budget: "12.0억", 
    status: "Approved", 
    deadline: "2026-05-20",
    description: "LLM을 활용하여 사내 비정형 문서를 자동으로 분류하고, 민감 정보를 탐지하여 안전하게 자산화하는 지능형 시스템 개발을 지원합니다.",
    requirements: [
      "국내 문서 보안/관리 SW 전문 기업",
      "자체 텍스트 분석 또는 NLP 기술 보유",
      "클라우드 보안 인증(CSAP) 보유 우대"
    ],
    sourceUrl: "https://www.iris.go.kr"
  },
  { 
    id: 2, 
    title: "중소기업 디지털 전환(AX) 촉진을 위한 클라우드 보우처 사업", 
    agency: "중기부", 
    type: "지원금", 
    budget: "4.5억", 
    status: "Radar", 
    deadline: "2026-05-30",
    sourceUrl: "https://www.bizinfo.go.kr"
  },
];

/* --- AX 기획 데이터 (AI Transformation) --- */
export const OPPORTUNITIES: AXOpportunity[] = [
  { id: 1, title: "AI 기반 사내 문서 자동 요약 및 핵심 정보 추출", domain: "업무 생산성", intensity: 9, priority: "High", savings: "350시간/월" },
  { id: 2, title: "민감 정보(개인정보/영업비밀) 자동 탐지 및 실시간 마스킹", domain: "데이터 보안", intensity: 8, priority: "High", savings: "120시간/월" },
  { id: 3, title: "중복 문서 제거 및 지식 자산 구조화 최적화", domain: "지식 관리", intensity: 7, priority: "Medium", savings: "90시간/월" },
  { id: 4, title: "법규 변동에 따른 사내 내부 통제 지침 자동 업데이트", domain: "컴플라이언스", intensity: 6, priority: "Medium", savings: "40시간/월" },
];

export const FEEDBACKS: Feedback[] = [
  { user: "전략기획팀-01", content: "AI 리서치 리포트 생성 시 사내 보안 규정 문서를 자동으로 참고하는 기능이 있으면 좋겠어요.", time: "3시간 전" },
  { user: "고객지원팀", content: "클라우드 서비스 도입 고객사들이 AI 요약 기능의 정확도에 대해 문의가 많습니다. FAQ 보강이 필요해요.", time: "5시간 전" },
];

export const CRAWLING_TARGETS = [
  { name: "범부처통합연구지원시스템(IRIS)", org: "과학기술정보통신부", url: "https://www.iris.go.kr" },
  { name: "기업마당 지원사업 공고", org: "중소벤처기업부", url: "https://www.bizinfo.go.kr" },
  { name: "과학기술정보통신부 보도자료", org: "과학기술정보통신부", url: "https://www.msit.go.kr" },
  { name: "개인정보보호위원회 공지사항", org: "개인정보보호위원회", url: "https://www.pipc.go.kr" },
];
