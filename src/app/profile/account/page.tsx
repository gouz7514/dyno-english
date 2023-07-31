'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'

import Button from '@/app/components/Button'

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
    gap: 24px;

    .profile-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

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

      input{
        height: 40px;
        border-radius: 8px;
        padding-left: 8px;
        outline: none;
        border: 0;

        &:focus {
          border: 1px solid var(--second-green);
        }
      }

      .input-error {
        color: red;
        font-size: 12px;
        height: 12px;
      }

      input[type="date"] {
        position: relative;
        height: 40px;
        border-radius: 8px;
        padding: 0 8px;
        outline: none;
        border: 0;

        &::-webkit-calendar-picker-indicator {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          color: transparent;
          cursor: pointer;
        }

        &::before {
          content: '생년월일';
          color: #aaa;
        }

        &:focus::before,
        &:valid::before {
          display: none;
        }
      }
    }
  }
`

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const router = useRouter()
  const [users, setUsers] = useState<UserProps>({
    name: '',
    phone: '',
    kid: {
      name: '',
      birth: ''
    }
  })

  const [errors, setErrors] = useState({
    phone: '',
    kidName: '',
    kidBirth: ''
  })

  const [touched, setTouched] = useState({
    phone: false,
    kidName: '',
    kidBirth: ''
  })

  const validate = useCallback(() => {
    const errors = {
      phone: '',
      kidName: '',
      kidBirth: ''
    }

    if (!users.phone) {
      errors.phone = '필수 입력사항입니다.'
    }

    if (!users.kid.name) {
      errors.kidName = '필수 입력사항입니다.'
    }

    if (!users.kid.birth) {
      errors.kidBirth = '필수 입력사항입니다.'
    }

    setErrors(errors)
    return errors
  }, [users])

  const handleBlur = (e: any) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    })

    console.log(errors)
  }

  useEffect(() => {
    validate()
  }, [validate])

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const getUserInfo = useCallback(async (id: string) => {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userInfo = docSnap.data()
      setUsers({
        name: userInfo.name,
        phone: userInfo.phone,
        kid: userInfo.kid
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
    setUsers({
      ...users,
      phone: e.target.value
    })
  }

  const handleChangeKidInfo = (key: any, value: any) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      kid: {
        ...prevUsers.kid,
        [key]: value
      }
    }))
  }

  const onSubmitProfile = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const userId = session?.user.userId as string

    try {
      await updateDoc(doc(db, 'users', userId), {
        name: users.name,
        phone: users.phone,
        kid: {
          name: users.kid.name,
          birth: new Date(users.kid.birth).toISOString().slice(0, 10)
        }
      })

      const sessionUser = session?.user
      if (!sessionUser) return
      sessionUser.kidName = users.kid.name

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
          <div>로딩중...</div>
        ) : (
          <div className='profile-container'>
            <div className='profile-item name'>
              <div className='profile-item-title'>이름</div>
              <div>{users.name}</div>
            </div>
            <div className="profile-item phone">
              <div className='profile-item-title'>보호자 연락처</div>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="010-1234-5678"
                value={users.phone || ''}
                onChange={handleChangePhone}
                onBlur={handleBlur}
              />
              <div className="input-error">
                {
                  touched.phone && errors.phone && <span>{ errors.phone }</span>
                }
              </div>
            </div>
            <div className="profile-item kid">
              <div className='profile-item-title'>학생 이름</div>
              <input
                type="text"
                name="kidName"
                id="kid"
                placeholder="학생 이름을 입력해주세요"
                value={users.kid.name || ''}
                onChange={(e) => handleChangeKidInfo('name', e.target.value)}
                onBlur={handleBlur}
              />
              <div className="input-error">
                {
                  touched.kidName && errors.kidName && <span>{ errors.kidName }</span>
                }
              </div>
            </div>
            <div className="profile-item birth">
              <div className='profile-item-title'>학생 생년월일</div>
              <input
                type="date"
                name="kidBirth"
                id="birth"
                value={users.kid.birth || ''}
                onChange={(e) => handleChangeKidInfo('birth', e.target.value)}
                onBlur={handleBlur}
              />
              <div className="input-error">
                {
                  touched.kidBirth && errors.kidBirth && <span>{ errors.kidBirth }</span>
                }
              </div>
            </div>
            <Button
              onClick={onSubmitProfile}
              disabled={errors.phone !== '' || errors.kidName !== '' || errors.kidBirth !== ''}
            >
              { isSubmitting ? '수정중...' : '수정하기' }
            </Button>
          </div>
        )
      }
    </ProfileStyle>
  )
}