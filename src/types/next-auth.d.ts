import NextAuth from "next-auth"
import { ClassInfo, ClassDetails } from './types'

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      userId: string,
      isStaff: boolean,
    },
    classInfo: ClassInfo,
    classDetails: ClassDetails,
  }
}