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
    simpleNotice: {
      [key: string]: string
    }[],
    classInfo: {
      id: string,
      name: string,
      curriculum: {
        name: string,
        curriculum: object[]
      },
      details: {
        [key: string]: ClassDetails
      }
    }[]
  }
}