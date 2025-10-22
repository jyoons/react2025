'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Rectangle } from 'recharts'

interface BarChartComponentProps {
  data: any[]
  palette?: string[]
  argumentField?: string
  valueField?: string
  tooltipSuffix?: string
  legendTextColor?: string
  labelColor?: string
  iconType?: 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye'
  barSize?: number
  showLegend?: boolean
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  palette = DEFAULT_COLORS,
  argumentField = 'name',
  valueField = 'value',
  tooltipSuffix = '',
  legendTextColor = '#333',
  labelColor = '#333',
  iconType = 'rect',
  barSize = 40,
  showLegend = true
}) => {
  // recharts 형식으로 데이터 변환
  const chartData = data.map(item => ({
    name: item[argumentField],
    value: item[valueField]
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', fontSize: '12px'}}>
          <p>{`${payload[0].payload.name}: ${payload[0].value} ${tooltipSuffix}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{top: 20, right:0, left: -20, bottom:0}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: labelColor, fontSize: 12}}
          padding={{ left: 0, right: 0 }}
        />
        <YAxis
          tick={{ fill: labelColor, fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            wrapperStyle={{ color: legendTextColor }}
            iconType={iconType}
            formatter={(value) => <span style={{ color: legendTextColor, fontSize:'12px'}}>{value}</span>}
          />
        )}
        <Bar dataKey="value" fill="#8884d8" barSize={barSize} shape={<Rectangle radius={9999} />}>
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
