// src/components/ui/ModalInfo.tsx
'use client';
export default function ModalInfo({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <h3 className="">모달 상세 페이지</h3>
      <p className="">이 컴포넌트는 별도 데이터 없이도 렌더됩니다.</p>
      <div className="">
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
    