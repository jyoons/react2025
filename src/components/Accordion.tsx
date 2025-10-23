import React, { useState } from 'react'
import './Accordion.scss'
import Button from './Button'

export const Accordion: React.FC<{
  children?: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
    return <div className={`accordion-wrap ${className}`}>{children}</div>
}

export const AccordionItem: React.FC<{
  children?: React.ReactNode
  className?: string
  title?: React.ReactNode
  defaultOpen?: boolean
}> = ({ children, className = '', title = '', defaultOpen = false}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const handleClick = () => setIsOpen((prev) => !prev)
  return (
    <section className={`accordion  ${className} ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header">
        <Button className='acc-btn' onClick={handleClick}>
          <span className="accordion-title">{title}</span>
        </Button>
      </div>
      <div className="accordion-conts">{children ?? '내용이 없습니다'}</div>
    </section>
  )
}