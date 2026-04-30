"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import { Grant, PolicyItem, GovtActivity, GRTrendSignal } from "@/lib/mock-data";
import { Gavel, Clock, ChevronRight, AlertTriangle, CheckCircle2, Eye, Building2, CalendarDays, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── 지원사업 확보 ─── */
export function GrantItem({ grant, onClick }: { grant: Grant; onClick?: () => void }) {
  const statusMap: Record<Grant["status"], any> = {
    Approved: "success",
    Submitted: "medium",
    Radar: "strategic",
    Draft: "outline",
  };
  const statusLabelMap: Record<Grant["status"], string> = {
    Approved: "승인됨",
    Submitted: "제출 완료",
    Radar: "전략 레이더",
    Draft: "임시 저장",
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(248, 250, 252, 1)" }}
      className="flex items-center justify-between p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-cmtx-blue opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-cmtx-blue/5 transition-colors">
          <Gavel className="w-5 h-5 text-cmtx-navy group-hover:text-cmtx-blue transition-colors" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] px-1.5 py-0">{grant.agency}</Badge>
            <Badge variant={statusMap[grant.status]} className="text-[9px] px-1.5 py-0">{statusLabelMap[grant.status]}</Badge>
          </div>
          <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{grant.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">예산 규모 (Budget)</p>
          <p className="text-xs font-black text-cmtx-navy">{grant.budget}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <Clock className="w-3 h-3 text-rose-500" />
            <p className="text-xs font-black text-rose-500 tracking-tighter">{grant.deadline}</p>
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">마감 기한 (Deadline)</p>
        </div>
        <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cmtx-blue transition-colors" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function GrantStatusBrief() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: "실행 중인 과제", val: "12", color: "text-cmtx-blue" },
        { label: "사업비 총합", val: "24.8억", color: "text-cmtx-navy" },
      ].map((stat, i) => (
        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.val}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── 정책/규제 대응 ─── */
export function PolicyResponseItem({ item, onClick }: { item: PolicyItem; onClick?: () => void }) {
  const urgencyConfig = {
    High: { bar: "bg-rose-500", badge: "text-rose-600 bg-rose-50 border-rose-100" },
    Medium: { bar: "bg-amber-400", badge: "text-amber-600 bg-amber-50 border-amber-100" },
    Low: { bar: "bg-emerald-400", badge: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  };
  const statusConfig: Record<PolicyItem["status"], { icon: React.ElementType; color: string }> = {
    "대응 필요": { icon: AlertTriangle, color: "text-rose-500" },
    "모니터링": { icon: Eye, color: "text-amber-500" },
    "검토 완료": { icon: CheckCircle2, color: "text-blue-500" },
    "대응 완료": { icon: CheckCircle2, color: "text-emerald-500" },
  };
  const cfg = urgencyConfig[item.urgency];
  const statusCfg = statusConfig[item.status];
  const StatusIcon = statusCfg.icon;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
    >
      <div className={cn("absolute top-0 left-0 w-1 h-full rounded-r-full", cfg.bar)} />
      <div className="pl-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
              <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border", cfg.badge)}>{item.status}</span>
              <span className="text-[9px] font-bold text-slate-400">{item.ministry}</span>
            </div>
            <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors leading-snug">{item.title}</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">{item.summary}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <StatusIcon className={cn("w-5 h-5", statusCfg.color)} />
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">시행일</p>
              <p className="text-xs font-black text-cmtx-navy">{item.effectiveDate}</p>
            </div>
          </div>
        </div>
        {item.actionRequired && (
          <div className="mt-3 px-3 py-2 bg-rose-50 border border-rose-100 rounded-lg">
            <p className="text-[10px] font-black text-rose-600 uppercase tracking-wider mb-0.5">필요 조치</p>
            <p className="text-[11px] font-bold text-rose-700 leading-snug">{item.actionRequired}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── 정부/기관 협력 (타임라인) ─── */
export function GovtCoopItem({ item }: { item: GovtActivity }) {
  const typeConfig: Record<GovtActivity["type"], { color: string; bg: string }> = {
    "회의": { color: "text-blue-600", bg: "bg-blue-50" },
    "방문": { color: "text-violet-600", bg: "bg-violet-50" },
    "공문": { color: "text-slate-600", bg: "bg-slate-100" },
    "협약": { color: "text-emerald-600", bg: "bg-emerald-50" },
    "전화": { color: "text-amber-600", bg: "bg-amber-50" },
  };
  const statusConfig: Record<GovtActivity["status"], { color: string; border: string }> = {
    "완료": { color: "text-emerald-600 bg-emerald-50", border: "border-emerald-100" },
    "예정": { color: "text-blue-600 bg-blue-50", border: "border-blue-100" },
    "후속조치 필요": { color: "text-rose-600 bg-rose-50", border: "border-rose-100" },
  };
  const typeCfg = typeConfig[item.type];
  const statusCfg = statusConfig[item.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0", typeCfg.bg, typeCfg.color)}>
          {item.type}
        </div>
        <div className="w-px flex-1 bg-slate-100 mt-2" />
      </div>
      <div className="pb-6 flex-1">
        <div className="p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-md transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border", statusCfg.color, statusCfg.border)}>{item.status}</span>
            </div>
            <p className="text-sm font-bold text-cmtx-navy leading-snug">{item.title}</p>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{item.ministry}</span>
              <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{item.date}</span>
            </div>
          </div>
          {item.summary && <p className="mt-2 text-[11px] text-slate-500 font-medium leading-relaxed">{item.summary}</p>}
          {item.followUp && (
            <div className="mt-2.5 px-3 py-2 bg-cmtx-blue/5 border border-cmtx-blue/10 rounded-lg">
              <p className="text-[10px] font-black text-cmtx-blue uppercase tracking-wider mb-0.5">후속 조치</p>
              <p className="text-[11px] font-bold text-slate-600">{item.followUp}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── 산업 동향 대응 ─── */
export function GRTrendSignalItem({ item }: { item: GRTrendSignal }) {
  const impactConfig = {
    High: { dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]", badge: "text-rose-600 bg-rose-50 border-rose-100" },
    Medium: { dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]", badge: "text-amber-600 bg-amber-50 border-amber-100" },
    Low: { dot: "bg-slate-300", badge: "text-slate-500 bg-slate-50 border-slate-100" },
  };
  const categoryColor: Record<GRTrendSignal["category"], string> = {
    "정책변화": "text-violet-600 bg-violet-50",
    "예산동향": "text-emerald-600 bg-emerald-50",
    "산업규제": "text-rose-600 bg-rose-50",
    "대외환경": "text-blue-600 bg-blue-50",
  };
  const cfg = impactConfig[item.impact];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="flex gap-3 p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-lg transition-all group cursor-pointer"
    >
      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", cfg.dot)} />
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("text-[9px] font-black px-2 py-0.5 rounded", categoryColor[item.category])}>{item.category}</span>
          <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border", cfg.badge)}>영향도: {item.impact}</span>
          <span className="text-[9px] text-slate-400 font-bold">{item.time}</span>
        </div>
        <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors leading-snug">{item.title}</p>
        {item.summary && <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.summary}</p>}
        <p className="text-[10px] text-slate-400 font-bold">출처: {item.source}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-cmtx-blue transition-colors shrink-0 mt-0.5" />
    </motion.div>
  );
}
