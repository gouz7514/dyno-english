import moment from 'moment'

type CalendarHeaderProps = {
  date: Date
}

export default function CalendarHeader({ date }: CalendarHeaderProps) {
  return (
    <div className="rbc-day-bg">
      <div className="rbc-header">
        <span className="rbc-label">{moment(date).format('D')}</span>
        <span className="rbc-label">{moment(date).format('ddd')}</span>
      </div>
    </div>
  )
}