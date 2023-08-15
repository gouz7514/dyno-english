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
  id: string,
  createdAt: Date
}

type ButtonSize = 'small' | 'medium' | 'large'
type buttontheme = 'primary' | 'secondary' | 'danger' | 'default'

export interface ButtonProps {
  onClick: ((e: any) => void) | ((e: any) => Promise<void>),
  children: React.ReactNode,
  width?: number,
  disabled?: boolean,
  size?: ButtonSize,
  color?: buttontheme
}

export interface LinkButtonProps {
  href: string,
  children: React.ReactNode,
  width?: number,
}

export interface UserProps {
  phone: string,
  kids: {
    name: string,
    birth: string
  }[] | [],
}

export interface Notice {
  date: string
  type: string
  content: string
}

export interface Homework {
  date: string
  type: string
  content: string
}

export interface Week {
  content: string
}

export interface Month {
  days: {
    content: string
  }[]
}

export interface Curriculum {
  name: string,
  curriculum: {
    curriculum: {
      months: Month[]
    }
  }
}

export interface ClassInfo {
  id: string | null
  name: string | null
  curriculum: Curriculum | null
}

export interface ClassItem {
  content: string;
  date: string
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