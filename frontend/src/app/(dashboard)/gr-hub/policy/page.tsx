"use client";

import React, { useState } from "react";
import { ShieldAlert, ScrollText, ClipboardCheck, Link2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { PolicyResponseItem } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { DetailPanel, DetailSection, RelatedLinkItem } from "@/components/common/DetailPanel";
import { POLICY_ITEMS, PolicyItem } from "@/lib/mock-data";

export default function PolicyPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);

  return (
    <PageTransition>
      <PageHeader
        title="정책/규제 대응"
        subtitle="규제·법률 변화 모니터링 및 전략적 대응 관리"
        icon={<ShieldAlert className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionCard title="정책·규제 모니터링 현황">
            <div className="space-y-4">
              {POLICY_ITEMS.map((item) => (
                <PolicyResponseItem key={item.id} item={item} onClick={() => setSelectedPolicy(item)} />
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="space-y-6">
          <SectionCard title="긴급 대응 현황">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "대응 필요", val: POLICY_ITEMS.filter(p => p.status === "대응 필요").length, color: "text-rose-500" },
                { label: "모니터링", val: POLICY_ITEMS.filter(p => p.status === "모니터링").length, color: "text-amber-500" },
                { label: "검토 완료", val: POLICY_ITEMS.filter(p => p.status === "검토 완료").length, color: "text-blue-500" },
                { label: "총 추적 항목", val: POLICY_ITEMS.length, color: "text-cmtx-navy" },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="긴급 규제 알림" variant="glass">
            <div className="space-y-3">
              {POLICY_ITEMS.filter(p => p.urgency === "High").map((item) => (
                <div key={item.id} className="flex gap-3 items-start cursor-pointer" onClick={() => setSelectedPolicy(item)}>
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                  <div>
                    <p className="text-[11px] font-black text-cmtx-navy leading-snug hover:text-cmtx-blue transition-colors">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.effectiveDate} 시행 · {item.ministry}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <DetailPanel isOpen={!!selectedPolicy} onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy?.title || ""} category={selectedPolicy?.ministry}
        status={selectedPolicy?.status} subtitle={`${selectedPolicy?.category} | 시행일: ${selectedPolicy?.effectiveDate}`}>
        <DetailSection title="규제 요약" icon={ScrollText}>
          <p className="font-medium text-slate-700 leading-relaxed">{selectedPolicy?.summary}</p>
        </DetailSection>
        {selectedPolicy?.impact && (
          <DetailSection title="CMTX 사업 영향 분석" icon={ShieldAlert}>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <p className="text-xs font-bold text-amber-800 leading-relaxed">{selectedPolicy.impact}</p>
            </div>
          </DetailSection>
        )}
        {selectedPolicy?.actionRequired && (
          <DetailSection title="필요 조치" icon={ClipboardCheck}>
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
              <p className="text-xs font-bold text-rose-700 leading-relaxed">{selectedPolicy.actionRequired}</p>
            </div>
          </DetailSection>
        )}
        {selectedPolicy?.sourceUrl && (
          <DetailSection title="원본 소스" icon={Link2}>
            <RelatedLinkItem title="공식 정부 포털" url={selectedPolicy.sourceUrl} type="policy" />
          </DetailSection>
        )}
      </DetailPanel>
    </PageTransition>
  );
}
