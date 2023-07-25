'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import styled from 'styled-components'

import Skeleton from '../components/Skeleton'

import Button from '@/app/components/Button'

import { UserProps } from '@/types/types'

import api from '@/lib/api'

const ProfileStyle = styled.div`

`

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)

      if (!session || !session?.user) {
        alert('로그인 후 이용해주세요!')
        router.push('/login')
        return
      } else {
        // console.log(session?.user.name)
        return
      }
    }
  }, [session])

  return (
    <ProfileStyle className='container'>
      {
        loading ? (
          <Skeleton height={400} />
        ) : (
          <div>
            <div>{session?.user.username} 학부모님</div>
          </div>
        )
      }
    </ProfileStyle>
  )
}