import NextAuth from "next-auth"
import { ClassInfo, ClassDetails, Datetime } from './types'

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      userId: string,
      isStaff: boolean,
      kids: {
        [key: string]: string
      }[],
      testimonialAvailable: boolean,
    },
    classInfo: ClassInfo,
    classDetails: ClassDetails,
    simpleNotice: {
      [key: string]: string
    }[]
  }
}