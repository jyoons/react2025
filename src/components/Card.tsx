'use client'
import React from 'react'
import './Card.scss'

interface CardProps {
  className?: string
  title?:String
  data: any[]
}

const Card: React.FC<CardProps> = ({data, title, className = ''}) => {
  const cardData = data
  return (
    <div className={`card-items ${className}`}>
      {cardData.map((data, index) => (
        <div key={index} className="card-item">
          <div className="tit">{data.gubun}</div>
          <div className="conts">{data.num}</div>
        </div>
       ))}
    </div>
  )
}

export default Card