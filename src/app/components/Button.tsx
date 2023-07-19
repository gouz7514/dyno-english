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
  margin: 0 auto;
  cursor: pointer;

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

  ${({ size }) => size === 'medium' && css`
    width: 300px;
  `}
`

export default function Button({ onClick, children, width = 300, disabled = false, size = 'large' }: ButtonProps) {
  return (
    <BtnStyle onClick={onClick} disabled={disabled} size={size}>
      {children}
    </BtnStyle>
  )
}