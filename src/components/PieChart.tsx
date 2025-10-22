'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'

interface PieChartComponentProps {
  data: any[]
  type?: 'doughnut' | 'pie'
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
  labelPosition?: 'inside' | 'outside'
  showLabel?: boolean
  centerText?: string
  centerSubText?: string
  centerTextColor?: string
  centerSubTextColor?: string
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  type = 'doughnut',
  palette = DEFAULT_COLORS,
  argumentField = 'name',
  valueField = 'value',
  tooltipSuffix = '',
  legendTextColor = '#333',
  labelColor = '#333',
  iconType = 'circle',
  showLegend = true,
  legendLayout = 'horizontal',
  legendVerticalAlign = 'bottom',
  legendAlign = 'center',
  labelPosition = 'outside',
  showLabel = true,
  centerText,
  centerSubText,
  centerTextColor = '#333',
  centerSubTextColor = '#666'
}) => {
  // recharts 형식으로 데이터 변환
  const chartData = data.map(item => ({
    name: item[argumentField],
    value: item[valueField]
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor:'white', padding: '10px', border: '1px solid #ccc', fontSize:'12px'}}>
          <p>{`${payload[0].name}: ${payload[0].value} ${tooltipSuffix}`}</p>
        </div>
      )
    }
    return null
  }

  const renderOutsideLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, name, percent } = props
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 20
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={labelColor}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{fontSize:'12px'}}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderInsideLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // 중간 위치
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{fontSize:'12px', fontWeight: 'bold'}}
      >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    )
  }

  const pieCx = "50%"
  const pieCy = "50%"

  // 도넛 차트 중앙 텍스트 렌더링 함수
  const renderCenterLabel = (props: any) => {
    // viewBox에서 중심점 계산
    const { x, y, width, height } = props.viewBox || {}
    const cx = x + width / 2
    const cy = y + height / 2

    return (
      <g>
        {centerText && (
          <text
            x={cx}
            y={cy}
            dy={centerSubText ? '-0.6em' : '0'}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '14px', fill: centerTextColor }}
          >
            {centerText}
          </text>
        )}
        {centerSubText && (
          <text
            x={cx}
            y={cy}
            dy={centerText ? '0.6em' : '0'}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '26px', fontWeight: 'bold', fill: centerSubTextColor }}
          >
            {centerSubText}
          </text>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx={pieCx}
          cy={pieCy}
          labelLine={labelPosition === 'outside'}
          label={showLabel ? (labelPosition === 'outside' ? renderOutsideLabel : renderInsideLabel) : false}
          outerRadius="80%"
          innerRadius={type === 'doughnut' ? "50%" : 0}
          fill="#8884d8"
          dataKey="value"
          stroke="none"
        >
          {type === 'doughnut' && (centerText || centerSubText) && (
            <Label content={renderCenterLabel} position="center" />
          )}
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend
            layout={legendLayout}
            verticalAlign={legendVerticalAlign}
            align={legendAlign}
            wrapperStyle={{color:legendTextColor}}
            iconType={iconType}
            formatter={(value) => <span style={{ color:legendTextColor, fontSize:'13px'}}>{value}</span>}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent