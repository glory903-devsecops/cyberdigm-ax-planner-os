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

/* --- 정책/규제 대응 데이터 (GR 1대 기둥) --- */
export const POLICY_ITEMS: PolicyItem[] = [
  {
    id: 1,
    title: "반도체 소부장 수출 허가 절차 간소화 특례 고시 (개정)",
    category: "고시/훈령",
    ministry: "산업통상자원부",
    status: "대응 필요",
    urgency: "High",
    effectiveDate: "2026-05-01",
    summary: "반도체 소부장 기업 대상 전략물자 수출 허가 신청 시 첨부 서류가 기존 12종에서 7종으로 간소화됩니다. 단, 불화수소 관련 품목은 적용 예외.",
    impact: "CMTX의 해외 법인(싱가포르, 대만)으로의 세라믹 부품 수출 시 허가 소요 기간이 약 20일 단축될 것으로 예상됩니다.",
    actionRequired: "수출팀 및 법무팀 즉시 공유. 불화수소 관련 부품 목록 검토하여 예외 해당 여부 확인 필요.",
    sourceUrl: "https://www.motie.go.kr",
  },
  {
    id: 2,
    title: "중소기업 기술 보호 강화를 위한 산업기술보호법 시행령 개정",
    category: "법률",
    ministry: "산업통상자원부",
    status: "모니터링",
    urgency: "Medium",
    effectiveDate: "2026-06-15",
    summary: "국가핵심기술 보유 기업의 해외 M&A 및 기술 이전 시 사전 신고 의무 대상이 확대됩니다. 반도체 공정용 세라믹 부품 관련 기술이 신규 지정 검토 중.",
    impact: "향후 당사 특허 기술의 해외 라이선싱 및 해외 파트너십 추진 시 신고 절차 추가 가능성.",
    actionRequired: "IP/특허팀 및 전략팀에 동향 공유. 법률 자문 검토 의뢰 예정.",
  },
  {
    id: 3,
    title: "2026년 반도체 특별법 시행에 따른 클러스터 입주 기업 세제 혜택 확대",
    category: "법률",
    ministry: "기획재정부",
    status: "검토 완료",
    urgency: "High",
    effectiveDate: "2026-01-01",
    summary: "국가첨단전략산업특별구역(용인, 평택) 입주 기업 대상 설비 투자분 세액 공제율이 15%에서 25%로 상향 조정.",
    impact: "CMTX 평택 2공장 설비 증설 계획 연계 시 약 4.5억 원 세제 혜택 추정.",
    actionRequired: "재경팀 연계하여 2026년 설비 투자 계획에 반영 완료.",
    sourceUrl: "https://www.moef.go.kr",
  },
  {
    id: 4,
    title: "전기·전자 제품 유해물질(RoHS) EU 신규 규제 대상 품목 추가 행정예고",
    category: "행정예고",
    ministry: "환경부",
    status: "대응 필요",
    urgency: "Medium",
    effectiveDate: "2026-07-01",
    summary: "EU RoHS 개정안에 따라 반도체 제조 공정용 소모성 부품(세라믹, 쿼츠)에 대한 성분 공시 의무가 추가될 예정.",
    impact: "주요 유럽 고객사(ASML, Infineon) 납품 시 성분 인증서 제출 요구 증가 예상.",
    actionRequired: "품질팀에 성분 분석 데이터 준비 요청. 대응 방안 검토 중.",
  },
];

/* --- 정부/기관 협력 데이터 (GR 2대 기둥) --- */
export const GOVT_ACTIVITIES: GovtActivity[] = [
  {
    id: 1,
    title: "산업부 반도체 소부장 주관 협의회 참석",
    ministry: "산업통상자원부",
    contactPerson: "소재·부품·장비 정책팀 사무관 (박○○)",
    type: "회의",
    date: "2026-04-22",
    status: "완료",
    summary: "2026년 2차 소부장 전략 R&D 공고 사전 설명회 참석. CMTX 참여 가능 과제 2건 사전 확인.",
    followUp: "5월 8일 정식 공고 이후 즉시 신청 서류 준비 착수 예정.",
  },
  {
    id: 2,
    title: "KEIT(한국산업기술평가관리원) 과제 담당자 면담",
    ministry: "한국산업기술평가관리원",
    contactPerson: "소재·부품 평가팀 선임 (이○○)",
    type: "방문",
    date: "2026-04-18",
    status: "후속조치 필요",
    summary: "High-NA EUV 호환 세라믹 부품 과제 관련 기술 역량 발표 및 질의 응답 진행.",
    followUp: "요청 자료: 기업 기술 역량 보고서 및 기 납품 실적 증빙 → 4월 25일까지 제출.",
  },
  {
    id: 3,
    title: "경기도 반도체 클러스터 입주 인센티브 신청",
    ministry: "경기도 경제투자실",
    contactPerson: "투자유치팀 주무관",
    type: "공문",
    date: "2026-04-15",
    status: "완료",
    summary: "경기도 반도체 특화단지(용인) 입주 기업 지원금 신청 공문 발송 완료.",
    followUp: "심사 결과 5월 중 통보 예정. 이후 협약 체결 절차 진행.",
  },
  {
    id: 4,
    title: "중소벤처기업부 K-Startup AI 챌린지 사전 컨설팅",
    ministry: "중소벤처기업부",
    contactPerson: "창업진흥팀 담당자",
    type: "전화",
    date: "2026-04-25",
    status: "예정",
    summary: "K-Startup AI 소부장 챌린지 사업 신청 전 사전 자격 검토 및 가이드라인 확인 예정.",
    followUp: "통화 후 신청 여부 내부 결정.",
  },
];

/* --- GR 전략 산업 동향 시그널 (GR 4대 기둥) --- */
export const GR_TREND_SIGNALS: GRTrendSignal[] = [
  {
    id: 1,
    title: "2027년 반도체 R&D 정부 예산안 15% 증액 예고",
    source: "기획재정부 중기재정계획",
    category: "예산동향",
    time: "2시간 전",
    impact: "High",
    summary: "과학기술정보통신부 및 산업부 공동 요청으로 반도체 소부장 R&D 예산이 전년 대비 15% 증액될 예정입니다. 2027년 정부 지원 과제 규모 확대가 예상됩니다.",
  },
  {
    id: 2,
    title: "미-중 반도체 규제 신규 조치: 첨단 장비 수출 통제 범위 확대",
    source: "미국 상무부 BIS 고시",
    category: "산업규제",
    time: "5시간 전",
    impact: "High",
    summary: "미국 BIS가 EUV 관련 장비 수출 통제 범위를 14nm 이하 공정 지원 소모성 부품으로 확대 검토 중. CMTX 제품의 대미 수출 규정 점검 필요.",
  },
  {
    id: 3,
    title: "국내 반도체 특별법 시행 1주년 평가: 소부장 기업 지원 성과 부진",
    source: "국회 산업통상자원위원회 보고서",
    category: "정책변화",
    time: "1일 전",
    impact: "Medium",
    summary: "국회 평가 보고서에서 특별법의 소부장 기업 지원 실효성 문제가 제기됨. 보완 입법 논의 시작으로 추가 지원 프로그램 등장 가능성.",
  },
  {
    id: 4,
    title: "일본 수출 규제 재완화 협상 타결 임박: 불화수소 관련 부품 영향",
    source: "산업부 무역투자실 동향 브리핑",
    category: "대외환경",
    time: "2일 전",
    impact: "Medium",
    summary: "한-일 무역 협상에서 불화수소 등 핵심 소재에 대한 수출 규제 재완화 논의가 최종 단계에 진입. 공급망 다변화 전략 재검토 시점.",
  },
];

/* --- 산업 인텔리전스 데이터 (2026년 4월) --- */
export const SIGNALS: Signal[] = [
  { 
    id: 1, 
    category: "공급망", 
    title: "글로벌 쿼츠/세라믹 원자재 재고 경보 발령", 
    status: "Critical", 
    time: "1시간 전", 
    impact: "High",
    source: "블룸버그 테크놀로지 / 로이터",
    summary: "전 세계 반도체용 쿼츠 및 세라믹 원자재의 재고량이 위험 수준(2주 미만)으로 하락했습니다. 주요 산지인 호주와 브라질의 광산 파업 및 운송 지연이 겹친 결과입니다.",
    deepAnalysis: "CMTX의 주력 부품인 챔버용 쿼츠 웨이퍼의 원가 상승 압박이 향후 3개월 내 15~20% 발생할 것으로 예측됩니다. 대체 수급처인 베트남 시장의 퀄리티 테스트를 재귀적으로 진행할 필요가 있습니다.",
    relatedLinks: [
      { title: "원자재 가격 지수 리포트 (2026 Q2)", url: "#", type: "document" },
      { title: "호주 광산 파업 일일 동향 보고서", url: "#", type: "news" },
      { title: "2차 공급망 분석 (베트남 거점)", url: "#", type: "external" }
    ]
  },
  { id: 2, category: "규제/정책", title: "미-아시아 반도체 수출 통제 업데이트 v4.0", status: "Monitor", time: "3시간 전", impact: "High" },
  { id: 3, category: "시장 동향", title: "TSMC 2nm 공정 확장 - 챔버 부품 조달 물량 급증 대응", status: "Strategic", time: "5시간 전", impact: "High" },
  { id: 4, category: "경쟁사", title: "일본 경쟁사 'S-Corp' 신규 내플라즈마 코팅 기술 발표", status: "Review", time: "1일 전", impact: "Medium" },
  { id: 5, category: "기술 트렌드", title: "High-NA EUV 호환 소모성 부품 신규 규격 업데이트", status: "Monitor", time: "2일 전", impact: "Medium" },
];

/* --- GR HUB 데이터 (2026년 4월) --- */
export const GRANTS: Grant[] = [
  { 
    id: 1, 
    title: "2026년 차세대 반도체 공정용 고성능 세라믹 부품 국산화 과제", 
    agency: "산업부", 
    type: "R&D", 
    budget: "15.5억", 
    status: "Approved", 
    deadline: "D-3",
    description: "차세대 High-NA EUV 공정에서 발생하는 초고온 plasma 환경을 견딜 수 있는 고순도 세라믹 소재 및 부품 생산 원천 기술 확보를 목표로 합니다.",
    requirements: [
      "국내 소부장 기업 단독 또는 컨소시엄",
      "반도체 챔버용 부품 양산 실적 보유 필수",
      "연구 인력 중 박사급 비중 15% 이상"
    ],
    clauses: [
      { title: "지원 조항 제 4조 (기술료)", content: "사업 종료 후 매출 발생 시 정부 출연금의 10%를 5년 분할 납부함. (주요 핵심 조항)" },
      { title: "부칙 12-B (매칭 펀드)", content: "민간 부담금은 전체 사업비의 25% 이상으로 하며, 이 중 10% 이상을 현금 부담할 것." },
      { title: "숨겨진 조항 분석 (재귀)", content: "High-NA EUV용 쿼츠 챔버 부품의 경우, 국내 생산 시설 증빙 시 가점 5점 부여 (별도 고문 문서 L-24에서 발견)" }
    ],
    sourceUrl: "https://www.iris.go.kr"
  },
  { 
    id: 2, 
    title: "반도체 소부장(소재·부품·장비) 디지털 전환(DX) 선도 사업", 
    agency: "중기부", 
    type: "지원금", 
    budget: "8.0억", 
    status: "Radar", 
    deadline: "2026-05-15",
    sourceUrl: "https://www.bizinfo.go.kr"
  },
  { 
    id: 3, 
    title: "글로벌 상생협력 반도체 클러스터 인프라 지원", 
    agency: "경기도", 
    type: "인센티브", 
    budget: "3.2억", 
    status: "Draft", 
    deadline: "2026-06-10",
    sourceUrl: "https://www.korcham.net"
  },
  { 
    id: 4, 
    title: "친환경 탄소저감형 반도체 세정/에칭 부품 제조 공정 개발", 
    agency: "환경부", 
    type: "R&D", 
    budget: "5.5억", 
    status: "Submitted", 
    deadline: "2026-04-30",
    sourceUrl: "https://www.iitp.kr"
  },
  { 
    id: 5, 
    title: "K-Startup AI 소부장 혁신 챌린지", 
    agency: "중기부", 
    type: "공모전", 
    budget: "1.2억", 
    status: "Radar", 
    deadline: "2026-05-01",
    sourceUrl: "https://www.k-startup.go.kr"
  },
];

export const CRAWLING_TARGETS = [
  { name: "범부처통합연구지원시스템(IRIS)", org: "과학기술정보통신부", url: "https://www.iris.go.kr" },
  { name: "국가과학기술지식정보서비스(NTIS)", org: "한국과학기술정보연구원(KISTI)", url: "https://www.ntis.go.kr" },
  { name: "기업마당 지원사업 공고", org: "중소벤처기업부", url: "https://www.bizinfo.go.kr" },
  { name: "K-Startup 지원사업 공고", org: "중소벤처기업부", url: "https://www.k-startup.go.kr" },
  { name: "정보통신산업진흥원(NIPA) 사업공고", org: "과학기술정보통신부", url: "https://www.nipa.kr" },
  { name: "정보통신기획평가원(IITP) 사업공고", org: "과학기술정보통신부", url: "https://www.iitp.kr" },
  { name: "한국산업기술평가관리원(KEIT) 사업공고", org: "산업통상자원부", url: "https://www.keit.re.kr" },
  { name: "중소기업기술정보진흥원(TIPA) 사업공고", org: "중소벤처기업부", url: "https://www.smtech.go.kr" },
  { name: "한국산업기술진흥원(KIAT) 사업공고", org: "산업통상자원부", url: "https://www.kiat.or.kr" },
  { name: "대한상공회의소 정책/사업 공지", org: "대한상공회의소", url: "https://www.korcham.net" },
];

/* --- AX 기획 데이터 --- */
export const OPPORTUNITIES: AXOpportunity[] = [
  { id: 1, title: "반도체 부품 표면 결함 Vision AI 자동 검수 시스템", domain: "스마트 팩토리", intensity: 9, priority: "High", savings: "200시간/월" },
  { id: 2, title: "원자재(Quartz/Al2O3) 가격 변동 대응 AI 구매 예측", domain: "공급망 관리", intensity: 7, priority: "High", savings: "80시간/월" },
  { id: 3, title: "공정 레시피 기반 부품 교체 주기 최적화 (디지털 트윈)", domain: "설비 유지보수", intensity: 8, priority: "Medium", savings: "120시간/월" },
  { id: 4, title: "글로벌 테크니컬 스펙 변동 대응 문서 자동 분석 에이전트", domain: "연구개발 지원", intensity: 6, priority: "Medium", savings: "50시간/월" },
];

export const FEEDBACKS: Feedback[] = [
  { user: "생산지원-QC-01", content: "반도체 챔버용 쿼츠 부품의 미세 스크래치 수기 검수가 너무 오래 걸립니다. AI 도입이 필요해요.", time: "2시간 전" },
  { user: "대외협력팀", content: "산업부 소부장 과제 공고가 IRIS에 올라왔는데, 우리 회사 특허와 매칭되는지 분석이 필요합니다.", time: "4시간 전" },
];



