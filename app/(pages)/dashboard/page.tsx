'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PieChartComponent from '@/components/PieChart'
import BarChartComponent from '@/components/BarChart'
import SimpleRadialBarChart from '@/components/SimpleRadialBarChart'
import LineChartComponent from '@/components/LineChart'
import Table from '@/components/Table'
import '@/pages/Dashboard.scss'
import Section from '@/components/Section'
import Card from '@/components/Card'

export default function Dashboard() {
  const router = useRouter()
  const handleBackToInterpreter = () => {
    router.push('/')
  }
  const languageUsageData = {
    data: [
      { language: '러시아어', sessions: 120 },
      { language: '영어', sessions: 805 },
      { language: '중국어', sessions: 50 },
      { language: '일본어', sessions: 30 }
    ]
  }
  const botData = {
    data: [
      { gubun: '콜봇', num:10},
      { gubun: '챗봇', num:20},
      { gubun: '콜상담', num:50},
      { gubun: '채팅상담', num:20},
      { gubun: 'IVR', num:10},
      { gubun: '이메일', num:20},
      { gubun: 'QnA', num:60},
      { gubun: '게시판', num:20},
      { gubun: '고객포기', num:90},
      { gubun: '미처리', num:7}
    ]
  }

  const contsData = [
    {
      title: 'bar chart + table',
      content: (
        <div className="flex-area">
          <div className="chart-area">
            <BarChartComponent
              data={botData.data}
              palette={["#D1CAD9", "#A9BFE8", "#B58EC2", "rgba(128, 33, 171, 0.55)"]}
              argumentField={Object.keys(botData.data[0])[0]}
              valueField={Object.keys(botData.data[0])[1]}
              iconType="rect"
              barSize={15}
              showLegend={false}
            />
          </div>
          <div>
            <Table
              data={botData.data}
              caption="고객 응대 현황"
              columns={[
                { key: 'gubun', header: '구분', width:'40%'},
                { key: 'num', header: '횟수', width:'20%'},
                {
                  key: 'num',
                  header: '비율',
                  width:'40%',
                  render: (value) => {
                    const total = botData.data.reduce((sum, item) => sum + item.num, 0)
                    return `${((value / total) * 100).toFixed(2)}%`
                  }
                }
              ]}
            />
          </div>
        </div>
      )
    },
    {
      title: 'pie chart',
      content: (
        <div className="flex-area type-charts">
          <div className="chart-area">
            <PieChartComponent
              type="doughnut"
              data={languageUsageData.data}
              palette={["#D1CAD9", "#A9BFE8", "#B58EC2", "rgba(128, 33, 171, 0.55)"]}
              argumentField={Object.keys(languageUsageData.data[0])[0]}
              valueField={Object.keys(languageUsageData.data[0])[1]}
              tooltipSuffix='세션'
              iconType="line"
              centerText="최초인입"
              centerSubText="2,101"
              centerTextColor="#333"
              centerSubTextColor="#333"
              labelPosition="inside"
            />
          </div>
          <div className="chart-area">
            <PieChartComponent
              type="pie"
              data={languageUsageData.data}
              palette={["#94BBFD",  "#FFA7A1", "#62D0E6", "#FFDB67"]}
              argumentField={Object.keys(languageUsageData.data[0])[0]}
              valueField={Object.keys(languageUsageData.data[0])[1]}
              tooltipSuffix='세션'
              iconType="circle"
              labelPosition="inside"
            />
          </div>
        </div>  
      )
    },
    {
      title: 'tit 03',
      content: (
        <div className="chart-area">
          <SimpleRadialBarChart
            data={languageUsageData.data}
            palette={["#D1CAD9", "#A9BFE8", "#B58EC2", "rgba(128, 33, 171, 0.55)"]}
            argumentField={Object.keys(languageUsageData.data[0])[0]}
            valueField={Object.keys(languageUsageData.data[0])[1]}
            tooltipSuffix='세션'
            iconType="circle"
          />
        </div>
      )
    },
    {
      title: 'Line chart',
      content: (
        <div className="flex-area type-row">
          <div className="chart-area">
            <LineChartComponent
              data={languageUsageData.data}
              palette={["#94BBFD",  "#FFA7A1", "#62D0E6", "#FFDB67"]}
              argumentField={Object.keys(languageUsageData.data[0])[0]}
              valueField={Object.keys(languageUsageData.data[0])[1]}
              tooltipSuffix='세션'
              iconType="line"
              strokeWidth={3}
              showLegend={false}
            />
          </div>
          <div className="card-wrap">
            <Card
              data={botData.data}
            ></Card>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="conts-container">
      <div className={`contents ${contsData.length === 2 ? 'row-1' : contsData.length === 1 ? 'col-1' : ''}`}>
        {contsData.map((data, index) => (
          <div className="cont-box" key={index}>
            <Section title={data.title} className='full'>
              {data.content}
            </Section>
          </div>
        ))}
      </div>
    </div>
  )
}