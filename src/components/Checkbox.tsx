'use client';
import React from 'react'
import './Checkbox.scss'
import { useSelectionStore } from '@/store/selectionStore';

export const Checkbox: React.FC<{
  children?: React.ReactNode
  className?: string
}> = ({children, className = '' }) => {
    return <div className={`chk-wrap ${className}`}>{children}</div>
}

 export const  CheckboxItem: React.FC<{
  group: string;
  value:string
    label?: React.ReactNode;
    //description?: React.ReactNode;
    // checked?: boolean;
    // id?:string;
    disabled?:boolean;
    // defaultChecked?:boolean;
    //onChange?: (checked: boolean) => void
     }> = ({ group, value, label, disabled}) => {
      const checked = useSelectionStore(
        (s) => !!s.selectedByGroup[group]?.includes(value)
      );
    // const isChecked = useSelectionStore((s) => s.isChecked);
  const changeInStore = useSelectionStore(s => s.onChange);
    const uid = React.useId();
    const inputId = `chk-${uid}`;
    // const checked = isChecked(group, value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const next = e.currentTarget.checked;
    console.log('prev:', checked, 'next:', next, 'group:', group, 'value:', value);
    changeInStore(group, value, next, 'checkbox');
    }

 return (
  <div className="chk-item">
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onClick={() => console.log('CLICK input')}
      />
      <label htmlFor={inputId} className="chk-label">
        <span className="chk-mark" />
        <span className="chk-text">{label}</span>
      </label>
    </div>
  )
 }