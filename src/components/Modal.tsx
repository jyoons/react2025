'use client';
import React from 'react';
import { useModalStore } from '@/store/ui/modalStore';

export default function Modal() {
  const { isOpen, name, payload, content, close, title,  clearContent } = useModalStore();

  if (!isOpen) return null;
  const handleBackdropClick = () => {
    clearContent();
    close();
  };
  // 모달 종류에 따라 분기
  const renderBody = () => {
    if (content) return content;
    switch (name) {
      case 'confirm':
        return (
          <div>
            <div className="modal-header">{title}</div>
            <div className="">{String(payload ?? 'Are you sure?')}</div>
            <div className="modal-btns">
              <button onClick={close}>OK</button> 
              <button onClick={close}>Cancel</button>
            </div>
          </div>
        );
      default:
        return <div>Generic Modal</div>;
    }
  };

  return (
    <div
      aria-modal
      role="dialog"
      className="modal"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        {renderBody()}
      </div>
    </div>
  );
}
