'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, getSession } from 'next-auth/react'
import styled from 'styled-components'

import Button from '@/app/components/Button'

import { UserProps } from '@/types/types'

import { rdb } from "@/firebase/config"
import { getDatabase, ref, child, get, push, update } from 'firebase/database'

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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const getUserInfo = async (id: string) => {
    const usersRef = ref(rdb, 'users')
    const snapshot = await get(child(usersRef, id))
    if (snapshot.exists()) {
      const userInfo = snapshot.val()
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
  }

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
  }, [session])

  const handleChangePhone = (e: any) => {
    setUsers({
      ...users,
      phone: e.target.value
    })
  }

  // 여기서 아이 정보는 쿠키에 저장해야할듯
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
    const dbRef = ref(getDatabase())

    get(child(dbRef, `users/${session?.user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        update(child(dbRef, `users/${session?.user.userId}`), {
          phone: users.phone,
          kid: {
            name: users.kid.name,
            birth: users.kid.birth
          }
        }).then(() => {
          setIsSubmitting(false)
          alert('수정이 완료되었습니다.')
          router.push('/')
        })
      } else {
        alert('로그인 후 이용해주세요!')
        router.push('/login')
        return
      }
    })
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
                type="text"
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