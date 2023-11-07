'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { kakaoConsult } from '@/lib/utils/kakao'

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));

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
    position: absolute;
    bottom: -40px;

    @media screen and (max-width: 376px) {
      bottom: -20px;
    }

    .btn-container {
      display: flex;
      gap: 24px;

      button {
        border: none;
        cursor: pointer;
      }
    }

    .dyno-btn {
      padding: 12px;
      width: 120px;
      background-color: var(--primary-green);
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
      }
    }
  }
`

export default function HomePage() {
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

  let isAnimationRunning = false

  const onClickDyno = () => {
    if (!imgDynoRef.current || isAnimationRunning) return
    isAnimationRunning = true
    
    const imgDyno = imgDynoRef.current
    imgDyno.classList.add('pop')

    setTimeout(() => {
      imgDyno.classList.remove('pop')
      isAnimationRunning = false
    }
    , 1000)
  }

  return (
    <main>
      <div>
        <MainStyle className="main-container">
          <div className='d-flex flex-column relative justify-content-center align-items-center'>
            <div className="main-image">
              <div
                ref={imgDynoRef}
                className="img-dyno"
                onClick={() => onClickDyno()}
                onTouchStart={() => onClickDyno()}
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
                <button id="kakao-btn" onClick={kakaoConsult}>
                  <div className='dyno-btn'>
                    상담 신청
                  </div>
                </button>
              </div>
            </div>
          </div>
        </MainStyle>
      </div>
    </main>
  )
}