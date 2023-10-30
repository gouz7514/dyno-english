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
  onClick?: ((e: any) => void) | ((e: any) => Promise<void>),
  children: React.ReactNode,
  width?: number,
  disabled?: boolean,
  size?: ButtonSize,
  color?: buttontheme
  className?: string,
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
    birth: string,
    classId?: string
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

export interface ClassSchedule {
  title: string
  start: string
  end: string
  bgColor: string
  isRepeat: boolean,
  isCustom: boolean,
  repeatRule?: {
    repeatDay: string
    repeatStart: string
    repeatEnd: string
  }[]
}

export interface ClassSchedules extends Array<ClassSchedule> {}

export enum Day {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
}

export enum DayKorean {
  SUN = '일',
  MON = '월',
  TUE = '화',
  WED = '수',
  THU = '목',
  FRI = '금',
  SAT = '토',
}

export interface scheduleRepeatRule {
  repeatDay: string
  repeatStart: string
  repeatEnd: string
}

export interface scheduleRepeatRules extends Array<scheduleRepeatRule> {}