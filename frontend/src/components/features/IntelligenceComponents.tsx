"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import { Signal } from "@/lib/mock-data";
import { AlertCircle, TrendingUp, Globe, ArrowUpRight, Zap, Target, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Competitor, CompetitorSignal } from "@/lib/data-service";

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

export function CompetitorSignalItem({ signal, onClick }: { signal: CompetitorSignal; onClick?: () => void }) {
  const impactMap: Record<string, any> = {
    High: "critical",
    Medium: "warning",
    Low: "medium",
  };

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4 }}
      className="p-3 bg-white border border-slate-100 rounded-xl hover:border-cmtx-blue/30 hover:shadow-sm transition-all group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 w-2 h-2 rounded-full bg-cmtx-blue shrink-0 shadow-[0_0_8px_rgba(30,58,138,0.3)]" />
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{signal.competitor_name}</span>
            <Badge variant={impactMap[signal.impact] || "medium"} className="text-[8px] px-1 py-0">{signal.impact}</Badge>
          </div>
          <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors truncate">
            {signal.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function SectorHeatmap() {
  const sectors = [
    { name: "문서 보안 규제 및 정책", value: 85, trend: "+12%", color: "bg-cmtx-blue" },
    { name: "비정형 데이터 관리 효율", value: 65, trend: "+5%", color: "bg-emerald-500" },
    { name: "AX 기반 협업 솔루션", value: 45, trend: "+8%", color: "bg-amber-500" },
    { name: "데이터 주권 및 거버넌스", value: 92, trend: "+24%", color: "bg-rose-500" },
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

export function CompetitorRadar({ competitors = [] }: { competitors?: Competitor[] }) {
  return (
    <div className="relative h-56 flex items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100/50 overflow-hidden">
      {/* Radar Background Grids */}
      <div className="absolute w-[80%] h-[80%] border border-slate-200/60 rounded-full" />
      <div className="absolute w-[60%] h-[60%] border border-slate-200/40 rounded-full" />
      <div className="absolute w-[40%] h-[40%] border border-slate-200/30 rounded-full" />
      <div className="absolute w-[20%] h-[20%] border border-slate-200/20 rounded-full" />
      
      {/* Axis Lines */}
      <div className="absolute w-full h-[1px] bg-slate-200/20" />
      <div className="absolute w-[1px] h-full bg-slate-200/20" />
      
      {/* Radar Points (Dynamic) */}
      {competitors.map((comp, i) => (
        <motion.div 
          key={comp.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute group"
          style={{ 
            left: `${comp.radar_x * 80 + 10}%`, 
            top: `${comp.radar_y * 80 + 10}%` 
          }}
        >
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
            className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center cursor-pointer shadow-lg",
              i === 0 ? "bg-rose-500 shadow-rose-500/20" : i === 1 ? "bg-cmtx-blue shadow-cmtx-blue/20" : "bg-emerald-500 shadow-emerald-500/20"
            )}
          >
            <Target className="w-2.5 h-2.5 text-white" />
          </motion.div>
          
          {/* Label on Hover */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-cmtx-navy text-white text-[9px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
            {comp.name} ({comp.market_share})
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-[8px] font-bold text-slate-400">High Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cmtx-blue" />
          <span className="text-[8px] font-bold text-slate-400">Stable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-bold text-slate-400">Opportunity</span>
        </div>
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
            <Zap className="w-3 h-3 mr-1" /> AI 기반 문서 지능(AX) 레이더
          </Badge>
          <div className="space-y-2">
            <h3 className="text-3xl font-black leading-tight tracking-tighter">
              생성형 AI 결합 <br/>
              <span className="text-cmtx-blue-light italic">차세대 ECM 시장 혁신</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-medium">
              기업 내 방대한 비정형 문서를 AI가 스스로 학습하고 요약하는 AX 기술이 도입됨에 따라, 문서 관리 효율성이 전년 대비 60% 상향되었습니다. 
              지능형 문서 중앙화를 통한 경쟁 우위 확보가 필요한 전략적 골든 타임입니다.
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

export function CompetitorComparison({ competitors = [] }: { competitors?: Competitor[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">경쟁사</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">주력 제품</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-emerald-600">강점 (Strength)</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-rose-600">약점 (Weakness)</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">점유율</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {competitors.map((comp) => (
            <motion.tr 
              key={comp.id}
              whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
              className="group transition-colors"
            >
              <td className="py-4 px-4">
                <p className="text-sm font-black text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{comp.name}</p>
              </td>
              <td className="py-4 px-4">
                <Badge variant="outline" className="text-[10px] font-bold">{comp.product}</Badge>
              </td>
              <td className="py-4 px-4">
                <p className="text-xs font-bold text-emerald-700 leading-relaxed max-w-[200px]">{comp.strength}</p>
              </td>
              <td className="py-4 px-4">
                <p className="text-xs font-bold text-rose-700 leading-relaxed max-w-[200px]">{comp.weakness}</p>
              </td>
              <td className="py-4 px-4 text-right">
                <span className="text-xs font-black italic text-slate-500">{comp.market_share}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
