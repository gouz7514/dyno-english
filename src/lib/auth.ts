import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import api from '@/lib/api'

import { cookies } from 'next/headers'

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID as string,
  clientSecret: process.env.KAKAO_CLIENT_SECRET as string
})

const postUsers = async (payload : any) => {
  try {
    const res = await api.post('/users', payload)

    cookies().set('token', res.data.result.token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })

    return res
  } catch (error) {
    console.error(error)
  }
}

const getUserByToken = async (token: string | undefined) => {
  try {
    const res = await api.get(`/users/token`, {
      headers: {
        token,
      }
    })
    
    return res
  } catch (error) {
    console.error(error)
  }
}

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
      }).then(async res => {
        if (res.status === 200) {

          const payload = {
            name: user?.name,
            phone: '',
            is_staff: false,
            kakao_id: user?.id
          }

          await postUsers(payload)
        }
        return res.json()
      }).catch(error => {
        console.error(error)
      })
      return userInfoRes
    },
    async session({ session }) {
      if (cookies().get('token')) {
        const accessToken = cookies().get('token')?.value
        const userInfoRes = await getUserByToken(accessToken)

        if (userInfoRes?.data.status === 200 && userInfoRes?.data.message === 'SUCCESS') {
          session.user.username = userInfoRes?.data.data.name
          session.user.user_id = userInfoRes?.data.data.id
          session.user.is_staff = userInfoRes?.data.data.is_staff
        }
      }
      return session
    }
  }
}