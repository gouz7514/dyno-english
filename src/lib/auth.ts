import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import axios from "axios"
import { auth as firebaseAuth, db } from "@/firebase/config"
import { getDatabase, ref, child, get } from 'firebase/database'
import { signInWithCustomToken } from "firebase/auth"
import { doc, getDoc, setDoc, DocumentSnapshot } from "firebase/firestore"

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID as string,
  clientSecret: process.env.KAKAO_CLIENT_SECRET as string
})

// get user info from firestore
const getUserInfo = async (userId: string) => {
  const docRef = doc(db, 'users', userId)

  try {
    const snapshot: DocumentSnapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data()
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// get class info from firestore
const getClassInfo = async (classId: string) => {
  const docRef = doc(db, 'classes', classId)

  try {
    const snapshot: DocumentSnapshot = await getDoc(docRef)
    
    if (snapshot.exists()) {
      return snapshot.data()
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
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
          const docRef = doc(db, 'users', user?.id)
          getDoc(docRef).then(async (snapshot) => {
            if (snapshot.exists()) {
              // console.log('exists')
            } else {
              await setDoc(doc(db, 'users', user?.id), {
                id: user?.id,
                name: user?.name,
                image: user?.image,
                staff: false,
                phone: '',
                kid: {
                  name: '',
                  birth: ''
                },
                class: {
                  id: null
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
    async session({ session, token }) {
      const userId = token.sub as string
      const userInfo = await getUserInfo(userId)

      if (userInfo) {
        session.user.name = userInfo.name
        session.user.isStaff = userInfo.staff
        session.user.userId = token.sub as string
  
        const classId = userInfo.class.id
        
        if (!classId) {
          session.classInfo = {
            id: null,
            name: null,
            curriculum: null
          }
        } else {
          const classInfo = await getClassInfo(classId)
  
          if (classInfo) {
            session.classInfo = {
              id: classInfo.id,
              name: classInfo.name,
              curriculum: classInfo.curriculum
            }
          }
        }
      }

      return session
    }
  }
}