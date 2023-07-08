import { forwardRef } from "react";

import Calendar from "@toast-ui/react-calendar"
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

interface TuiCalendarWrapperProps {
  defaultView: string
  week: {
    dayNames: string[];
    taskView: boolean;
  }
  month: {
    dayNames: string[];
  }
  calendars: {
    id: string;
    name: string;
    backgroundColor: string;
  }[]
}

export default function TuiCalendar(props: any) {
  return (
    <Calendar
      {...props}
      ref={props.forwardedRef}
    />
  )
}