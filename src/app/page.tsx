'use client'

import styled from 'styled-components'

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

    .img-container {
      width: 100%;
      height: 100%;
      background-image: url('/images/image-dyno-english-full.webp');
      background-position: center;
      background-size: cover;
      transform: scale(1.5);
    }
  }

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
          <div className="main-image">
            <div className="img-container"></div>
          </div>
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
