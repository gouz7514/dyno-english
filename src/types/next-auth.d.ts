import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      userId: string,
      isStaff: boolean,
    },
    classInfo: {
      id: number,
      name: string,
      curriculum: object
    },
  }
}