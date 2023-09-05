import moment from 'moment'

import { Day } from '@/types/types'

interface Event {
  title: string
  start: Date
  end: Date
  bgColor: string
  isRepeat?: boolean
  repeatDay?: string
  repeatStart?: string
  repeatEnd?: string
}

// 반복일 기준으로 반복 시작일을 찾는 함수
function findNextMatchingDay(eventStart: string, repeatDay: Day) {
  const startDate = new Date(eventStart)
  const startDay = startDate.getDay()

  if (startDay === repeatDay) {
    startDate.setDate(startDate.getDate())
  } else {
    const daysUntilRepeatDay = (repeatDay - startDay + 7) % 7
    startDate.setDate(startDate.getDate() + daysUntilRepeatDay)
  }

  if (startDate <= new Date(eventStart)) {
    startDate.setDate(startDate.getDate() + 7)
  }

  startDate.setHours(0, 0, 0, 0)

  return startDate
}

export function generateRecurringEvents(events: Event[]): Event[] {
  const recurringEvents: Event[] = []
  
  events.forEach(event => {
    if (event.isRepeat && event.repeatStart && event.repeatEnd) {
      let repeatStartDay = moment(findNextMatchingDay(
        event.repeatStart.toString(),
        Day[event.repeatDay as keyof typeof Day]
      ))

      const originalStart = moment(event.start)
      const originalEnd = moment(event.end)

      const repeatEnd = moment(event.repeatEnd)

      while (repeatStartDay.isSameOrBefore(repeatEnd)) {
        const repeatedStart = repeatStartDay
          .hour(originalStart.hour())
          .minute(originalStart.minute())
          .toDate()
        const repeatedEnd = repeatStartDay
          .hour(originalEnd.hour())
          .minute(originalEnd.minute())
          .toDate()

        recurringEvents.push({
          title: event.title,
          start: repeatedStart,
          end: repeatedEnd,
          bgColor: event.bgColor,
        })

        repeatStartDay = repeatStartDay.add(1, 'weeks')
      }
    } else {
      recurringEvents.push(event)
    }
  })

  return recurringEvents
}