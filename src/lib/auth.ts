import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import api from '@/lib/api'

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID as string,
  clientSecret: process.env.KAKAO_CLIENT_SECRET as string
})

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    kakaoCustomProvider
  ],
  callbacks: {
    async signIn({ user, account }) {
      const accessToken = account?.access_token
      const userInfoUrl = `https://kapi.kakao.com/v2/user/me`
      
      const userInfoRes = await fetch(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json;charset=UTF-8'
        }
      }).then(res => {
        if (res.status === 200) {

          // axios로 데이터베이스에 post 요청 보내기
          api.post('/users', {
            id: user?.id,
            name: user?.name,
            is_staff: false,
            phone: '',
            kids: {}
          }).then(res => {
            // console.log(res)
          }).catch(error => {
            console.error(error)
          })
        }
        return res.json()
      }).catch(error => {
        console.error(error)
      })
      return userInfoRes
    },
    async session({ session, token }) {
      session.user.userId = token.sub as string
      return session
    }
  }
}