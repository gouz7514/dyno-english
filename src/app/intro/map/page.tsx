'use client'

import styled from 'styled-components'
import Link from 'next/link'

const IntroMapStyle = styled.div`
  height: calc(100vh - var(--height-header) - var(--height-footer));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;

  .map-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    gap: 24px;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      gap: 12px;
    }

    .map-link {
      width: 450px;
      height: 450px;
      border-radius: 12px;
      color: white;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      
      &:hover {
        transform: translateY(-6px);
        transition: transform 0.3s ease-in-out;
      }

      @media screen and (max-width: 1024px) {
        width: 375px;
        height: 375px;
      }

      @media screen and (max-width: 600px) {
        width: 300px;
        height: 300px;
      }
  
      &:first-child {
        background: radial-gradient(ellipse farthest-corner at 90% 90%, #ff723a, #ff506e);
      }
  
      &:nth-child(2) {
        background: radial-gradient(ellipse farthest-corner at 90% 90%, #00e244, #00b48e);
      }
    }
  }
`

export default function IntroMap() {
  return (
    <IntroMapStyle>
      <div>
        <div className="map-links">
          <Link href="/intro/map/simple" className='map-link'>
            미사중앙초에서 걸어오는 길
          </Link>
          <Link href="/intro/map/detail" className='map-link'>
            지도로 보기
          </Link>
        </div>
      </div>
    </IntroMapStyle>
  )
}