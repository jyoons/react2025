'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface LineChartComponentProps {
  data: any[]
  palette?: string[]
  argumentField?: string
  valueField?: string
  tooltipSuffix?: string
  legendTextColor?: string
  labelColor?: string
  iconType?: 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye'
  showLegend?: boolean
  legendLayout?: 'horizontal' | 'vertical'
  legendVerticalAlign?: 'top' | 'middle' | 'bottom'
  legendAlign?: 'left' | 'center' | 'right'
  strokeWidth?: number
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  palette = DEFAULT_COLORS,
  argumentField = 'name',
  valueField = 'value',
  tooltipSuffix = '',
  legendTextColor = '#333',
  labelColor = '#333',
  iconType = 'line',
  showLegend = true,
  legendLayout = 'horizontal',
  legendVerticalAlign = 'bottom',
  legendAlign = 'center',
  strokeWidth = 2
}) => {
  // recharts 형식으로 데이터 변환
  const chartData = data.map(item => ({
    name: item[argumentField],
    value: item[valueField]
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', fontSize: '12px' }}>
          <p>{`${payload[0].payload.name}: ${payload[0].value} ${tooltipSuffix}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{top: 20, right:0, left: -20, bottom:0}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: labelColor, fontSize: 12 }}
        />
        <YAxis
          tick={{ fill: labelColor, fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
            wrapperStyle={{ color: legendTextColor }}
            iconType={iconType}
            formatter={(value) => <span style={{ color: legendTextColor, fontSize: '13px' }}>{value}</span>}
          />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={palette[0]}
          strokeWidth={strokeWidth}
          dot={{ fill: palette[0] }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartComponent
