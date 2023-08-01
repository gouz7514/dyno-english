import styled, { css } from 'styled-components'

import { ButtonProps } from '@/types/types'

const BtnStyle = styled.button<ButtonProps>`
  padding: 12px;
  width: 100%;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  border: 0;

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

  ${({ color }) => css`
    ${color === 'primary' && css`
      background-color: var(--second-green);
    `}

    ${color === 'default' && css`
      background-color: var(--button-default);
      color: black;
    `}
  `}
`

export default function Button({ onClick, children, disabled = false, size = 'large', color = 'primary' }: ButtonProps) {
  return (
    <BtnStyle onClick={onClick} disabled={disabled} size={size} color={color}>
      {children}
    </BtnStyle>
  )
}