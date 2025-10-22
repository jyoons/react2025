'use client'

import React from 'react'
import './Table.scss'

interface TableColumn {
  key: string
  header: string
  width?: string | number
  render?: (value: any, row: any, index: number) => React.ReactNode
}

interface TableProps {
  data: any[]
  columns: TableColumn[]
  caption?: string
  className?: string
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  caption,
  className = ''
}) => {
  return (
    <div className={`table-wrap ${className}`}>
      <table>
        {caption && <caption>{caption}</caption>}
        <colgroup>
          {columns.map((column, index) => (
            <col key={index} style={{ width: column.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table