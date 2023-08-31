import moment from 'moment'

interface Event {
  title: string
  start: Date
  end: Date
  bgColor: string
  repeatStart?: Date | null
  repeatEnd?: Date | null
}

export function generateRecurringEvents(events: Event[]): Event[] {
  const recurringEvents: Event[] = []
  
  events.forEach(event => {
    if (event.repeatStart && event.repeatEnd) {
      const originalStart = moment(event.start)
      const originalEnd = moment(event.end)

      let currentStart = moment(event.repeatStart)
      const repeatEnd = moment(event.repeatEnd)

      while (currentStart.isSameOrBefore(repeatEnd)) {
        const repeatedStart = currentStart
          .hour(originalStart.hour())
          .minute(originalStart.minute())
          .toDate()
        const repeatedEnd = currentStart
          .hour(originalEnd.hour())
          .minute(originalEnd.minute())
          .toDate()

        recurringEvents.push({
          title: event.title,
          start: repeatedStart,
          end: repeatedEnd,
          bgColor: event.bgColor,
        })

        currentStart = currentStart.add(1, 'weeks')
      }
    } else {
      recurringEvents.push(event)
    }
  })

  return recurringEvents
}