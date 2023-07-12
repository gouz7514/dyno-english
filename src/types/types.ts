export type CalendarProps = {
  view: string,
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
  }[],
  events: {
    id: string,
    calendarId: string,
    title: string,
    category: string,
    dueDateClass: string,
    start: string,
    end: string,
    backgroundColor: string,
  }[]
}

export type SkeletonProps = {
  width?: number,
  height?: number,
  marginbottom?: number
}

export type TestimonialProps = {
  by: string,
  content: string
}