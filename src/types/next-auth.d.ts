import NextAuth from "next-auth"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string,
      user_id: string,
      is_staff: boolean,
    }
  }
}