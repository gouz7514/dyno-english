import Link from 'next/link'

import styled, { css } from 'styled-components'

import { LinkButtonProps } from '@/types/types'

const LinkButtonStyle = styled.div<LinkButtonProps>`
  padding: 12px;
  width: 100%;
  background-color: var(--primary-green);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin: 0 auto;

  &:hover {
    transform: scale(1.02);
  }

  ${({ width }) => width && css`
    width: ${width}px !important;
  `}
`

export default function LinkButton({ href, children, width = 120 }: LinkButtonProps) {
  return (
    <LinkButtonStyle href={href} width={width}>
      <Link href={href}>
        { children }
      </Link>
    </LinkButtonStyle>
  )
}