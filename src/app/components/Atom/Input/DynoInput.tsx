import styled, { css } from 'styled-components'

const InputStyle = styled.input<InputProps>`
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  width: 100%;
  padding: 0 8px;

  &:focus {
    border: 1px solid var(--primary-green);
  }

  &:disabled {
    background-color: #eaeaea;
    cursor: not-allowed;
  }

  ${({ type }) => css`
    ${type === 'date' && css`
      position: relative;
      outline: none;

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

export default function Input(...props: InputProps[]) {
  return (
    <InputStyle
      type={props[0].type}
      ref={props[0].ref}
      name={props[0].name}
      id={props[0].id}
      placeholder={props[0].placeholder}
      value={props[0].value}
      onChange={props[0].onChange}
      onBlur={props[0].onBlur}
      disabled={props[0].disabled}
    >
    </InputStyle>
  )
}

