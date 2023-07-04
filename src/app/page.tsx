'use client'

import styled from 'styled-components'

import Link from 'next/link'

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

    .img-dyno {
      position: absolute;
      width: 120px;
      height: 110px;
      background-image: url('/images/image-dyno-english-just-dyno.webp');
      background-size: cover;
      left: 46px;
      top: 28px;
      z-index: 3;

      &:hover {
        animation: climb 2s ease-in-out infinite;
        animation-timing-function: ease-in-out;
      }

      @keyframes climb {
        0% {
          transform: translate(0%, 0%);
        }
        25% {
          transform: translate(10%, -10%) rotate(3deg)
        }
        50% {
          transform: translate(20%, -20%) rotate(-3deg)
        }
        75% {
          transform: translate(30%, -30%) rotate(3deg)
        }
        100% {
          transform: translate(40%, -40%)
        }
      }
    }

    .img-container {
      width: 100%;
      height: 100%;
      background-image: url('/images/image-dyno-english-just-logo.webp');
      background-position: center;
      background-size: cover;
      transform: scale(1.5);
      z-index: 2;
    }
  }

  .main-links {
    display: flex;
    gap: 24px;
    z-index: 3;

    .dyno-btn {
      padding: 12px;
      background-color: var(--primary-green);
      color: white;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
    }
  }
`

export default function Home() {
  return (
    <main>
      <div>
        <MainStyle className="main-container">
          <div className="main-image">
            <div className="img-dyno"></div>
            <div className="img-container"></div>
          </div>
          <div className="main-links">
            <Link href="/intro/map">
              <div className='dyno-btn'>
                오시는 길
              </div>
            </Link>
            <Link href="/intro/testimonial">
              <div className='dyno-btn'>
                소중한 후기 보기
              </div>
            </Link>
          </div>
        </MainStyle>
      </div>
    </main>
  )
}
