"use client";

import React, { useState } from "react";
import { Handshake, Plus, CheckCircle2, Loader2, Building2, CalendarDays, User, FileText } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { GovtCoopItem } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { GovtActivity, GOVT_ACTIVITIES } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ActivityType = GovtActivity["type"];
type ActivityStatus = GovtActivity["status"];

const TYPE_OPTIONS: ActivityType[] = ["회의", "방문", "공문", "협약", "전화"];
const STATUS_OPTIONS: { value: ActivityStatus; label: string; color: string }[] = [
  { value: "예정", label: "예정", color: "text-blue-600 bg-blue-50 border-blue-200" },
  { value: "완료", label: "완료", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { value: "후속조치 필요", label: "후속조치 필요", color: "text-rose-600 bg-rose-50 border-rose-200" },
];

const EMPTY_FORM = {
  title: "",
  ministry: "",
  contactPerson: "",
  type: "회의" as ActivityType,
  date: new Date().toISOString().split("T")[0],
  status: "예정" as ActivityStatus,
  summary: "",
  followUp: "",
};

export default function CooperationPage() {
  const [activities, setActivities] = useState<GovtActivity[]>(GOVT_ACTIVITIES);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "활동명을 입력해주세요.";
    if (!form.ministry.trim()) e.ministry = "기관명을 입력해주세요.";
    if (!form.contactPerson.trim()) e.contactPerson = "담당자를 입력해주세요.";
    if (!form.date) e.date = "날짜를 선택해주세요.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Simulate RPA processing delay
    await new Promise((r) => setTimeout(r, 1200));

    const newActivity: GovtActivity = {
      id: Date.now(),
      ...form,
    };

    setActivities((prev) => [newActivity, ...prev]);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setForm({ ...EMPTY_FORM });

    // Reset success state after 3s
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <PageTransition>
      <PageHeader
        title="정부/기관 협력"
        subtitle="부처·기관 커뮤니케이션 이력 및 후속 조치 관리"
        icon={<Handshake className="w-6 h-6" />}
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-xs font-black text-violet-700 uppercase tracking-wider">RPA 연동 활성</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── 좌측: 타임라인 ─── */}
        <div className="lg:col-span-2">
          <SectionCard title={`협력 활동 타임라인 (${activities.length}건)`}>
            <div className="mt-2">
              <AnimatePresence>
                {activities.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <GovtCoopItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SectionCard>
        </div>

        {/* ─── 우측: 현황 + 등록 폼 ─── */}
        <div className="space-y-6">
          {/* 현황 요약 */}
          <SectionCard title="협력 현황 요약">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "후속조치 필요", val: activities.filter(a => a.status === "후속조치 필요").length, color: "text-rose-500" },
                { label: "예정된 일정", val: activities.filter(a => a.status === "예정").length, color: "text-blue-500" },
                { label: "완료", val: activities.filter(a => a.status === "완료").length, color: "text-emerald-500" },
                { label: "총 활동", val: activities.length, color: "text-cmtx-navy" },
              ].map((stat, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 leading-tight">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 신규 일정 등록 폼 */}
          <div className="bg-white border border-cmtx-border rounded-2xl overflow-hidden shadow-subtle">
            {/* 폼 헤더 */}
            <div className="p-5 bg-gradient-to-r from-violet-600 to-violet-700 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-base leading-tight">신규 협력 활동 등록</p>
                  <p className="text-[11px] text-violet-200 font-bold mt-0.5">등록 즉시 RPA 자동 연동</p>
                </div>
              </div>
            </div>

            {/* RPA 성공 메시지 */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pt-4"
                >
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-black text-emerald-700">RPA 연동 완료</p>
                      <p className="text-[10px] text-emerald-600 font-medium">타임라인에 즉시 반영되었습니다.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 폼 본문 */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* 활동명 */}
              <FormField label="활동명 *" icon={FileText} error={errors.title}>
                <input
                  type="text"
                  placeholder="예: 산업부 과제 담당자 면담"
                  {...field("title")}
                  className={inputCls(!!errors.title)}
                />
              </FormField>

              {/* 기관명 */}
              <FormField label="기관명 *" icon={Building2} error={errors.ministry}>
                <input
                  type="text"
                  placeholder="예: 산업통상자원부"
                  {...field("ministry")}
                  className={inputCls(!!errors.ministry)}
                />
              </FormField>

              {/* 담당자 */}
              <FormField label="담당자 *" icon={User} error={errors.contactPerson}>
                <input
                  type="text"
                  placeholder="예: 소재부품 정책팀 사무관"
                  {...field("contactPerson")}
                  className={inputCls(!!errors.contactPerson)}
                />
              </FormField>

              {/* 유형 + 날짜 */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="활동 유형" icon={Handshake}>
                  <select {...field("type")} className={inputCls(false)}>
                    {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="날짜 *" icon={CalendarDays} error={errors.date}>
                  <input type="date" {...field("date")} className={inputCls(!!errors.date)} />
                </FormField>
              </div>

              {/* 상태 */}
              <div>
                <p className="text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">활동 상태</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-black transition-all",
                        form.status === opt.value ? opt.color : "text-slate-400 bg-slate-50 border-slate-200"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 요약 */}
              <FormField label="활동 요약" icon={FileText}>
                <textarea
                  placeholder="회의 또는 협력 내용을 간략히 입력..."
                  {...field("summary")}
                  rows={2}
                  className={cn(inputCls(false), "resize-none")}
                />
              </FormField>

              {/* 후속 조치 */}
              <FormField label="후속 조치 사항" icon={CheckCircle2}>
                <textarea
                  placeholder="후속 조치가 필요한 경우 입력..."
                  {...field("followUp")}
                  rows={2}
                  className={cn(inputCls(false), "resize-none")}
                />
              </FormField>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2",
                  isSubmitting
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    RPA 연동 중...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    타임라인에 등록
                  </>
                )}
              </button>
            </form>
          </div>

          {/* 즉시 조치 필요 항목 */}
          {activities.filter(a => a.status === "후속조치 필요").length > 0 && (
            <SectionCard title="즉시 조치 필요 항목" variant="glass">
              <div className="space-y-3">
                {activities.filter(a => a.status === "후속조치 필요").map(item => (
                  <div key={item.id} className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <p className="text-xs font-black text-rose-700 leading-snug">{item.title}</p>
                    {item.followUp && (
                      <p className="text-[11px] text-rose-500 font-bold mt-1">{item.followUp}</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

/* ─── 헬퍼 컴포넌트 ─── */
function FormField({
  label, icon: Icon, error, children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-rose-500 font-bold mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-3 py-2 text-sm font-medium border rounded-xl outline-none transition-all",
    "bg-slate-50 text-cmtx-navy placeholder:text-slate-300",
    hasError
      ? "border-rose-300 focus:ring-2 focus:ring-rose-200"
      : "border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
  );
}
