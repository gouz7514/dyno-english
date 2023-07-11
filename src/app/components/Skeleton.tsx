import styled, { css } from 'styled-components'

import { SkeletonProps } from '@/types/types'

const SkeletonWrapper = styled.div<SkeletonProps>`
  width: 100%;  
  overflow: hidden;
  position: relative;
  background-color: #eee;
  border-radius: 12px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0)
      );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  ${({ height }) => height && css`
    height: ${height}px;
  `}

  ${({ marginbottom }) => marginbottom && css`
    margin-bottom: ${marginbottom}px;
  `}
`

export default function Skeleton({ height = 300, marginbottom = 12 }: SkeletonProps) {
  return (
    <SkeletonWrapper height={height} marginbottom={marginbottom}></SkeletonWrapper>
  )
}