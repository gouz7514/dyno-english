import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

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
    async signIn({ user, account, profile }) {
      // TODO : user id를 키 값으로 firebase에 저장
      const accessToken = account?.access_token
      const propertyKeys = encodeURIComponent('["kakao_account.profile"]')
      const userInfoUrl = `https://kapi.kakao.com/v2/user/me?property_keys=${propertyKeys}`
      
      const userInfoRes = await fetch(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json;charset=UTF-8'
        }
      }).then(res => {
        if (res.status === 200) {
          // 로그인 성공시 firebase에 유저 id를 키 값으로 저장
        }
        return res.json()
      }).catch(error => {
        console.error(error)
      })
      return userInfoRes
    }
  }
}