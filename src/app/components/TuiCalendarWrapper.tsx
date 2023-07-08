import { forwardRef } from "react";

import Calendar from "@toast-ui/react-calendar"
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

export default function TuiCalendar(props: any) {
  return (
    <Calendar
      {...props}
      ref={props.forwardedRef}
    />
  )
}