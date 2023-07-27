import NextAuth from "next-auth"
import { ClassInfo } from './types'

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      userId: string,
      isStaff: boolean,
    },
    classInfo: ClassInfo,
  }
}