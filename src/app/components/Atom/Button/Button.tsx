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
    background-color: var(--color-disabled) !important;
    cursor: not-allowed;
    color: var(--color-disabled-text) !important;
  `}

  ${({ size }) => css`
    ${size === 'medium' && css`
      width: 300px;
    `}

    ${size === 'small' && css`
      width: auto;
      padding: 6px 8px;
    `}
  `}

  ${({ color }) => css`
    ${color === 'primary' && css`
      background-color: var(--primary-green);
    `}

    ${color === 'default' && css`
      background-color: var(--button-default);
      color: black;
    `}

    ${color === 'danger' && css`
      background-color: var(--button-danger);
      color: white;
    `}
  `}
`

export default function Button({ onClick, children, disabled = false, size = 'large', color = 'primary', className = '' }: ButtonProps) {
  return (
    <BtnStyle onClick={onClick} disabled={disabled} size={size} color={color} className={className}>
      {children}
    </BtnStyle>
  )
}