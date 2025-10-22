import React, { useState } from 'react'
import './Select.scss'

interface SelectProps {
  options: string[]
  value?: string
  onChange?: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isActive, setIsActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsActive(true)
    setTimeout(() => setIsOpen(false), 0)
    onChange?.(e.target.value)
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleBlur = () => {
    setIsOpen(false)
  }

  return (
    <div className={`select-wrap ${isOpen ? 'open' : ''}`}>
      <select
        className="select"
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
      >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  )
}

export default Select