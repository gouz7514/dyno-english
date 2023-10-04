import styled, { css } from 'styled-components'
import { forwardRef } from 'react'

const InputStyle = styled.input<InputProps>`
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  padding: 0 8px;
  background-color: #fff;
  z-index: 101;

  &:focus {
    border: 1px solid var(--primary-green);
  }

  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ type }) => css`
    ${type === 'date' && css`
      position: relative;

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        color: transparent;
        cursor: pointer;
      }
    `}    
  `}
  )}
`

type InputProps = {
  type: string
  ref?: any
  name?: string
  id?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputStyle
      type={props.type}
      ref={ref}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.disabled}
    >
    </InputStyle>
  )
})

Input.displayName = 'DynoInput'

export default Input