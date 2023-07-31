export interface CalendarProps{
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

export interface SkeletonProps {
  width?: number,
  height?: number,
  marginbottom?: number
}

export interface TestimonialProps {
  by: string,
  content: string,
  id: string
}

type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  onClick: (() => void) | ((e: any) => Promise<void>),
  children: React.ReactNode,
  width?: number,
  disabled?: boolean,
  size?: ButtonSize,
}

export interface LinkButtonProps {
  href: string,
  children: React.ReactNode,
  width?: number,
}

export interface UserProps {
  name: string,
  phone: string,
  kid: {
    name: string,
    birth: string
  }
}

export interface Datetime {
  seconds: number
  nanoseconds: number
}

export interface Notice {
  date: Datetime
  type: string
  content: string
}

export interface Homework {
  date: Datetime
  type: string
  content: string
}

export interface Week {
  id: string
  content: string
}

export interface Month {
  id: string
  weeks: {
    week: Week[]
  }
}

export interface Curriculum {
  months: {
    month: Month[]
  }
}

export interface ClassInfo {
  id: string | null
  name: string | null
  curriculum: Curriculum | null
}

export interface ClassItem {
  content: string;
  date: {
    seconds: number;
    nanoseconds: number;
  }
}

export interface ClassHomeworks {
  homeworks: Array<ClassItem>
}

export interface ClassNotices {
  notices: Array<ClassItem>
}

export interface ClassDetail {
  date: string
  homework: string
  notice: string
}

export interface ClassDetails {
  [date: string]: ClassDetail
}