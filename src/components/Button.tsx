import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  icon?: string
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, icon, className = '' }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {icon && (
        <div className="btn-icon">
          <img src={icon} alt=""/>
        </div>
      )}
      {children}
    </button>
  )
}

export default Button