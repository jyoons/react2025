import React from 'react'
import './Checkbox.scss'

export const Checkbox: React.FC<{
  children?: React.ReactNode
  className?: string
}> = ({children, className = '' }) => {
    return <div className={`chk-wrap ${className}`}>{children}</div>
}

 export const  CheckboxItem: React.FC<{
    label?: React.ReactNode;
    //description?: React.ReactNode;
    checked?: boolean;
    id?:string;
    disabled?:boolean;
    defaultChecked?:boolean;
    onChange?: (checked: boolean) => void
     }> = ({ label, checked = false, onChange, id, disabled}) => {

    const uid = React.useId();
    const inputId = id ?? `chk-${uid}`;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked)
    }

 return (
  <div className="chk-item">
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={inputId} className="chk-label">
        <span className="chk-mark" />
        <span className="chk-text">{label}</span>
      </label>
    </div>
  )
 }