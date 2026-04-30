export interface AutomationTarget {
  id: string;
  name: string;
  url: string;
  category: string;
  target_menu: "GR Hub" | "Intelligence" | "AX Planning" | "All";
  priority: "High" | "Medium" | "Low";
  frequency: "매일" | "매주" | "매월";
  purpose: string;
  enabled: boolean;
  keywords?: string[];
}

// 초기 기본 데이터 (DB가 비어있을 때 사용하거나 시드용)
export const DEFAULT_TARGETS: AutomationTarget[] = [
  { id: "bizinfo", name: "기업마당 (Bizinfo)", url: "https://www.bizinfo.go.kr", category: "정부 과제", target_menu: "GR Hub", priority: "High", frequency: "매일", purpose: "범정부 중소기업 지원사업 통합 공고", enabled: true, keywords: ["반도체", "AI", "R&D"] },
  { id: "iris", name: "IRIS (범부처통합연구지원)", url: "https://www.iris.go.kr", category: "정부 과제", target_menu: "GR Hub", priority: "High", frequency: "매일", purpose: "범부처 국가 R&D 과제 통합 관제", enabled: true, keywords: ["기술개발", "혁신"] },
  { id: "spri", name: "SPRi (소프트웨어정책연구소)", url: "https://spri.kr", category: "산업 리서치", target_menu: "Intelligence", priority: "High", frequency: "매주", purpose: "국내 AI 및 SW 산업 정밀 통계 보고서", enabled: true, keywords: ["AI", "SW", "인공지능"] },
  { id: "kiat", name: "KIAT (한국산업기술진흥원)", url: "https://www.k-pass.kr", category: "AX/스마트공장", target_menu: "AX Planning", priority: "High", frequency: "매일", purpose: "산업 기술 진흥 및 DX 전환 지원사업", enabled: true, keywords: ["디지털전환", "DX", "AX"] },
];
