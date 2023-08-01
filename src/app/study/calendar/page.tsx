'use client'

import styled from 'styled-components'
import React, { useRef, useState } from "react"

import dynamic from 'next/dynamic'

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/ko'

const CalendarContainer = styled.div`
  // width: 100%;
  // max-width: 1024px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // margin: 0 auto;
  // margin-top: 24px;

  // .toastui-calendar-allday {
  //   display: none !important;
  // }

  // .toastui-calendar-day-name__date {
  //   font-size: 16px !important;
  // }

  // .toastui-calendar-day-name-container {
  //   margin-left: 48px !important;
  // }

  // .toastui-calendar-timegrid-time-column {
  //   width: 48px !important;
  // }

  // .toastui-calendar-columns {
  //   left: 48px !important;
  // }

  .rbc-header {
    border-bottom: none;
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
  const [calendarView, setCalendarView] = useState<View>('week')
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  const events = [
    {
      title: '파닉스-K (1)',
      start: moment('2023-08-03T13:00:00+09:00').toDate(),
      end: moment('2023-08-03T13:50:00+09:00').toDate(),
      bgColor: 'lightblue'
    },
    {
      title: '원서리딩',
      start: moment('2023-08-03T14:00:00+09:00').toDate(),
      end: moment('2023-08-03T14:50:00+09:00').toDate(),
      bgColor: 'lightgreen'
    },
  ]

  const localizer = momentLocalizer(moment)

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
        events={events}
        formats={{
          timeGutterFormat: (date) => {
            return moment(date).format('H')
          }
        }}
        eventPropGetter={(event) => {
          let newStyle = {
            backgroundColor: event.bgColor,
          }

          return {
            style: newStyle
          }
        }}
        dayPropGetter={(date) => {
          if (date.getDay() === 0) {
            return {
              className: 'sunday'
            }
          }
          return {}
        }}
        components={{
          week: {
            header: ({ date }) => {
              return (
                <div className="rbc-day-bg">
                  <div className="rbc-header">
                    <span className="rbc-label">{moment(date).format('D')}</span>
                    <span className="rbc-label">{moment(date).format('ddd')}</span>
                  </div>
                </div>
              )
            }
          }
        }}
      />
    </CalendarContainer>
  )
}