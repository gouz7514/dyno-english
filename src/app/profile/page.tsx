'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, getSession } from 'next-auth/react'
import Image from 'next/image'
import styled from 'styled-components'

import Button from '@/app/components/Button'

import { UserProps } from '@/types/types'

import { rdb } from "@/firebase/config"
import { getDatabase, ref, child, get, push, update } from 'firebase/database'

const ProfileStyle = styled.div`
  background-color: #eee;
  padding: 24px;

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
        font-size: 20px;
      }

      .profile-image-container {
        width: 200px;
        height: 200px;
  
        img {
          border-radius: 12px;
          object-fit: cover;
        }
      }

      &.kid {
        input[type="text"] {
          height: 40px;
          border-radius: 8px;
          padding-left: 8px;
          outline: none;
          border: 0;

          &:focus {
            border: 1px solid var(--primary-green);
          }
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
    image: '',
    name: '',
    kid: ''
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const getUserInfo = async (id: string) => {
    const usersRef = ref(rdb, 'users')
    const snapshot = await get(child(usersRef, id))
    if (snapshot.exists()) {
      const userInfo = snapshot.val()
      setUsers({
        image: userInfo.image,
        name: userInfo.name,
        kid: userInfo.kid
      })
    } else {
      alert('로그인 후 이용해주세요!')
      router.push('/')
      return
    }
  }

  useEffect(() => {
    if (status !== 'loading') {
      const userId = session?.user?.userId
      setPageLoading(false)

      if (!userId) {
        alert('로그인 후 이용해주세요!')
        router.push('/')
        return
      } else {
        getUserInfo(userId)
        return
      }
    }
  }, [session])

  const handleChangeKidName = (e: any) => {
    setUsers({
      ...users,
      kid: e.target.value
    })
  }

  const onSubmitProfile = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    const dbRef = ref(getDatabase())

    get(child(dbRef, `users/${session?.user.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        update(child(dbRef, `users/${session?.user.userId}`), {
          kid: users.kid
        }).then(() => {
          setIsSubmitting(false)
          alert('수정이 완료되었습니다.')
          router.push('/')
        })
      } else {
        alert('로그인 후 이용해주세요!')
        router.push('/')
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
            <div className='profile-item image'>
              <div className='profile-item-title'>이미지</div>
              <div className="profile-image-container">
                {
                  users.image ? (
                    <Image
                      src={users.image}
                      alt={`${users.name}님 프로필 이미지`}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <Image
                      src='/images/image-placeholder.webp'
                      alt={`${users.name}님 프로필 이미지`}
                      width={200}
                      height={200}
                    />
                  )
                }
              </div>
            </div>
            <div className='profile-item name'>
              <div className='profile-item-title'>이름</div>
              <div>{users.name}</div>
            </div>
            <div className="profile-item kid">
              <div className='profile-item-title'>아이 이름</div>
              <input
                type="text"
                name="kid"
                id="kid"
                placeholder="아이 이름을 입력해주세요"
                value={users.kid}
                onChange={handleChangeKidName}
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