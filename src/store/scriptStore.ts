import { useState, useCallback } from 'react';

// 스크립트 아이템 타입 정의
export interface ScriptItem {
  id: number;
  text: string;
  isPlaying: boolean;
}

// === 초기 생성 함수들 ===

// 기본 스크립트 데이터
export const getDefaultScriptTexts = (): string[] => [
  '[공통]T청약서부본및 상품설명서',
  '[공통]약관교부 및 설명',
  '[공통]설명내용 상품설명서 동일확인',
  '[공통]자필서명여부',
  '[공통]품질보증해지안내',
  '[공통]청약철회',
  '[공통]위법계약해지',
  '[공통]고지의무위반 알릴의무',
  '[공통]통지의무',
  '[공통]보험금지급관련',
  '보험료 감액청구권',
  '[공통]수익자지정',
  '[공통]승환계약',
  '[공통]신용정보동의',
  '보험료와 환급율차이',
  '[해지환급금]치매관련-완판안내',
  '보상대상질병',
  '[치매]보장대상질병 -완판안내',
  '보험료와 환급율차이1',
  '[해지환급금]치매관련-완판안내2',
  '보상대상질병3',
  '[치매]보장대상질병 -완판안내4',
  '[해지환급금]치매관련-완판안내5'
];

// 스크립트 아이템 생성 함수
export const createScriptItem = (text: string, index: number): ScriptItem => ({
  id: index,
  text,
  isPlaying: index === 1 // 기본적으로 두 번째 항목이 재생 중
});

// 스크립트 리스트 생성 함수
export const createScriptList = (scriptTexts: string[]): ScriptItem[] => {
  return scriptTexts.map((text, index) => createScriptItem(text, index));
};

// 초기 재생 ID 결정 함수
export const getInitialPlayingId = (scripts: ScriptItem[]): number | null => {
  const playingScript = scripts.find(script => script.isPlaying);
  return playingScript ? playingScript.id : null;
};

// === 커스텀 훅 ===

// 커스텀 훅으로 스크립트 상태 관리
export const useScriptStore = () => {
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);

  // 스크립트 초기화
  const initializeScripts = useCallback((scriptTexts: string[]) => {
    const newScripts = createScriptList(scriptTexts);
    const initialPlayingId = getInitialPlayingId(newScripts);

    setScripts(newScripts);
    setCurrentPlayingId(initialPlayingId);
  }, []);

  // 스크립트 재생/일시정지 토글
  const toggleScript = useCallback((id: number) => {
    setScripts(prevScripts => {
      const updatedScripts = prevScripts.map(script => {
        if (script.id === id) {
          return { ...script, isPlaying: !script.isPlaying };
        }
        // 다른 스크립트는 정지
        return { ...script, isPlaying: false };
      });

      // 현재 재생 ID 업데이트
      const toggledScript = updatedScripts.find(s => s.id === id);
      setCurrentPlayingId(toggledScript?.isPlaying ? id : null);

      return updatedScripts;
    });
  }, []);

  // 모든 스크립트 정지
  const stopAllScripts = useCallback(() => {
    setScripts(prevScripts =>
      prevScripts.map(script => ({
        ...script,
        isPlaying: false
      }))
    );
    setCurrentPlayingId(null);
  }, []);

  return {
    scripts,
    currentPlayingId,
    toggleScript,
    stopAllScripts,
    initializeScripts
  };
};