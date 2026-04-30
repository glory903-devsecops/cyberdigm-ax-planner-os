"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Activity, Play, RefreshCcw, Globe, Clock, Plus, X, Search, Filter, ChevronRight, CheckCircle2, Database, Layout, Target, Tag, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/common/Badge";
import { PageTransition } from "@/components/layout/PageTransition";
import { AutomationTarget } from "@/lib/automation-targets";
import { cn } from "@/lib/utils";
import { useSimulation } from "@/lib/useSimulation";
import { fetchCrawlingTargets, addCrawlingTarget } from "@/lib/data-service";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Skeleton } from "@/components/common/Skeleton";

export default function AutomationPage() {
  const [targets, setTargets] = useState<AutomationTarget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AutomationTarget["target_menu"] | "All">("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const { isSimulating, progress, status, logs, startSimulation, resetSimulation } = useSimulation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    loadTargets();
  }, []);

  const loadTargets = async () => {
    setIsLoading(true);
    const { data } = await fetchCrawlingTargets();
    setTargets(data);
    // 프리미엄 트랜지션을 위한 미세 지연
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredTargets = activeTab === "All" 
    ? targets 
    : targets.filter(t => t.target_menu === activeTab);

  const handleStartAll = () => {
    startSimulation([
      { message: "CMTX 멀티 에이전트 스크래퍼 초기화 중...", duration: 600 },
      { message: "IRIS 접속 중 (소부장 과제 탐색중)...", duration: 1000 },
      { message: "정부 1차 공고문 데이터 수집 중...", duration: 800 },
      { message: "재귀적 분석: 관련 정책 링크 식별 중...", duration: 1200 },
      { message: "AX 전략적 딥다이브 보고서 컴파일 중...", duration: 800 },
    ]);
  };

  return (
    <PageTransition>
      <PageHeader 
        title="자동화 센터"
        subtitle="전략적 데이터 관제 본부 및 크롤러 매니지먼트"
        icon={<Cpu className="w-6 h-6" />}
        actions={
          <div className="flex gap-2">
            <button 
              onClick={() => { resetSimulation(); loadTargets(); }}
              className="px-4 py-2 border border-cmtx-border bg-white rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95"
            >
              <RefreshCcw className={cn("w-3.5 h-3.5", isSimulating && "animate-spin")} /> 동기화
            </button>
            <button 
              onClick={handleStartAll}
              disabled={isSimulating}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold shadow-lg transition-all flex items-center gap-2",
                isSimulating 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-cmtx-blue text-white shadow-cmtx-blue/20 hover:bg-cmtx-blue/90 hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {isSimulating ? <Activity className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
              {isSimulating ? "전체 가동 중" : "일괄 크롤링 시작"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-3 space-y-6">
          
          {/* Progress Bar (Visible when simulating) */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-cmtx-navy text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cmtx-blue/20 to-transparent " />
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cmtx-blue rounded-full animate-ping" />
                      <h4 className="text-lg font-bold">인텔리전스 수집 파이프라인 가동 중</h4>
                    </div>
                    <span className="text-2xl font-black">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cmtx-blue shadow-[0_0_15px_rgba(37,99,235,0.8)]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <SectionCard variant="glass">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {["All", "GR Hub", "Intelligence", "AX Planning"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                      activeTab === tab ? "bg-white text-cmtx-navy shadow-sm" : "text-slate-500 hover:text-cmtx-navy"
                    )}
                  >
                    {tab === "All" ? "전체" : tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-cmtx-blue" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                  {isLoading ? "동기화 중..." : `${filteredTargets.length}개의 타겟 로드 완료`}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-[200px] rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTargets
                  .sort((a, b) => (a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1))
                  .map((target) => (
                    <TargetItem key={target.id} target={target} isRunning={isSimulating && target.enabled} />
                  ))}
              </div>
            )}
          </SectionCard>

          {/* 실시간 인텔리전스 로그 터미널 */}
          <AnimatePresence>
            {(isSimulating || logs.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-slate-900 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden mt-6"
              >
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Recursive Intelligence Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-cmtx-blue-light animate-pulse">LIVE ANALYSIS</span>
                  </div>
                </div>
                <div className="p-6 h-[240px] overflow-y-auto font-mono text-[11px] space-y-2.5 scrollbar-hide">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3"
                    >
                      <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString('ko-KR', { hour12: false })}]</span>
                      <span className={cn(
                        "font-medium",
                        log.includes("완료") ? "text-emerald-400" : 
                        log.includes("실패") || log.includes("오류") ? "text-rose-400" :
                        log.includes("분석") ? "text-cmtx-blue-light" : "text-slate-300"
                      )}>
                        {log}
                      </span>
                    </motion.div>
                  ))}
                  {isSimulating && (
                    <div className="flex items-center gap-2 text-cmtx-blue-light">
                      <span className="animate-bounce">_</span>
                      <span className="text-[10px] italic">Deep-scanning for strategic links...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
           <SectionCard title="실시간 작업 현황" icon={<Activity className="w-4 h-4" />}>
             <div className="space-y-5">
                {[
                  { name: "핵심 과제 스크래퍼", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? progress : 0 },
                  { name: "산업 인텔리전스 분석", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 20) : 0 },
                  { name: "정부 정책 레이더", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 40) : 0 },
                  { name: "AX 기획 엔진 동기화", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 60) : 0 },
                ].map((task, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-cmtx-navy tracking-tight">{task.name}</span>
                      <span className={cn(
                        task.status === "가동 중" ? "text-cmtx-blue" : "text-slate-400"
                      )}>{task.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-cmtx-blue" 
                        animate={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
             </div>
           </SectionCard>

           <SectionCard title="시스템 통합 지표" variant="dark">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/10 rounded-lg">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-emerald-400 uppercase">동기화 상태</p>
                     <p className="text-xs text-slate-400">{targets.filter(t => t.enabled).length}개 채널 활성</p>
                   </div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">오늘 수집된 인텔리전스</p>
                    <p className="text-2xl font-bold text-white italic">140 <span className="text-xs font-normal text-slate-500">건 돌파</span></p>
                 </div>
              </div>
           </SectionCard>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-cmtx-navy text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group z-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-cmtx-blue opacity-0 group-hover:opacity-100 transition-opacity" />
        <Plus className="w-8 h-8 relative z-10" />
      </button>

      {/* Add Target Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <AddTargetModal 
                onClose={() => setShowAddModal(false)} 
                onSuccess={() => { setShowAddModal(false); loadTargets(); }} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

function AddTargetModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    target_menu: "GR Hub",
    category: "정부 과제",
    priority: "Medium",
    frequency: "매일",
    purpose: "",
    keywords: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const targetData: Omit<AutomationTarget, 'id'> = {
      name: formData.name,
      url: formData.url,
      target_menu: formData.target_menu as any,
      category: formData.category,
      priority: formData.priority as any,
      frequency: formData.frequency as any,
      purpose: formData.purpose,
      enabled: true,
      keywords: formData.keywords.split(",").map(k => k.trim()).filter(k => k !== "")
    };

    if (isLoggedIn) {
      const success = await addCrawlingTarget(targetData);
      if (success) {
        onSuccess();
      } else {
        alert("데이터 등록 중 오류가 발생했습니다.");
      }
    } else {
      alert("🔒 게스트 모드: 기능 체험을 위해 목록에 임시 추가되었습니다. (DB에는 저장되지 않으며 새로고침 시 초기화됩니다)");
      onSuccess();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 bg-cmtx-navy text-white flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black tracking-tight">수집 타겟 신규 등록</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">AX Intelligence Control Tower</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">사이트 명칭</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all"
                placeholder="예: IITP 정보통신기획평가원"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">대상 메뉴</label>
            <div className="relative">
              <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all appearance-none"
                value={formData.target_menu}
                onChange={e => setFormData({...formData, target_menu: e.target.value})}
              >
                <option value="GR Hub">지원 사업 확보 (GR Hub)</option>
                <option value="Intelligence">산업 동향 대응 (Intelligence)</option>
                <option value="AX Planning">기획 지원 (AX Planning)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">URL 경로</label>
          <input 
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all"
            placeholder="https://..."
            value={formData.url}
            onChange={e => setFormData({...formData, url: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">카테고리</label>
            <input 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all"
              placeholder="예: 정부 과제"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">중요도</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all appearance-none"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value as any})}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">수집 빈도</label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all appearance-none"
              value={formData.frequency}
              onChange={e => setFormData({...formData, frequency: e.target.value as any})}
            >
              <option value="매일">매일</option>
              <option value="매주">매주</option>
              <option value="매월">매월</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Tag className="w-3 h-3" /> 수집 키워드 (쉼표 구분)
          </label>
          <input 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all"
            placeholder="반도체, AI, 디지털전환..."
            value={formData.keywords}
            onChange={e => setFormData({...formData, keywords: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-3 h-3" /> 수집 목적
          </label>
          <textarea 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all min-h-[80px]"
            placeholder="해당 사이트를 수집하는 전략적 이유를 입력하세요."
            value={formData.purpose}
            onChange={e => setFormData({...formData, purpose: e.target.value})}
          />
        </div>


        <div className="pt-4 flex gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-200 transition-all"
          >
            취소
          </button>
          <button 
            disabled={isSubmitting}
            className="flex-[2] py-4 bg-cmtx-blue text-white rounded-2xl text-xs font-black shadow-xl shadow-cmtx-blue/20 hover:bg-cmtx-blue/90 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? "등록 중..." : "전략적 타겟 등록 완료"}
          </button>
        </div>
      </form>
    </div>
  );
}

function TargetItem({ target, isRunning }: { target: AutomationTarget, isRunning: boolean }) {
  return (
    <motion.div 
      layout
      whileHover={target.enabled ? { y: -2 } : {}}
      className={cn(
        "p-5 bg-white border border-cmtx-border rounded-2xl transition-all group flex flex-col justify-between relative overflow-hidden",
        target.enabled ? "hover:shadow-xl cursor-pointer" : "opacity-60 bg-slate-50 border-dashed"
      )}
    >
      {isRunning && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-cmtx-blue"
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="strategic" className="text-[8px] px-1.5">{target.target_menu}</Badge>
            <Badge variant="outline" className="text-[8px]">{target.category}</Badge>
          </div>
          <div className="flex gap-1.5">
            <Badge variant={target.priority === "High" ? "critical" : "medium"} className="px-1">{target.priority}</Badge>
            <Badge variant="default" className="px-1">{target.frequency}</Badge>
          </div>
        </div>
        <div>
          <h4 className={cn(
            "text-base font-black flex items-center gap-2 transition-colors",
            target.enabled ? "text-cmtx-navy group-hover:text-cmtx-blue" : "text-slate-400"
          )}>
            <Globe className="w-4 h-4" />
            {target.name}
          </h4>
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">{target.purpose}</p>
        </div>

        {target.keywords && target.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {target.keywords.map((kw, i) => (
              <span key={i} className="text-[9px] text-cmtx-blue font-bold">#{kw}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <Clock className="w-3.5 h-3.5" /> {isRunning ? "수집 중..." : target.enabled ? "09:00 가동 대기" : "개발 중"}
        </div>
        {target.enabled && (
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-cmtx-navy transition-all">
              <Search className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-cmtx-navy transition-all">
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

