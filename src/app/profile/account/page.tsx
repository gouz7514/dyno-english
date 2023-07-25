'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'

import Button from '@/app/components/Button'

import { UserProps } from '@/types/types'

import api from '@/lib/api'

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
      gap: 12px;

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

      input[type="text"] {
        height: 40px;
        border-radius: 8px;
        padding-left: 8px;
        outline: none;
        border: 0;

        &:focus {
          border: 1px solid var(--second-green);
        }
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

export default function ProfileAccount() {
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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const getUserInfo = async (id: string) => {
    api.get(`/users/${id}`).then((res) => {
      const resData = res.data
      const userData = resData.data
      
      if (resData.status === 200 && resData.message === 'SUCCESS') {
        setUsers({
          name: userData.user_name,
          phone: userData.phone,
          kid: {
            name: userData.kid_name,
            birth: new Date(userData.kid_birth).toISOString().slice(0, 10)
          }
        })
      } else {
        alert('로그인 후 이용해주세요!')
        router.push('/')
        return
      }
    })
  }

  useEffect(() => {
    if (status !== 'loading') {
      const userId = session?.user?.user_id
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
  }, [session])

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

    try {
      api.patch('/users', {
        id: session?.user.user_id,
        name: users.name,
        phone: users.phone,
        kids: {
          name: users.kid.name,
          birth: users.kid.birth
        }
      }).then((res) => {
        const resData = res.data

        if (resData.status === 200 && resData.message === 'SUCCESS') {
          setIsSubmitting(false)
          alert('수정이 완료되었습니다.')
          router.push('/')
        } else {
          alert('로그인 후 이용해주세요!')
          router.push('/login')
          return
        }
      })
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
                value={users.phone || ''}
                onChange={handleChangePhone}
              />
            </div>
            <div className="profile-item kid">
              <div className='profile-item-title'>학생 이름</div>
              <input
                type="text"
                name="kid"
                id="kid"
                placeholder="학생 이름을 입력해주세요"
                value={users.kid.name || ''}
                onChange={(e) => handleChangeKidInfo('name', e.target.value)}
              />
            </div>
            <div className="profile-item birth">
              <div className='profile-item-title'>학생 생년월일</div>
              <input
                type="date"
                name="birth"
                id="birth"
                value={users.kid.birth || ''}
                onChange={(e) => handleChangeKidInfo('birth', e.target.value)}
              />
            </div>
            <Button onClick={onSubmitProfile}>
              { isSubmitting ? '수정중...' : '수정하기' }
            </Button>
          </div>
        )
      }
    </ProfileStyle>
  )
}