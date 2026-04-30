"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { GRTrendSignalItem } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { GR_TREND_SIGNALS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function TrendsPage() {
  return (
    <PageTransition>
      <PageHeader
        title="산업 동향 대응"
        subtitle="뉴스·정책 변화 실시간 모니터링 및 전략 대응"
        icon={<TrendingUp className="w-6 h-6" />}
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">24시간 자동 수집 중</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionCard title="GR 전략 산업 동향 시그널">
            <div className="space-y-4">
              {GR_TREND_SIGNALS.map(item => (
                <GRTrendSignalItem key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="space-y-6">
          <SectionCard title="동향 영향도 분포">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "High 영향도", val: GR_TREND_SIGNALS.filter(s => s.impact === "High").length, color: "text-rose-500" },
                { label: "Medium 영향도", val: GR_TREND_SIGNALS.filter(s => s.impact === "Medium").length, color: "text-amber-500" },
                { label: "총 시그널", val: GR_TREND_SIGNALS.length, color: "text-cmtx-navy" },
                { label: "자동 수집", val: "24/7", color: "text-emerald-500" },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                  <p className={`text-xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="카테고리별 현황" variant="glass">
            <div className="space-y-3">
              {(["정책변화", "예산동향", "산업규제", "대외환경"] as const).map(cat => {
                const count = GR_TREND_SIGNALS.filter(s => s.category === cat).length;
                const total = GR_TREND_SIGNALS.length;
                return (
                  <div key={cat} className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold text-cmtx-navy shrink-0">{cat}</p>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cmtx-blue rounded-full transition-all" style={{ width: `${(count / total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-black text-cmtx-navy w-4 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}
