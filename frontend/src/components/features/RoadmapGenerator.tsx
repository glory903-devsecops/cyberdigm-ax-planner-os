"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Target, BarChart, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapGenerator({ isOpen, onClose }: RoadmapGeneratorProps) {
  const [step, setStep] = React.useState(1);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="h-1.5 bg-gradient-to-r from-cmtx-blue via-violet-500 to-rose-500 w-full" />
            <div className="p-8 flex justify-between items-center border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cmtx-navy text-white flex items-center justify-center shadow-xl">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-cmtx-navy tracking-tight">AX 전략 로드맵 생성기</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Future Strategy Office Engine</p>
                </div>
              </div>
              <button 
                id="roadmap-generator-close"
                onClick={onClose} 
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 flex-1 min-h-[400px]">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">혁신 대상 사업 부문</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["정밀 쿼츠 가공", "반도체 세정/코팅", "핵심 부품 유통", "연구 개발 (R&D)"].map((dept) => (
                        <button key={dept} className="p-4 rounded-2xl border-2 border-slate-100 text-left hover:border-cmtx-blue hover:bg-cmtx-blue/5 transition-all group">
                          <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue">{dept}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block">핵심 달성 목표 (KPI)</label>
                    <div className="relative">
                      <Target className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <textarea 
                        placeholder="예: 공정 불량률 30% 개선 및 지능형 물류 시스템 구축"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-12 text-sm font-medium focus:ring-2 focus:ring-cmtx-blue/20 outline-none h-32 transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-cmtx-navy text-white rounded-2xl font-black text-sm shadow-xl shadow-cmtx-navy/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    전략 분석 시작하기
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full space-y-8">
                  {!isGenerating ? (
                    <div className="text-center space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { icon: BarChart, label: "데이터 분석", val: "94%" },
                          { icon: ShieldCheck, label: "리스크 검증", val: "100%" },
                          { icon: Clock, label: "일정 최적화", val: "Optimal" },
                        ].map((stat, i) => (
                          <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <stat.icon className="w-6 h-6 text-cmtx-blue mx-auto mb-3" />
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
                            <p className="text-sm font-black text-cmtx-navy">{stat.val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-8 bg-cmtx-navy text-white rounded-[2.5rem] space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cmtx-blue/20 blur-3xl" />
                        <h4 className="text-lg font-bold tracking-tight">준비가 완료되었습니다.</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                          미래전략실 AI 엔진이 귀하의 목표를 분석하여<br/>
                          최적의 AX 로드맵 3개년 계획을 생성할 준비가 되었습니다.
                        </p>
                        <button 
                          onClick={handleGenerate}
                          className="w-full py-4 bg-cmtx-blue rounded-2xl text-white font-black text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          로드맵 리포트 생성
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 border-4 border-cmtx-blue/20 border-t-cmtx-blue rounded-full animate-spin mx-auto" />
                      <div className="space-y-2">
                        <p className="text-lg font-black text-cmtx-navy animate-pulse">전략 시나리오 연산 중...</p>
                        <p className="text-xs text-slate-400 font-bold">인텔리전스 엔진이 대관 데이터와 내부 공정 데이터를 대조하고 있습니다.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">분석 완료</p>
                      <h4 className="text-sm font-black text-cmtx-navy">프리미엄 AX 전략 리포트가 생성되었습니다.</h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-cmtx-blue rounded-full" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400">PHASE 01</p>
                          <p className="text-sm font-bold text-cmtx-navy">데이터 통합 및 모니터링 체계 고도화</p>
                        </div>
                      </div>
                      <Badge variant="strategic">Q2 완료</Badge>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-violet-500 rounded-full" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400">PHASE 02</p>
                          <p className="text-sm font-bold text-cmtx-navy">공정 지능화 및 실시간 불량 예측 AI 도입</p>
                        </div>
                      </div>
                      <Badge variant="strategic">Q4 예정</Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">
                      PDF 리포트 저장
                    </button>
                    <button 
                      onClick={onClose}
                      className="flex-[1.5] py-4 bg-cmtx-navy text-white rounded-2xl font-black text-sm shadow-xl shadow-cmtx-navy/20 hover:brightness-125 transition-all"
                    >
                      전략 보드에 적용하기
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Badge({ variant, children, className }: { variant?: string, children: React.ReactNode, className?: string }) {
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
      variant === "strategic" ? "bg-cmtx-blue/10 text-cmtx-blue border border-cmtx-blue/20" : "bg-slate-100 text-slate-500",
      className
    )}>
      {children}
    </span>
  );
}
