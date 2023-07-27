import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import axios from "axios"
import { auth as firebaseAuth } from "@/firebase/config"
import { getDatabase, ref, child, get, set } from 'firebase/database'
import { signInWithCustomToken, updateProfile } from "firebase/auth"

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID as string,
  clientSecret: process.env.KAKAO_CLIENT_SECRET as string
})

// get user info from firebase
const getUserInfo = async (userId: string) => {
  const dbRef = ref(getDatabase())

  const snapshot = await get(child(dbRef, `users/${userId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null
  }
}

// get class info from firebase
const getClassInfo = async (classId: string) => {
  const dbRef = ref(getDatabase())

  const snapshot = await get(child(dbRef, `classes/${classId}`))
  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const accessToken = account?.access_token

      try {
        const res = await axios.post(`${process.env.NEXT_PRIVATE_FIREBASE_FUNCTIONS_AUTH_URL}/kakao`, {
          token: accessToken,
        })

        const { firebaseToken } = res.data

        await signInWithCustomToken(firebaseAuth, firebaseToken)
      } catch (error) {
        console.error(error)
      }

      const userInfoUrl = `https://kapi.kakao.com/v2/user/me`
      
      const userInfoRes = await fetch(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json;charset=UTF-8'
        }
      }).then(res => {
        if (res.status === 200) {
          // 로그인 성공시 firebase에 유저 id를 키 값으로 저장
          const dbRef = ref(getDatabase())
          const db = getDatabase()

          const currentUser = firebaseAuth.currentUser
          
          if (currentUser) {
            updateProfile(currentUser, {
              displayName: user?.name,
            })
          }

          get(child(dbRef, `users/${user?.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
              // console.log('exists')
            } else {
              set(ref(db, `users/${user?.id}`), {
                id: user?.id,
                name: user?.name,
                image: user?.image,
                staff: false,
                phone: '',
                kid: {
                  name: '',
                  birth: ''
                }
              })
            }
          }).catch((error) => {
            console.error(error)
          })
        }
        return res.json()
      }).catch(error => {
        console.error(error)
      })
      return userInfoRes
    },
    async session({ session, token, user }) {
      const userId = token.sub as string
      const userInfo = await getUserInfo(userId)

      session.user.name = userInfo.name
      session.user.isStaff = userInfo.staff
      session.user.userId = token.sub as string

      const classId = userInfo.class.id
      const classInfo = await getClassInfo(classId)
      
      session.classInfo = {
        id: classInfo.id,
        name: classInfo.name,
        curriculum: classInfo.curriculum
      }

      return session
    }
  }
}