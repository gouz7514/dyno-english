'use client'

import styled from 'styled-components'
import React, { useRef } from "react"

import dynamic from 'next/dynamic'

import { CalendarProps } from '@/types/types'

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

const TuiCalendar = dynamic(() => import('@/app/components/TuiCalendarWrapper'),
  {
    ssr: false
  }
)

const CalendarRef = React.forwardRef((props, ref) => {
  return <TuiCalendar {...props} forwardedRef={ref} />
})
CalendarRef.displayName = 'CalendarRef'

export default function StudyCalendar() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const cal = useRef(null)

  const calendarProps: CalendarProps = {
    view: 'week',
    week: {
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      taskView: false,
    },
    month: {
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    },
    calendars: [
      {
        id: 'cal1',
        name: 'Personal',
        backgroundColor: '#03bd9e',
      },
      {
        id: 'cal2',
        name: 'Work',
        backgroundColor: '#00a9ff',
      },
    ],
    events: []
  }

  const calendarEvents = [
    {
      id: '1',
      calendarId: '1',
      title: '수업 1',
      category: 'time',
      dueDateClass: '',
      start: '2023-07-05T14:00:00+09:00',
      end: '2023-07-05T14:50:00+09:00',
      backgroundColor: '#ffbb3b',
    }
  ]

  calendarProps.events = calendarEvents

  return (
    <CalendarContainer>
      <div className="calendar-title">
        <h1>
          {year}년 {month}월
        </h1>
      </div>
      <CalendarRef ref={cal} {...calendarProps} />
    </CalendarContainer>
  )
}