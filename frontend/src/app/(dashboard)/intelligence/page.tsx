"use client";

import React, { useState } from "react";
import { BarChart3, Zap, Info, ShieldAlert, ZapIcon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { SignalItem, TrendHero, SectorHeatmap, CompetitorRadar, CompetitorSignalItem, CompetitorComparison } from "@/components/features/IntelligenceComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { DetailPanel, DetailSection, RelatedLinkItem } from "@/components/common/DetailPanel";
import { SIGNALS, Signal } from "@/lib/mock-data";
import { fetchCompetitors, fetchCompetitorSignals, Competitor, CompetitorSignal } from "@/lib/data-service";

export default function IntelligencePage() {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [compSignals, setCompSignals] = useState<CompetitorSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function loadIntelligence() {
      setIsLoading(true);
      try {
        const [cRes, csRes] = await Promise.all([
          fetchCompetitors(),
          fetchCompetitorSignals()
        ]);
        setCompetitors(cRes.data);
        setCompSignals(csRes.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadIntelligence();
  }, []);

  return (
    <PageTransition>
      <PageHeader 
        title="경쟁사 인텔리전스"
        subtitle="글로벌 경쟁사 기술 동향 및 문서 관리 시장 레이더"
        icon={<BarChart3 className="w-6 h-6" />}
        actions={
          <button className="px-5 py-2.5 bg-cmtx-blue text-white rounded-xl text-xs font-black shadow-xl shadow-cmtx-blue/20 hover:bg-cmtx-blue/90 transition-all">
            AX 전략 보고서 (2026.05)
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TrendHero />

        <SectionCard 
          title="시장 시그널 (Market Signals)" 
          icon={<Zap className="w-4 h-4" />}
          headerAction={
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-cmtx-blue uppercase tracking-widest">실시간 분석 중</span>
            </div>
          }
        >
          <div className="space-y-4">
            {SIGNALS.map((signal) => (
              <SignalItem 
                key={signal.id} 
                signal={signal} 
                onClick={() => setSelectedSignal(signal)}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionCard title="경쟁사 레이더 (Competitor Radar)" subtitle="글로벌 티어 사별 신기술 및 점유율 트래킹">
            <CompetitorRadar competitors={competitors} />
          </SectionCard>
        </div>
        <div>
          <SectionCard title="경쟁사 활동 로그" icon={<ZapIcon className="w-4 h-4" />}>
            <div className="space-y-3">
              {compSignals.length > 0 ? (
                compSignals.map((s) => (
                  <CompetitorSignalItem key={s.id} signal={s} />
                ))
              ) : (
                <div className="py-10 text-center">
                  <p className="text-xs text-slate-400 font-bold">감지된 경쟁사 활동이 없습니다.</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="mt-8">
        <SectionCard title="경쟁사 상세 분석 (Competitor Matrix)" subtitle="주요 플레이어별 강점 및 약점 대조표">
          <CompetitorComparison competitors={competitors} />
        </SectionCard>
      </div>

      <div className="mt-8">
        <SectionCard title="섹터 분석 (Sector Analysis)" subtitle="반도체 소부장 부문별 시그널 밀집도">
           <SectorHeatmap />
        </SectionCard>
      </div>

      {/* Detail View Panel */}
      <DetailPanel
        isOpen={!!selectedSignal}
        onClose={() => setSelectedSignal(null)}
        title={selectedSignal?.title || ""}
        category={selectedSignal?.category}
        status={selectedSignal?.status}
        subtitle={selectedSignal?.source}
      >
        <DetailSection title="AI 인텔리전스 요약" icon={Info}>
          <p className="font-medium text-slate-700 leading-relaxed">
            {selectedSignal?.summary || "선택된 시그널에 대한 요약 정보가 없습니다. 재귀적 스크래핑 시뮬레이션이 자동 실행됩니다."}
          </p>
        </DetailSection>

        {selectedSignal?.deepAnalysis && (
          <DetailSection title="심층 전략 분석" icon={ZapIcon}>
            <div className="p-4 bg-slate-50 border border-cmtx-blue/10 rounded-2xl italic">
              {selectedSignal.deepAnalysis}
            </div>
          </DetailSection>
        )}

        <DetailSection title="재귀 수집 관련 링크" icon={ShieldAlert}>
          <div className="grid gap-3">
            {selectedSignal?.relatedLinks?.map((link, i) => (
              <RelatedLinkItem 
                key={i}
                title={link.title}
                url={link.url}
                type={link.type}
              />
            )) || (
              <p className="text-xs text-slate-400 italic">연결된 외부 문서 링크가 발견되지 않았습니다.</p>
            )}
          </div>
        </DetailSection>
      </DetailPanel>
    </PageTransition>
  );
}
