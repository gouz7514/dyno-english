import Link from 'next/link'

import styled, { css } from 'styled-components'

import { LinkButtonProps } from '@/types/types'

const LinkButtonStyle = styled.div<LinkButtonProps>`
  padding: 8px 12px;
  width: auto;
  background-color: var(--primary-green);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`

export default function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <LinkButtonStyle href={href}>
      <Link href={href}>
        { children }
      </Link>
    </LinkButtonStyle>
  )
}