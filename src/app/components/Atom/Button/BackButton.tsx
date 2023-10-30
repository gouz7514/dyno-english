'use client'

import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyleBackButton = styled.div`
  --icon-size: 24px;

  border: none;
  width: var(--icon-size);
  height: var(--icon-size);
  background-size: var(--icon-size) var(--icon-size);
  border-radius: 50%;
  cursor: pointer;
  background-position: center;
  background-image: url(/icon/icon-back.svg);
  margin-bottom: 24px;
`

interface BackButtonProps {
  href?: string
}

export default function BackButton({ href = '' }: BackButtonProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (href) {
      router.push(href)
      return
    }
    router.back()
  }
  
  return (
    <StyleBackButton onClick={handleClick}>
    </StyleBackButton>
  )
}