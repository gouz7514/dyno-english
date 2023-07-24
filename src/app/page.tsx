'use client'

import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Link from 'next/link'

import { signIn, useSession } from 'next-auth/react'

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--height-header));

  .main-image {
    width: 420px;
    height: 280px;
    position: relative;
    transform: translateX(-13px);

    @media screen and (max-width: 376px) {
      transform: translateX(-13px) translateY(0px);
    }

    .img-dyno {
      position: absolute;
      width: 120px;
      height: 110px;
      background-image: url('/images/image-dyno-english-just-dyno.webp');
      background-size: cover;
      left: 30px;
      top: 28px;
      z-index: 3;

      @media screen and (max-width: 376px) {
        transform: scale(0.87);
        left: 55px;
        top: 38px;
      }

      &.pop {
        animation: pop 1s ease-in-out;
        animation-timing-function: ease-in-out;
      }

      @keyframes pop {
        0% { transform: translate(0%, 0%) scale(1.05, 1); }
        50% { transform: translate(0%, -20%) scale(1, 1); }
        55% { transform: translate(0%, -20%) }
        60% { transform: translate(0%, -20%) rotate(-5deg); }
        65% { transform: translate(0%, -20%) rotate(5deg); }
        70% { transform: translate(0%, -20%) }
        100% { transform: translate(0%, 0%) scale(1.05, 1); }
      }
    }

    .img-container {
      width: 100%;
      height: 100%;
      background-image: url('/images/image-dyno-english-just-logo.webp');
      background-position: center;
      background-size: cover;
      transform: scale(1.8);
      z-index: 2;

      @media screen and (max-width: 376px) {
        transform: scale(1.4);
      }
    }
  }

  .main-links {
    display: flex;
    flex-direction: column;
    gap: 24px;
    z-index: 3;

    .btn-container {
      display: flex;
      gap: 24px;
    }

    .dyno-btn {
      padding: 12px;
      width: 120px;
      background-color: var(--second-green);
      color: white;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;

      &:hover {
        transform: scale(1.02);
      }

      @media screen and (max-width: 376px) {
        width: 105px;
        font-size: 14px;
        transform: translateY(-40px);
      }
    }

    .kakao-session {
      height: 45px;
      border-radius: 12px;
      background-color: #fee500;
      color: black;
      margin: auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kakao-btn {
      height: 45px;
      border-radius: 12px;
      background-image: url('/images/kakao/image-kakao-btn-medium-narrow.png');
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fee500;
      cursor: pointer;
    }
  }
`

export default function Home() {
  const imgDynoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgDynoRef.current) return

    const imgDyno = imgDynoRef.current
    if (imgDyno) {
      imgDyno.classList.add('pop')
    }

    return () => {
      if (imgDyno) {
        imgDyno.classList.remove('pop')
      }
    }
  }, [])

  const handleMouseMove = (flag: boolean) => {
    if (!imgDynoRef.current) return

    const imgDyno = imgDynoRef.current
    if (flag) {
      imgDyno.classList.add('pop')
    } else {
      imgDyno.classList.remove('pop')
    }
  }

  const { data: session } = useSession()

  const kakaoLogin = () => {
    signIn('kakao')
  }

  return (
    <main>
      <div>
        <MainStyle className="main-container">
          <div className="main-image">
            <div
              ref={imgDynoRef}
              className="img-dyno"
              onMouseEnter={() => handleMouseMove(true)}
              onMouseLeave={() => handleMouseMove(false)}
            ></div>
            <div className="img-container"></div>
          </div>
          <div className="main-links">
            <div className="btn-container">
              <Link href="/intro/map">
                <div className='dyno-btn'>
                  오시는 길
                </div>
              </Link>
              <Link href="/study/recruit">
                <div className='dyno-btn'>
                  상담 신청
                </div>
              </Link>
            </div>
            {/* {
              session ? (
                <div className='kakao-session'>
                  { session.user?.name }님 환영합니다
                </div>
              ) :
              (
                <div className='kakao-btn' onClick={kakaoLogin}/>
              )
            } */}
          </div>
        </MainStyle>
      </div>
    </main>
  )
}
