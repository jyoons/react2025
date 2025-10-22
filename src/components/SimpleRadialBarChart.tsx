'use client'

import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts'

interface SimpleRadialBarChartProps {
  data: any[]
  palette?: string[]
  argumentField?: string
  valueField?: string
  tooltipSuffix?: string
  legendTextColor?: string
  iconType?: 'line' | 'plainline' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye'
  showLegend?: boolean
  innerRadius?: string | number
  outerRadius?: string | number
  legendLayout?: 'horizontal' | 'vertical'
  legendVerticalAlign?: 'top' | 'middle' | 'bottom'
  legendAlign?: 'left' | 'center' | 'right'
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const SimpleRadialBarChart: React.FC<SimpleRadialBarChartProps> = ({
  data,
  palette = DEFAULT_COLORS,
  argumentField = 'name',
  valueField = 'value',
  tooltipSuffix = '',
  legendTextColor = '#333',
  iconType = 'circle',
  showLegend = true,
  innerRadius = '10%',
  outerRadius = '80%',
  legendLayout = 'vertical',
  legendVerticalAlign = 'middle',
  legendAlign = 'right'
}) => {
  // recharts 형식으로 데이터 변환
  const chartData = data.map((item, index) => ({
    name: item[argumentField],
    value: item[valueField],
    fill: palette[index % palette.length]
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
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        barSize={10}
        data={chartData}
      >
        <RadialBar
          background
          dataKey="value"
        />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            iconSize={10}
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
            wrapperStyle={{ color: legendTextColor }}
            iconType={iconType}
            formatter={(value) => <span style={{ color: legendTextColor, fontSize: '13px' }}>{value}</span>}
          />
        )}
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default SimpleRadialBarChart
