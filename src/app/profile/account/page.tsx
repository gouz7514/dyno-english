'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'

import Button from '@/app/components/Atom/Button/Button'
import ImageButton from '@/app/components/Atom/Button/ImageButton'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import Skeleton from '@/app/components/Skeleton'

import { UserProps } from '@/types/types'

import { db } from "@/firebase/config"
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const ProfileStyle = styled.div`
  background-color: #eee;
  padding: 60px 24px 24px;

  .profile-title {
    margin-bottom: 24px;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .profile-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &.kid,
      &.birth {
        margin-bottom: 18px;
      }

      .profile-item-kid-controller {
        align-items: center;
        gap: 8px;
        height: 30px;
      }

      .profile-item-title {
        font-weight: bold;
        font-size: 1.1em;
      }

      .profile-image-container {
        width: 200px;
        height: 200px;
  
        img {
          border-radius: 12px;
          object-fit: cover;
        }
      }

      .input-error {
        color: red;
        font-size: 12px;
        height: 12px;
      }
    }
  }
`

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const initialUser = {
    phone: '',
    kids: [
      {
        name: '',
        birth: '',
        classId: ''
      }
    ]
  }

  const [user, setUser] = useState<UserProps>(initialUser)
  const [errors, setErrors] = useState<UserProps>(initialUser)
  const [touched, setTouched] = useState({
    phone: false,
    kids: [
      {
        name: false,
        birth: false
      }
    ]
  })

  const validate = useCallback(() => {
    const errors = initialUser

    errors.kids = user.kids.map((kid, idx) => {
      return {
        name: '',
        birth: '',
        classId: ''
      }
    })

    if (!user.phone) {
      errors.phone = '번호를 입력해주세요.'
    }

    if (user.kids.length > 0) {
      user.kids.forEach((kid, idx) => {
        if (!kid.name) {
          errors.kids[idx].name = '필수 입력사항입니다.'
        }

        if (!kid.birth) {
          errors.kids[idx].birth = '필수 입력사항입니다.'
        }
      })
    }

    setErrors(errors)
    return errors
  }, [user])

  const handleBlur = (e: any) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    })
  }

  const handleBlurKidName = (idx: number) => {
    setTouched({
      ...touched,
      kids: touched.kids.map((kid, kidIdx) => {
        if (kidIdx === idx) {
          return {
            ...kid,
            name: true
          }
        }

        return kid
      })
    })
  }

  const handleBlurKidBirth = (idx: number) => {
    setTouched({
      ...touched,
      kids: touched.kids.map((kid, kidIdx) => {
        if (kidIdx === idx) {
          return {
            ...kid,
            birth: true
          }
        }

        return kid
      })
    })
  }

  useEffect(() => {
    validate()
  }, [validate])

  const getUserInfo = useCallback(async (id: string) => {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userInfo = docSnap.data()
      setUser({
        phone: userInfo.phone,
        kids: userInfo.kids.length ? userInfo.kids : [{ name: '', birth: '', classId: '' }]
      })

      setErrors({
        phone: '',
        kids: userInfo.kids.length ? userInfo.kids : [{ name: '', birth: '' }]
      })

      setTouched({
        phone: false,
        kids: userInfo.kids.length ? userInfo.kids.map(() => ({ name: false, birth: false })) : [{ name: false, birth: false }]
      })
    } else {
      alert('로그인 후 이용해주세요!')
      router.push('/login')

      return
    }
  }, [router])

  useEffect(() => {
    if (status !== 'loading') {
      const userId = session?.user?.userId
      setPageLoading(false)

      if (!userId) {
        alert('로그인 후 이용해주세요!')
        router.push('/login')
        return
      } else {
        getUserInfo(userId)
        return
      }
    }
  }, [session, router, status, getUserInfo])

  const handleChangePhone = (e: any) => {
    const autoHyphenValue = e.target.value.replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,6})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");

    setUser({
      ...user,
      phone: autoHyphenValue
    })
  }

  const addKid = () => {
    setUser({
      ...user,
      kids: [...user.kids, { name: '', birth: '', classId: '' }]
    })

    setErrors({
      ...errors,
      kids: [...errors.kids, { name: '', birth: '' }]
    })

    setTouched({
      ...touched,
      kids: [...touched.kids, { name: false, birth: false }]
    })
  }

  const removeKid = (idx: number, e: any) => {
    e.preventDefault()
    setUser({
      ...user,
      kids: user.kids.filter((kid, kidIdx) => kidIdx !== idx)
    })

    setErrors({
      ...errors,
      kids: errors.kids.filter((kid, kidIdx) => kidIdx !== idx)
    })

    setTouched({
      ...touched,
      kids: touched.kids.filter((kid, kidIdx) => kidIdx !== idx)
    })
  }

  const handleChangeKidName = (e: any, idx: number) => {
    setUser({
      ...user,
      kids: user.kids.map((kid, kidIdx) => {
        if (kidIdx === idx) {
          return {
            ...kid,
            name: e.target.value
          }
        }

        return kid
      }
    )})
  }

  const handleChangeKidBirth = (e: any, idx: number) => {
    setUser({
      ...user,
      kids: user.kids.map((kid, kidIdx) => {
        if (kidIdx === idx) {
          return {
            ...kid,
            birth: e.target.value
          }
        }

        return kid
      }
    )})
  }

  const onSubmitProfile = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const userId = session?.user.userId as string

    try {
      await updateDoc(doc(db, 'users', userId), {
        phone: user.phone,
        kids: user.kids
      })

      const sessionUser = session?.user
      if (!sessionUser) return
      sessionUser.kids = user.kids

      setIsSubmitting(false)
      alert('수정이 완료되었습니다.')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProfileStyle className='container'>
      <div className="profile-title">
        <h1>
          회원 정보
        </h1>
      </div>
      {
        pageLoading ? (
          <Skeleton />
        ) : (
          <div className='profile-container'>
            <div className='profile-item name'>
              <div className='profile-item-title'>이름</div>
              <DynoInput
                type="text"
                name="name"
                id="name"
                placeholder="이름을 입력해주세요"
                value={session?.user.name || ''}
                disabled
              />
            </div>
            <div className="profile-item phone">
              <div className='profile-item-title'>보호자 연락처</div>
              <DynoInput
                type="text"
                name="phone"
                id="phone"
                placeholder="010-1234-5678"
                value={user.phone || ''}
                onChange={handleChangePhone}
                onBlur={handleBlur}
              />
              <div className="input-error">
                {
                  touched.phone && errors.phone && <span>{ errors.phone }</span>
                }
              </div>
            </div>
            <div className="kid-btn-container">
              <Button
                size="small"
                onClick={addKid}
              >
                학생 추가하기
              </Button>
            </div>
            {
              user.kids.map((kid, idx) => (
                <div key={idx}>
                  <div className="profile-item kid">
                    <div className='profile-item-kid-controller d-flex'>
                      <div className='profile-item-title'>학생 이름</div>
                      {
                        user.kids.length > 1 && (
                          <ImageButton
                            onClick={(e) => removeKid(idx, e)}
                            role='delete'
                          />
                        )
                      }
                    </div>
                    <DynoInput
                      type="text"
                      id={`kidName-${idx}`}
                      placeholder="학생 이름을 입력해주세요"
                      value={kid.name || ''}
                      onChange={(e) => handleChangeKidName(e, idx)}
                      onBlur={() => handleBlurKidName(idx)}
                    />
                    <div className="input-error">
                      {
                        touched.kids[idx].name && errors.kids[idx].name && <span>{ errors.kids[idx].name }</span>
                      }
                    </div>
                  </div>
                  <div className="profile-item birth">
                    <div className='profile-item-title'>학생 생년월일</div>
                    <DynoInput
                      type="date"
                      id={`kidBirth-${idx}`}
                      name="birth"
                      value={kid.birth || ''}
                      onChange={(e) => handleChangeKidBirth(e, idx)}
                      onBlur={() => handleBlurKidBirth(idx)}
                    />
                    <div className="input-error">
                      {
                        touched.kids[idx].birth && errors.kids[idx].birth && <span>{ errors.kids[idx].birth }</span>
                      }
                    </div>
                  </div>
                </div>
              ))
            }
            <Button
              onClick={onSubmitProfile}
              disabled={errors.phone !== '' || errors.kids.some(kid => kid.name !== '' || kid.birth !== '')}
            >
              { isSubmitting ? '수정중...' : '수정하기' }
            </Button>
          </div>
        )
      }
    </ProfileStyle>
  )
}