'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styled from 'styled-components'

import Skeleton from '../components/Skeleton'

import Button from '@/app/components/Button'

import { UserProps } from '@/types/types'

import api from '@/lib/api'

const ProfileStyle = styled.div`
  padding: 24px 12px 0;

  .profile-container {
    .profile-title {
      display: flex;
      margin-bottom: 12px;

      .profile-username {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .profile-setting {
        margin-left: auto;
        width: 28px;
        height: 28px;
        background-size: cover;
        background-image: url('/icon/icon-setting.webp');
        cursor: pointer;
      }
    }

    .profile-class {
      width: 100%;

      .class-title {
        font-size: 1.2rem;
        margin-bottom: 12px;
      }

      .class-info {
        display: flex;
        gap: 12px;
      }

      .class-detail,
      .class-homework {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        width: 50%;
        height: 300px;
        border-radius: 12px;
      }

      .class-detail {
        background-color: var(--primary-pink);
      }

      .class-homework {
        background-color: var(--primary-vanilla);
      }
    }
  }
`

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState<boolean>(true)

  const [classInfo, setClassInfo] = useState({
    title: ''
  })

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)

      if (!session || !session?.user) {
        alert('로그인 후 이용해주세요!')
        router.push('/login')
        return
      } else {
        getClassInfo(session?.user.user_id)
      }
    }
  }, [session])

  const getClassInfo = async (id: string) => {
    api.get(`/classes/${id}`).then((res) => {
      const resData = res.data
      const classData = resData.data

      if (resData.status === 200 && resData.message === 'SUCCESS') {
        setClassInfo({
          title: classData.title
        })
      } else {
        alert('수업 정보를 불러오는데 실패했습니다.')
        return
      }
    })
  }

  return (
    <ProfileStyle className='container'>
      {
        loading ? (
          <Skeleton height={400} />
        ) : (
          <div className='profile-container'>
            <div className="profile-title">
              <div className="profile-username">
                {session?.user.username} 학부모님
              </div>
              <Link href='/profile/account' className='profile-setting' />
            </div>
            <div className="profile-class">
              <div className="class-title">
                {classInfo.title}
              </div>
              <div className="class-info">
                <div className="class-detail"></div>
                <div className="class-homework"></div>
              </div>
            </div>
          </div>
        )
      }
    </ProfileStyle>
  )
}