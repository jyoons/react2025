'use client';
import { create } from 'zustand';

type ModalState = {
  // 단일 모달만 쓰면 isOpen/title/content 정도로도 충분
  isOpen: boolean;
  name?: string; // 모달 종류 구분용 (예: 'confirm', 'profile')
  payload?: unknown;  // 모달에 넘길 데이터
  title?:string;
  content?: React.ReactNode;
  open: (name: string, title?:string, payload?: unknown, ) => void;
  openContent: (node: React.ReactNode) => void; 
  close: () => void;
  clearContent: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  name: undefined,
  payload: undefined,
  open: (name, title, payload) => set({ isOpen: true, name, title, payload }),
  openContent: (node) => set({ isOpen: true, content: node, name: undefined, payload: undefined }),
  close: () => set({ isOpen: false, name: undefined, payload: undefined }),
  clearContent: () => set({ content: undefined, name: undefined, payload: undefined }),
}));
