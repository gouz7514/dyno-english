import styled, { css } from 'styled-components'

import { ButtonProps } from '@/types/types'

const BtnStyle = styled.div<ButtonProps>`
  padding: 12px;
  width: 100%;
  background-color: var(--primary-green);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;

  &:hover {
    transform: scale(1.02);
  }

  ${({ width }) => width && css`
    width: ${width}px;
  `}

  ${({ disabled }) => disabled && css`
    background-color: var(--color-disabled);
    cursor: not-allowed;
    color: var(--color-disabled-text);
  `}
`

export default function Button({ onClick, children, width = 120, disabled = false }: ButtonProps) {
  return (
    <BtnStyle onClick={onClick} disabled={disabled}>
      {children}
    </BtnStyle>
  )
}