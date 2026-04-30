"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import { AXOpportunity } from "@/lib/mock-data";
import { Map, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function OpportunityCard({ opp }: { opp: AXOpportunity }) {
  return (
    <div className="p-5 border border-cmtx-border rounded-xl transition-all hover:shadow-xl hover:border-cmtx-blue/20 hover:-translate-y-1 group relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-1 h-full bg-cmtx-blue opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="mb-4 flex justify-between items-start">
        <Badge variant="outline">{opp.domain}</Badge>
        <div className={cn(
          "w-2 h-2 rounded-full",
          opp.priority === "High" ? "bg-rose-500" : "bg-emerald-500"
        )} />
      </div>
      <h4 className="text-sm font-bold text-cmtx-navy mb-3 line-clamp-1 leading-snug group-hover:text-cmtx-blue transition-colors">
        {opp.title}
      </h4>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">혁신 기대 효과 (Impact)</p>
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={cn(
                "w-1 h-2 rounded-full",
                i < opp.intensity ? "bg-cmtx-blue" : "bg-gray-100"
              )} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">예상 비용 절감</p>
          <p className="text-[10px] font-black text-cmtx-navy">{opp.savings}</p>
        </div>
      </div>
    </div>
  );
}

export function FrictionMap() {
  const bars = [
    { h: "h-[85%]", label: "QC 공정 검수", color: "bg-rose-500", detail: "수동 육안 검사로 인한 병목 현상" },
    { h: "h-[65%]", label: "클린룸 실사", color: "bg-cmtx-blue", detail: "종이 기반 기록실 입력 지연" },
    { h: "h-[40%]", label: "쿼츠 반입", color: "bg-cmtx-blue-light", detail: "원자재 물류 핸들링 지연" },
    { h: "h-[75%]", label: "자재 구매", color: "bg-cmtx-navy", detail: "원가 마켓 데이터 트래킹 딜레이" },
    { h: "h-[30%]", label: "데이터 아카이브", color: "bg-slate-300", detail: "디지털 통합 시스템 연동 지연" },
  ];

  return (
    <div className="relative h-[320px] bg-slate-950 rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center group shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.15),transparent)] pointer-events-none" />
      
      <div className="flex items-end gap-10 h-48 relative z-10">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center gap-4 group/bar">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: bar.h.replace('h-[', '').replace(']', '') }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className={cn("w-14 rounded-t-xl transition-all duration-300 group-hover:brightness-125 relative shadow-glow-blue", bar.color)}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-cmtx-navy px-3 py-1.5 rounded-lg text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-all shadow-xl whitespace-nowrap transform -translate-y-2 group-hover/bar:translate-y-0">
                {bar.detail}
              </div>
            </motion.div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between p-12 pointer-events-none opacity-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-full h-px bg-white" />
        ))}
      </div>

      <div className="absolute top-4 right-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">핵심 장애 요인 (위험)</span>
        </div>
        <Map className="w-4 h-4 text-slate-500" />
      </div>
    </div>
  );
}

