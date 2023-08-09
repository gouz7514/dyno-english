import styled, { css } from 'styled-components'

const InputStyle = styled.input<InputProps>`
  height: 40px;
  border-radius: 8px;
  outline: none;
  border: 0;
  width: 100%;

  &:focus {
    border: 1px solid var(--primary-green);
  }

  ${({ type }) => css`
    ${type === 'date' && css`
      position: relative;
      border-radius: 8px;
      padding: 0 8px;
      height: 40px;
      outline: none;
      border: 1px solid #ccc;

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
    >
    </InputStyle>
  )
}

