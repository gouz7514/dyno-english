'use client'

import styled from 'styled-components'

import AnimationDynoEnglish from '../../public/lottie/lottie-dyno-english.json'
import LottieAnimation from './components/Lottie'

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--height-header));

  .main-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default function Home() {
  return (
    <main>
      <div>
        <MainStyle className="main-container">
          <LottieAnimation json={AnimationDynoEnglish} />
          <div className='main-text'>
            <h2>
              다이노 영어에 오신 것을 환영해요!
            </h2>
            <h2>
              오른쪽 위 메뉴를 둘러보세요!
            </h2>
          </div>
        </MainStyle>
      </div>
    </main>
  )
}
