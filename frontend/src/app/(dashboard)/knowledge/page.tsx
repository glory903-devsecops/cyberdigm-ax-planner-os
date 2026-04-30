"use client";

import React from "react";
import { 
  Database, 
  Search, 
  TrendingUp, 
  FileText, 
  Layers, 
  Filter, 
  History, 
  Zap, 
  ChevronRight,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/common/Badge";
import { PageTransition } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

export default function KnowledgePage() {
  return (
    <PageTransition>
      <PageHeader 
        title="지식 정보고 (Knowledge Base)"
        subtitle="누적 데이터 기반의 진화형 지능 엔진"
        icon={<Database className="w-6 h-6" />}
        actions={
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="지식 정보 검색..."
                className="pl-10 pr-4 py-2 bg-white border border-cmtx-border rounded-lg text-sm focus:ring-2 focus:ring-cmtx-blue/20 outline-none w-64"
              />
            </div>
            <button className="px-4 py-2 bg-cmtx-navy text-white rounded-lg text-xs font-bold hover:bg-cmtx-navy/90 flex items-center gap-2 transition-all">
                <History className="w-4 h-4" /> 변경 이력 (History)
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Knowledge Growth & Delta */}
        <div className="lg:col-span-2 space-y-8">
           <SectionCard 
            title="지식 자산 성장 추이" 
            icon={<TrendingUp className="w-4 h-4" />}
            headerAction={<Badge variant="success">실시간 동기화 중</Badge>}
           >
             <div className="relative h-64 bg-slate-50 rounded-2xl border border-cmtx-border flex items-end justify-between p-8 group">
                {/* Simulated Growth Chart */}
                {[20, 35, 30, 45, 60, 55, 85].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group/bar">
                     <div 
                      className={cn(
                        "w-12 rounded-t-lg transition-all duration-700 bg-cmtx-blue",
                        i === 6 ? "bg-cmtx-blue opacity-100" : "opacity-30 group-hover:opacity-60"
                      )} 
                      style={{ height: `${h}%` }} 
                     />
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">04.{13+i}</span>
                  </div>
                ))}
                <div className="absolute top-8 left-8">
                  <p className="text-3xl font-black text-cmtx-navy">2.4k+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">인덱싱된 문서 (Documents)</p>
                </div>
                <div className="absolute top-8 right-8 text-right">
                  <p className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1">
                    <ArrowUpRight className="w-4 h-4" /> 오늘 +142건
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">수집된 신규 시그널</p>
                </div>
             </div>
           </SectionCard>

           <SectionCard title="일일 지식 델타 (증분 분석)" icon={<Zap className="w-4 h-4" />}>
             <div className="space-y-4">
                {[
                  { tag: "정책", content: "산업통상자원부 'AI 제조 혁신 300' 프로젝트 상세 지침 발표", impact: "High" },
                  { tag: "과제", content: "KIAT 주관 글로벌 기술 협력 보조금 증액 확정 (20%)", impact: "Medium" },
                  { tag: "기술", content: "반도체 패키징 공정 내 Vision AI 적용 사례 (삼성전자 뉴스룸)", impact: "High" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-cmtx-border rounded-xl bg-white hover:border-cmtx-blue/30 transition-all cursor-pointer group">
                    <div className="shrink-0 flex flex-col items-center gap-1 border-r pr-4 border-slate-100 min-w-[70px]">
                      <Badge variant="outline" className="w-full text-center">{item.tag}</Badge>
                      <span className="text-[9px] font-bold text-cmtx-blue uppercase tracking-tighter">신규 델타</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-cmtx-navy leading-snug group-hover:text-cmtx-blue transition-colors">
                        {item.content}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
             </div>
           </SectionCard>
        </div>

        {/* Source Explorer */}
        <div className="space-y-8">
          <SectionCard title="문서 아카이브 (Vault)" icon={<Layers className="w-4 h-4" />}>
            <div className="space-y-3">
               {[
                 { name: "2024 AI 융합 추진계획.pdf", size: "2.4MB", date: "4월 18일" },
                 { name: "산업 혁신 3.0 전략보고서.docx", size: "1.1MB", date: "4월 17일" },
                 { name: "Global H/P Market Analysis.pdf", size: "4.8MB", date: "4월 15일" },
                 { name: "제조업 AX 설문 로우데이터.xlsx", size: "0.5MB", date: "4월 12일" },
               ].map((doc, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-white border border-transparent hover:border-cmtx-border transition-all cursor-pointer">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileText className="w-4 h-4 text-cmtx-blue" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-cmtx-navy truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] text-slate-400 font-medium">{doc.size}</span>
                        <span className="text-[9px] text-slate-400 font-medium">• {doc.date}</span>
                      </div>
                    </div>
                 </div>
               ))}
               <button className="w-full mt-4 py-2 border border-dashed border-cmtx-border rounded-xl text-xs font-bold text-slate-400 hover:border-cmtx-blue hover:text-cmtx-blue transition-all">
                  전체 아카이브 탐색
               </button>
            </div>
          </SectionCard>

          <SectionCard variant="dark" title="인텔리전스 쿼리 분석">
             <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    "최근 수집된 산업부 정책과 우리 회사의 AX 2번 프로젝트의 연계 가능성을 분석해줘."
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="strategic" className="opacity-70">MOTIE 2024</Badge>
                    <Badge variant="strategic" className="opacity-70">프로젝트 AX-02</Badge>
                  </div>
                </div>
                <button className="w-full bg-cmtx-blue text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-cmtx-blue/90 transition-all">
                   전략 시뮬레이션 가동
                   <Zap className="w-3 h-3 fill-current" />
                </button>
             </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}
