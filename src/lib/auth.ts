import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import axios from "axios"
import { auth as firebaseAuth, db } from "@/firebase/config"
import { signInWithCustomToken } from "firebase/auth"
import { doc, getDoc, setDoc, DocumentSnapshot } from "firebase/firestore"

import { ClassDetail, ClassHomeworks, ClassNotices, Datetime, Notice, Homework } from "@/types/types"

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

const getClassInfo = async (classId: string) => {
  const docRef = doc(db, 'class', classId)

  try {
    const classInfo: DocumentSnapshot = await getDoc(docRef)
    
    if (classInfo.exists()) {
      const classHomeworks = classInfo.data().homework ? await getDoc(classInfo.data().homework) : null
      const classNotices = classInfo.data().notice ? await getDoc(classInfo.data().notice) : null

      return {
        info: classInfo.data(),
        homeworks: classHomeworks?.data(),
        notices: classNotices?.data()
      }
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
      try {
        const res = await axios.post(`${process.env.NEXT_PRIVATE_FIREBASE_FUNCTIONS_AUTH_URL}/kakao`, {
          account: account,
        })

        const { status, data } = res
        const { firebaseToken } = data

        await signInWithCustomToken(firebaseAuth, firebaseToken)

        if (status === 200) {
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
                  id: ''
                },
                createdAt: new Date(),
                testimonialAvailable: false,
              })
            }
          }).catch((error) => {
            console.error(error)
            throw new Error('Error occured while getting user info')
          })
        }
      } catch (error) {
        console.error(error)
        throw new Error('Error occured while signing in')
      }

      return user.id === account?.providerAccountId
    },
    async session({ session, token }) {
      const userId = token.sub as string
      const userInfo = await getUserInfo(userId)

      if (userInfo) {
        session.user.name = userInfo.name
        session.user.isStaff = userInfo.staff
        session.user.userId = token.sub as string
        session.user.kids = userInfo.kids
        session.user.testimonialAvailable = userInfo.testimonialAvailable
  
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
            const { id, name, curriculum } = classInfo.info
            
            session.classInfo = {
              id,
              name,
              curriculum
            }
            
            const homeworks = classInfo.homeworks as ClassHomeworks
            const notices = classInfo.notices as ClassNotices
            
            const combinedData: (Notice | Homework)[] = [
              ...(notices ? notices.notices.map((notice) => ({ ...notice, type: 'notice' })) : []),
              ...(homeworks ? homeworks.homeworks.map((homework) => ({ ...homework, type: 'homework' })) : []),
            ]

            const classDetails: { [date: string]: ClassDetail } = {}

            combinedData.forEach((item) => {
              const { date, type, content } = item
              const dateString = new Date(date.seconds * 1000).toISOString().slice(0, 10);
            
              if (!classDetails[dateString]) {
                classDetails[dateString] = { date: dateString, homework: '', notice: '' };
              }

              if (type === 'notice') {
                classDetails[dateString].notice = content
              } else if (type === 'homework') {
                classDetails[dateString].homework = content
              }
            })

            const sortedClassDetails: { [date: string]: ClassDetail } = {}

            Object.keys(classDetails).sort().forEach((key) => {
              sortedClassDetails[key] = classDetails[key]
            })

            session.classDetails = sortedClassDetails
          }
        }
      }

      return session
    }
  }
}