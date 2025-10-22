import React from 'react'
import './Checkbox.scss'

interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <label className="chk-item">
      <input
        type="checkbox"
        className="chk-box"
        checked={checked}
        onChange={handleChange}
      />
      <span className="chk-mark"></span>
      <span className="chk-text">{label}</span>
    </label>
  )
}

export default Checkbox