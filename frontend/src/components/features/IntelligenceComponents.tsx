"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import { Signal } from "@/lib/mock-data";
import { AlertCircle, TrendingUp, Globe, ArrowUpRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignalItem({ signal, onClick }: { signal: Signal; onClick?: () => void }) {
  const statusMap: Record<Signal["status"], any> = {
    Critical: "critical",
    Monitor: "warning",
    Review: "medium",
    Strategic: "strategic",
  };

  const statusLabelMap: Record<Signal["status"], string> = {
    Critical: "위험",
    Monitor: "모니터링",
    Review: "검토",
    Strategic: "전략",
  };

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(248, 250, 252, 1)" }}
      className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-transparent hover:border-cmtx-blue/20 transition-all group cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
          signal.status === "Critical" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"
        )}>
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] px-1.5 py-0">{signal.category}</Badge>
            <Badge variant={statusMap[signal.status]} className="text-[9px] px-1.5 py-0">{statusLabelMap[signal.status]}</Badge>
          </div>
          <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">
            {signal.title}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{signal.impact} 영향력</p>
        <p className="text-[9px] text-gray-400 font-medium">{signal.time}</p>
      </div>
    </motion.div>
  );
}

export function SectorHeatmap() {
  const sectors = [
    { name: "반도체 핵심 부품", value: 85, trend: "+12%", color: "bg-cmtx-blue" },
    { name: "글로벌 원자재", value: 65, trend: "+5%", color: "bg-emerald-500" },
    { name: "글로벌 물류망", value: 45, trend: "-2%", color: "bg-amber-500" },
    { name: "각국 규제 및 정책", value: 92, trend: "+24%", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-4">
      {sectors.map((sector) => (
        <div key={sector.name} className="space-y-1.5">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-bold text-cmtx-navy">{sector.name}</span>
            <span className="text-[10px] font-bold text-cmtx-secondary">{sector.trend}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${sector.value}%` }}
              transition={{ duration: 1 }}
              className={cn("h-full rounded-full", sector.color)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CompetitorRadar() {
  return (
    <div className="relative h-44 flex items-center justify-center">
      {/* Radar Circles */}
      <div className="absolute w-40 h-40 border border-slate-200 rounded-full animate-pulse" />
      <div className="absolute w-28 h-28 border border-slate-200 rounded-full" />
      <div className="absolute w-14 h-14 border border-slate-200 rounded-full" />
      
      {/* Radar Points */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute top-10 right-14 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
      />
      <div className="absolute bottom-12 left-10 w-1.5 h-1.5 bg-cmtx-blue rounded-full" />
      <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-500 rounded-full" />

      <div className="absolute bottom-2 right-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        활성 트래킹: 12개 자산
      </div>
    </div>
  );
}

export function TrendHero() {
  return (
    <div className="lg:col-span-2 relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-cmtx-navy to-slate-800 p-8 text-white group shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cmtx-blue/20 blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-cmtx-blue/30" />
      
      <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <Badge variant="strategic" className="bg-cmtx-blue/30 border-white/10 text-white">
            <Zap className="w-3 h-3 mr-1" /> AX 기반 반도체 산업 레이더
          </Badge>
          <div className="space-y-2">
            <h3 className="text-3xl font-black leading-tight tracking-tighter">
              차세대 High-NA EUV <br/>
              <span className="text-cmtx-blue-light italic">글로벌 공급망 재편</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-medium">
              ASML의 차세대 EUV 장비 도입이 가속화됨에 따라, 챔버용 특수 소모성 부품의 내열 성능 기준이 전년 대비 40% 상향되었습니다. 
              기술 장벽을 이용한 시장 선점이 필요한 전략적 골든 타임입니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">예상 수율 개선</p>
              <p className="text-lg font-bold">+18.5%</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cmtx-blue-light" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">시장 심리 지수</p>
              <p className="text-lg font-bold">긍정적 (Positive)</p>
            </div>
          </div>
          <button className="ml-auto w-12 h-12 bg-white text-cmtx-navy rounded-full flex items-center justify-center hover:bg-cmtx-blue-light hover:text-white transition-all shadow-xl hover:-translate-y-1">
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

