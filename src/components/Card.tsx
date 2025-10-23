'use client'
import React from 'react'
import './Card.scss'

interface CardProps {
  className?: string
  title?:String
  data: any[],
  dataTotal?:number
}

const Card: React.FC<CardProps> = ({data, title, className = '', dataTotal}) => {
  const cardData = data
  return (
    <div className={`card-items ${className}`}>
      {cardData.map((data, index) => (
        <div key={index} className="card-item">
          <div className="tit">{data.gubun}</div>
          <div className="conts">
            {dataTotal ? ((data.num/dataTotal)*100).toFixed(2) + '%' : data.num}
          </div>
        </div>
       ))}
    </div>
  )
}

export default Card