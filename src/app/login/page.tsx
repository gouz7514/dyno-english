'use client'

import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));

  .kakao-btn {
    width: 183px;
    height: 45px;
    border-radius: 12px;
    background-image: url('/images/kakao/image-kakao-btn-medium-narrow.png');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #fee500;
    cursor: pointer;
  }
`

const kakaoLogin = () => {
  signIn('kakao', {
    callbackUrl: `${window.location.origin}`
  })
}

export default async function LoginPage() {
  const router = useRouter()
  const { data: session, status } = await useSession()

  if (status !== 'loading') {
    if (session) {
      router.push('/profile')
    }
  }

  return (
    <LoginStyle>
      <div className="kakao-btn" onClick={kakaoLogin} />
    </LoginStyle>
  )
}