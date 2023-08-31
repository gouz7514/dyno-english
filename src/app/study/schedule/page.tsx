'use client'

import styled from 'styled-components'
import React, { useState, useEffect } from "react"

import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/ko'

import { db } from '@/firebase/config'
import { getDocs, collection } from 'firebase/firestore'

import { generateRecurringEvents } from '@/lib/utils/generateRecurringEvents'

import { ClassSchedules } from '@/types/types'
import CalendarHeader from '@/app/components/Calendar/Header'
import CalendarToolbar from '@/app/components/Calendar/Toolbar'

const ScheduleContainer = styled.div`
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
  const [scheduleEvents, setScheduleEvents] = useState<any[]>([])
  const [calendarView, setCalendarView] = useState<View>('week')
  const localizer = momentLocalizer(moment)

  useEffect(() => {
    const getSchedules = async () => {
      const docSnap = await getDocs(collection(db, 'class_schedule'))
      const schedules = docSnap.docs.map(doc => doc.data()) as ClassSchedules
      const convertedSchedules = schedules.map((schedule) => {
        return {
          title: schedule.title,
          start: moment(schedule.start).toDate(),
          end: moment(schedule.end).toDate(),
          bgColor: schedule.bgColor,
          repeatStart: schedule.isRepeat ? moment(schedule.repeatStart).toDate() : null,
          repeatEnd: schedule.isRepeat ? moment(schedule.repeatEnd).toDate() : null,
        }
      })
      const recurringEvents = generateRecurringEvents(convertedSchedules)
      
      setScheduleEvents(recurringEvents)
    }

    getSchedules()
  }, [])

  return (
    <ScheduleContainer>
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
        events={scheduleEvents}
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
    </ScheduleContainer>
  )
}