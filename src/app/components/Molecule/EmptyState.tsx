import styled, { css } from 'styled-components'

import ImageDyno from '../../../../public/images/image-dyno.webp'

import Image from 'next/image'

interface EmptyStateprops {
  mainText?: string
  subText?: string
  size?: string
}

const EmptyStateStyle = styled.div<EmptyStateprops>`
  .empty-container {
    background-color: #eee;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${({ size }) => size === 'large' ? '400px' : '300px'};
  }

  .empty-container-img {
    width: 100px;
    height: 100px;
    margin-bottom: 12px;
  }

  .empty-container-text {
    text-align: center;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .main-text {
      font-weight: 700;
    }

    .sub-text {
      font-weight: 400;
    }
  }
`

export default function EmptyState({ mainText = '', subText = '', size = 'large' }: EmptyStateprops) {
  return (
    <EmptyStateStyle size={size}>
      <div className="empty-container">
        <Image
          src={ImageDyno}
          alt="dyno"
          width={100}
          height={100}
          className="empty-container-img"
        />
        <div className="empty-container-text">
          <div className="main-text">
            {mainText}
          </div>
          <div className="sub-text">
            {subText}
          </div>
        </div>
      </div>
    </EmptyStateStyle>
  )
}