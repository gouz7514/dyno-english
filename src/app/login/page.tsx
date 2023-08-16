'use client'

import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import Button from '@/app/components/Button'
import DynoInput from '@/app/components/Atom/Input/DynoInput'

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));

  .kakao-btn-container {
    width: 100%;
    max-width: 350px;
    min-width: 183px;
    height: 45px;
    border-radius: 12px;
    background-color: #fee500;
    cursor: pointer;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: rgba(0, 0, 0, 0.85);
    
    .kakao-btn-image {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      background-image: url('/images/kakao/image-kakao-btn.png');
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    background-color: #eee;
    padding: 24px;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    gap: 24px;

    .form-description {
      line-height: 1.5;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 24px;

      input {
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
`

const kakaoLogin = () => {
  signIn('kakao', {
    callbackUrl: '/profile'
  })
}

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isValid, setIsValid] = useState(false)

  if (status !== 'loading') {
    if (session) {
      router.push('/profile')
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const password = passwordRef.current?.value
    
    if (password === process.env.NEXT_PUBLIC_LOGIN_ADMIN_PASSWORD) {
      setIsValid(true)
    } else {
      alert('비밀번호가 틀렸습니다')
      passwordRef.current!.value = ''
    }
  }

  return (
    <LoginStyle>
      {
        isValid ? (
          <button className="kakao-btn-container" onClick={kakaoLogin}>
            <span className="kakao-btn-image" />
            <span>카카오 로그인</span>
          </button>
        ) : 
        (
          <div className='form-container'>
            <div className='form-description'>
              서비스 이용을 위해 로그인이 필요합니다<br />
              다이앤 선생님이 알려드린 <span className='text-bold'>비밀번호</span>를 입력 후 카카오로 로그인해주세요!
            </div>
            <form onSubmit={onSubmit}>
              <div className='input-container'>
                <DynoInput ref={passwordRef} type="password" placeholder="비밀번호"/>
                <Button onClick={onSubmit}>로그인</Button>
              </div>
            </form>
          </div>
        )

      }
    </LoginStyle>
  )
}