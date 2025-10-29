'use client';

import { create } from 'zustand'; //리액트 전용 상태 관리 라이브러리

type Mode = 'radio' | 'checkbox';
type SelectionMap = Record<string, string[]>;

interface SelectionStore {
  selectedByGroup: SelectionMap;

  // 읽기
  getChecked: (group: string) => string[];
  isChecked: (group: string, val: string) => boolean;

  // 쓰기
  onChange: (group: string, val: string, checked: boolean, mode: Mode) => void;
  setGroup: (group: string, values: string[]) => void;
  clearGroup: (group: string) => void;
  reset: () => void;

  // (선택) 바인딩 도우미: (val, checked) 시그니처 그대로 쓰고 싶을 때
  bind: (group: string, mode: Mode) => (val: string, checked: boolean) => void;
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedByGroup: {},

  // 읽기
  getChecked: (group) => get().selectedByGroup[group] ?? [],
  isChecked: (group, val) => (get().selectedByGroup[group] ?? []).includes(val),

  // 쓰기
  onChange: (group, val, checked, mode) =>
    set((state) => {
      const prev = state.selectedByGroup[group] ?? [];
      const next =
        mode === 'radio'
          ? (checked ? [val] : prev)                // 보통 라디오는 checked=true만 들어옴
          : checked
            ? Array.from(new Set([...prev, val]))   // 추가
            : prev.filter((v) => v !== val);        // 제거

      return { selectedByGroup: { ...state.selectedByGroup, [group]: next } };
    }),

  setGroup: (group, values) =>
    set((state) => ({
      selectedByGroup: {
        ...state.selectedByGroup,
        [group]: Array.from(new Set(values)),
      },
    })),

  clearGroup: (group) =>
    set((state) => {
      if (!(group in state.selectedByGroup)) return state;
      const { [group]: _omit, ...rest } = state.selectedByGroup;
      return { selectedByGroup: rest };
    }),

  reset: () => set({ selectedByGroup: {} }),

  bind:
    (group, mode) =>
    (val, checked) =>
      get().onChange(group, val, checked, mode),
}));
