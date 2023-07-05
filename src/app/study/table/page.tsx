'use client'

import styled from 'styled-components'
import { useEffect } from "react"

import Calendar from "@toast-ui/calendar"
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

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

export default function StudyTable() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  useEffect(() => {
    const calendar = new Calendar('#claendar', {
      defaultView: 'week',
      week: {
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        taskView: false
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
    })

    calendar.createEvents([
      {
        id: '1',
        calendarId: '1',
        title: '수업 1',
        category: 'time',
        dueDateClass: '',
        start: '2023-07-05T14:00:00+09:00',
        end: '2023-07-05T14:50:00+09:00',
        backgroundColor: '#ffbb3b',
      },
      {
        id: '2',
        calendarId: '1',
        title: '수업 2',
        category: 'time',
        dueDateClass: '',
        start: '2023-07-05T15:00:00+09:00',
        end: '2023-07-05T15:50:00+09:00',
        backgroundColor: '#009222',
      },
    ]);
  }, [])
  
  return (
    <CalendarContainer>
      <div className="calendar-title">
        <h1>
          {
            `${year}년 ${month}월`
          }
        </h1>
      </div>
      <div id="claendar" style={{ 'height': '100vh', 'width': '100%' }}></div>
    </CalendarContainer>
  )
}