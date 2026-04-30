"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Globe, Bookmark, Share2, Sparkles, TrendingUp, ShieldAlert, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  category?: string;
  status?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  category,
  status,
  children,
  footer
}: DetailPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-2xl z-[101] border-l border-slate-100 flex flex-col"
          >
            {/* Premium Intelligence Header */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cmtx-blue via-violet-500 to-rose-500" />
            
            {/* Header */}
            <div className="p-8 pb-6 border-b border-slate-50 relative">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-cmtx-blue animate-pulse" />
                <span className="text-[10px] font-black text-cmtx-blue uppercase tracking-[0.2em]">Intelligence Report</span>
              </div>
              
              <button 
                id="detail-panel-close"
                onClick={onClose}
                aria-label="Close detail panel"
                className="absolute top-8 right-8 p-2.5 hover:bg-slate-50 rounded-full transition-all text-slate-300 hover:text-cmtx-navy hover:rotate-90 z-[102]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {category && <Badge variant="strategic">{category}</Badge>}
                  {status && <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100">{status}</Badge>}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-cmtx-navy tracking-tight leading-tight mb-2">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-sm text-slate-400 font-bold flex items-center gap-2">
                      <div className="w-1 h-3 bg-slate-200 rounded-full" />
                      {subtitle}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-cmtx-navy text-white hover:bg-slate-800 rounded-xl text-[10px] font-black transition-all shadow-lg shadow-cmtx-navy/20 active:scale-95">
                    <Bookmark className="w-3.5 h-3.5" /> 전략 노트 저장
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-cmtx-blue hover:text-cmtx-blue rounded-xl text-[10px] font-black text-slate-600 transition-all active:scale-95">
                    <Share2 className="w-3.5 h-3.5" /> 인사이트 공유
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-10 pb-12">
                {children}

                {/* Structured AI Insight Section */}
                <div className="space-y-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 fill-current" />
                    </div>
                    <h3 className="text-sm font-black text-cmtx-navy uppercase tracking-tight">미래전략실 AI 분석 리포트</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase">기회 요인 (Opportunities)</span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                        반도체 소부장 국산화 정책 기조에 따른 세제 혜택 및 R&D 자금 확보 가능성이 매우 높음.
                      </p>
                    </div>

                    <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100/50 space-y-2">
                      <div className="flex items-center gap-2 text-rose-600">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase">리스크 (Risks)</span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold leading-relaxed">
                        사업 공고 마감 기한이 촉박하여 신속한 사업계획서 수립 및 부서 간 협업 필요.
                      </p>
                    </div>

                    <div className="p-6 bg-cmtx-navy rounded-[2rem] text-white space-y-3 shadow-xl shadow-cmtx-navy/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cmtx-blue/20 blur-2xl" />
                      <div className="flex items-center gap-2 text-cmtx-blue-light relative z-10">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[10px] font-black uppercase">전략실 대응 제언</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed relative z-10">
                        본 건은 당사 중장기 AX 로드맵의 '공정 지능화' 부문과 밀접한 연관이 있음. 기술 연구소와 매칭하여 가점 요인 확보 권고.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Strategist Checklist Section */}
                <div className="space-y-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-black text-cmtx-navy uppercase tracking-tight">전략적 타당성 검토 체크리스트</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { item: "당사 중장기 AX 로드맵과의 정합성 여부", checked: true },
                      { item: "핵심 소부장 기술 국산화 기여도", checked: true },
                      { item: "투입 자원 대비 정부 지원금 규모 적절성", checked: false },
                      { item: "부처/유관기관과의 중점 협력 분야 해당 여부", checked: true },
                    ].map((check, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                        <div className={cn(
                          "w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all",
                          check.checked ? "bg-cmtx-blue border-cmtx-blue text-white" : "border-slate-200"
                        )}>
                          {check.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={cn("text-xs font-bold", check.checked ? "text-cmtx-navy" : "text-slate-400")}>
                          {check.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source Verification */}
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">데이터 무결성 및 원문 확인</h3>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-[9px] font-bold text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      Verified Source
                    </div>
                  </div>
                  <RelatedLinkItem 
                    title="정부 공식 사업공고문 확인하기"
                    url="#"
                    type="policy"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DetailSection({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
        {Icon && <Icon className="w-4 h-4 text-cmtx-blue" />}
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function RelatedLinkItem({ title, url, type }: { title: string, url: string, type: string }) {
  const getIcon = () => {
    switch (type) {
      case "document": return <FileText className="w-3.5 h-3.5" />;
      case "policy": return <Bookmark className="w-3.5 h-3.5" />;
      case "news": return <Globe className="w-3.5 h-3.5" />;
      default: return <ExternalLink className="w-3.5 h-3.5" />;
    }
  };

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-transparent hover:border-cmtx-blue/30 hover:bg-white hover:shadow-sm transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-cmtx-blue transition-colors">
          {getIcon()}
        </div>
        <span className="text-xs font-bold text-slate-600 group-hover:text-cmtx-navy transition-colors">{title}</span>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-cmtx-blue transition-all" />
    </a>
  );
}
