'use client'

import styled from 'styled-components'
import React, { useRef, useState } from "react"

import dynamic from 'next/dynamic'

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/ko'

import { generateRecurringEvents } from '@/lib/utils/generateRecurringEvents'

import CalendarHeader from '@/app/components/Calendar/Header'
import CalendarToolbar from '@/app/components/Calendar/Toolbar'

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  align-items: center;
  margin: 0 auto;
  margin-top: 24px;

  .rbc-header {
    border-bottom: none;

    &.saturday {
      color: #0000ff;
    }

    &.sunday {
      color: #ff0000;
    }
  }

  .rbc-event-label,
  .rbc-allday-cell {
    display: none !important;
  }

  .rbc-label {
    font-size: 12px;
  }

  .rbc-events-container {
    margin-right: 0 !important;

    .rbc-event {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      background-color: beige;
      color: black;
      font-size: 12px;
      padding: 2px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      .rbc-event-content {
        height: auto;
        text-align: center;
        flex: 0 1 auto;
      }
    }
  }
`

export default function StudyCalendar() {
  const [calendarView, setCalendarView] = useState<View>('week')
  const localizer = momentLocalizer(moment)

  // TODO : get event from server and apply recurring rule
  const events = [
    {
      title: '파닉스-K (1)',
      start: moment('2023-08-03T13:00:00+09:00').toDate(),
      end: moment('2023-08-03T13:50:00+09:00').toDate(),
      bgColor: 'lightblue',
      repeatStart: moment('2023-08-03T13:00:00+09:00').toDate(),
      repeatEnd: moment('2023-08-31T13:50:00+09:00').toDate(),
    },
    {
      title: '원서리딩',
      start: moment('2023-08-01T14:00:00+09:00').toDate(),
      end: moment('2023-08-01T14:50:00+09:00').toDate(),
      bgColor: 'lightgreen',
      repeatStart: moment('2023-08-01T14:00:00+09:00').toDate(),
      repeatEnd: moment('2023-08-31T14:50:00+09:00').toDate(),
    },
  ]

  const recurringEvents = generateRecurringEvents(events)

  return (
    <CalendarContainer>
      <Calendar
        view={calendarView}
        views={['month', 'week']}
        onView={(view) => {
          setCalendarView(view)
        }}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        events={recurringEvents}
        formats={{
          timeGutterFormat: (date) => {
            return moment(date).format('H')
          }
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.bgColor,
            }
          }
        }}
        dayPropGetter={(date) => {
          if (date.getDay() === 0) {
            return {
              className: 'sunday'
            }
          } else if (date.getDay() === 6) {
            return {
              className: 'saturday'
            }
          }
          return {}
        }}
        components={{
          week: {
            header: ({ date }) => {
              return (
                <CalendarHeader date={date} />
              )
            }
          },
          toolbar: (props) => {
            const { label, onNavigate } = props
            
            return (
              <CalendarToolbar
                view={calendarView}
                label={label}
                onNavigate={onNavigate}
                setCalendarView={setCalendarView}
              />
            )
          }
        }}
      />
    </CalendarContainer>
  )
}