'use client';
import React from 'react';
import './Radio.scss';
import { useSelectionStore } from '@/store/selectionStore';

export const Radio: React.FC<{
  children?: React.ReactNode;
  className?: string;
  name?: string; // 자식에게 강제로 동일 name을 주고 싶을 때(옵션)
}> = ({ children, className = '', name }) => {
  type RadioChild = React.ReactElement<{ name?: string }>;
  const childrenWithName = name
    ? React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as RadioChild, { name }) : child
      )
    : children;

  return <div className={`rdo-wrap ${className}`}>{childrenWithName}</div>;
};

export const RadioItem: React.FC<{
  group: string;  
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
}> = ({ group, value, label, disabled, name, id }) => {
  const checked = useSelectionStore(
    (s) => !!s.selectedByGroup[group]?.includes(value)
  );
  const changeInStore = useSelectionStore((s) => s.onChange);

  const uid = React.useId();
  const inputId = id ?? `rdo-${uid}`;
  const radioName = name ?? group;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.currentTarget.checked;
    changeInStore(group, value, next, 'radio');      
  };

  return (
    <div className="rdo-item">
      <input
        id={inputId}
        type="radio"
        name={radioName}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={inputId} className="rdo-label">
        <span className="rdo-mark" />
        <span className="rdo-text">{label}</span>
      </label>
    </div>
  );
};
