import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"

import axios from "axios"
import { auth as firebaseAuth, db } from "@/firebase/config"
import { signInWithCustomToken } from "firebase/auth"
import { doc, getDoc, getDocs, collection, setDoc, DocumentSnapshot } from "firebase/firestore"

import { ClassDetail, ClassHomeworks, ClassNotices, Notice, Homework } from "@/types/types"

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
      const classCurriculums = classInfo.data().curriculum ? await getDoc(classInfo.data().curriculum) : null

      return {
        info: classInfo.data(),
        homeworks: classHomeworks?.data(),
        notices: classNotices?.data(),
        curriculums: classCurriculums?.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

const getSimpleNotice = async () => {
  const simpleNoticeSnap = await getDocs(collection(db, 'notice_simple'))

  const simpleNotice = simpleNoticeSnap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  return simpleNotice
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
                kids: [],
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
      const simpleNotice = await getSimpleNotice()
      session.simpleNotice = simpleNotice

      if (userInfo) {
        const { name, staff, kids, testimonialAvailable } = userInfo
        session.user.name = name
        session.user.isStaff = staff
        session.user.userId = token.sub as string
        session.user.kids = kids
        session.user.testimonialAvailable = testimonialAvailable

        const classIds = kids.map((kid: any) => kid.classId)

        const classInfo = await Promise.all(classIds.map(async (classId: string) => {
          if (!classId) {
            return
          }
          const classInfo = await getClassInfo(classId)
          const newClassInfo = {
            id: '',
            name: '',
            curriculum: [],
            details: {}
          }

          if (classInfo) {
            const { name } = classInfo.info
            const curriculums = classInfo.curriculums as any

            const homeworks = classInfo.homeworks as ClassHomeworks
            const notices = classInfo.notices as ClassNotices
            
            const combinedData: (Notice | Homework)[] = [
              ...(notices ? notices.notices.map((notice) => ({ ...notice, type: 'notice' })) : []),
              ...(homeworks ? homeworks.homeworks.map((homework) => ({ ...homework, type: 'homework' })) : []),
            ]

            const classDetails: { [date: string]: ClassDetail } = {}

            combinedData.forEach((item) => {
              const { date, type, content } = item
            
              if (!classDetails[date]) {
                classDetails[date] = { date: date, homework: '', notice: '' };
              }

              if (type === 'notice') {
                classDetails[date].notice = content
              } else if (type === 'homework') {
                classDetails[date].homework = content
              }
            })

            const sortedClassDetails: { [date: string]: ClassDetail } = {}

            Object.keys(classDetails).sort().forEach((key) => {
              sortedClassDetails[key] = classDetails[key]
            })

            newClassInfo['id'] = classId
            newClassInfo['name'] = name
            newClassInfo['curriculum'] = curriculums
            newClassInfo['details'] = sortedClassDetails
          }

          return newClassInfo
        }))

        session.classInfo = classInfo.filter((item) => item !== undefined)
      }

      return session
    }
  }
}