'use client'

import styled from 'styled-components'
import { useEffect } from "react"

import dynamic from 'next/dynamic'

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 24px;

  .calendar-title {
    margin-bottom: 12px;
  }
`

export default function StudyCalendar() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const Calendar = dynamic(() => import('@/app/components/TuiCalendarWrapper'),
    {
      ssr: false
    }
  )
  
  return (
    <CalendarContainer>
      <div className="calendar-title">
        <h1>
          {year}년 {month}월
        </h1>
      </div>
      <Calendar />
    </CalendarContainer>
  )
}