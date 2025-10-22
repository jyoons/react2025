import React, { ReactNode } from 'react'
import './Section.scss'

interface SectionProps {
  title: string
  children: ReactNode
  className?: string
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={`section ${className || ''}`}>
      <h3 className="cont-title">{title}</h3>
      {children}
    </div>
  )
}

export default Section