/**
 * data-service.ts
 * Supabase 우선 → 환경변수 없거나 데이터 없으면 mock-data fallback
 * 프론트엔드 어디서든 이 함수를 사용하면 됩니다.
 */
import { supabase, isSupabaseConfigured } from './supabase';
import { GRANTS, POLICY_ITEMS, GR_TREND_SIGNALS } from './mock-data';
import type { Grant, PolicyItem, GRTrendSignal } from './mock-data';

// Supabase에서 오는 grants 행을 프론트 Grant 타입으로 변환
function toGrant(row: any): Grant {
  return {
    id: row.id,
    title: row.title ?? '',
    agency: row.agency ?? '',
    type: row.category ?? 'R&D',
    budget: row.budget ?? '미정',
    status: 'Radar',
    deadline: row.application_end
      ? formatDeadline(row.application_end)
      : '확인 필요',
    description: row.description,
    sourceUrl: row.source_url,
  };
}

function formatDeadline(dateStr: string): string {
  const end = new Date(dateStr);
  const today = new Date();
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return '마감';
  if (diff === 0) return 'D-Day';
  if (diff <= 14) return `D-${diff}`;
  return dateStr.slice(0, 10);
}

/**
 * 지원사업 데이터 가져오기
 * - Supabase 설정 O + 데이터 있음 → 실제 데이터
 * - 그 외 → mock 데이터 (fallback)
 */
export async function fetchGrants(): Promise<{ data: Grant[]; isLive: boolean }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('grants')
        .select('*')
        .eq('status', 'active')
        .order('crawled_at', { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        const mapped = data.map(toGrant);
        // 전략적 키워드 기반 가중치 정렬 (반도체, 소부장 우선)
        const strategicKeywords = ["반도체", "소부장", "세라믹", "쿼츠", "공정", "EUV"];
        const sorted = mapped.sort((a, b) => {
          const aRelevance = strategicKeywords.filter(k => a.title.includes(k) || a.description?.includes(k)).length;
          const bRelevance = strategicKeywords.filter(k => b.title.includes(k) || b.description?.includes(k)).length;
          return bRelevance - aRelevance;
        });
        return { data: sorted, isLive: true };
      }
    } catch (e) {
      console.warn('[data-service] Supabase 오류, mock fallback:', e);
    }
  }

  // fallback: mock 데이터 반환 (Mock 데이터도 정렬 적용)
  const strategicKeywords = ["반도체", "소부장", "세라믹", "쿼츠", "공정", "EUV"];
  const sortedMock = [...GRANTS].sort((a, b) => {
    const aRelevance = strategicKeywords.filter(k => a.title.includes(k) || a.description?.includes(k)).length;
    const bRelevance = strategicKeywords.filter(k => b.title.includes(k) || b.description?.includes(k)).length;
    return bRelevance - aRelevance;
  });
  return { data: sortedMock, isLive: false };
}

/**
 * 정책/규제 데이터 — 현재 mock only (Phase 2에서 Supabase 연동 예정)
 */
export async function fetchPolicyItems(): Promise<{ data: PolicyItem[]; isLive: boolean }> {
  // TODO: Supabase policy_items 테이블 연동 (Phase 2)
  return { data: POLICY_ITEMS, isLive: false };
}

import { DEFAULT_TARGETS, AutomationTarget } from './automation-targets';

// ... (기존 코드 생략)

/**
 * 크롤링 대상 목록 가져오기
 */
export async function fetchCrawlingTargets(): Promise<{ data: AutomationTarget[]; isLive: boolean }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('crawling_targets')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          url: row.url,
          category: row.category,
          target_menu: row.target_menu,
          priority: row.priority,
          frequency: row.frequency,
          purpose: row.purpose,
          enabled: row.enabled,
          keywords: row.keywords
        }));
        return { data: mapped, isLive: true };
      }
    } catch (e) {
      console.warn('[data-service] Crawling Targets 조회 실패:', e);
    }
  }
  return { data: DEFAULT_TARGETS, isLive: false };
}

/**
 * 크롤링 대상 추가하기
 */
export async function addCrawlingTarget(target: Omit<AutomationTarget, 'id'>): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('crawling_targets')
        .insert([target]);
      
      if (!error) return true;
      console.error('[data-service] Target 추가 실패:', error);
    } catch (e) {
      console.error('[data-service] Target 추가 오류:', e);
    }
  }
  return false;
}

/**
 * 산업 동향 시그널 — 현재 mock only (Phase 3에서 Supabase 연동 예정)
 */
export async function fetchTrendSignals(): Promise<{ data: GRTrendSignal[]; isLive: boolean }> {
  // TODO: Supabase gr_trend_signals 테이블 연동 (Phase 3)
  return { data: GR_TREND_SIGNALS, isLive: false };
}
