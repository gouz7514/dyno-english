import styled from 'styled-components'
import { forwardRef } from 'react'

const DynoTextAreaStyle = styled.textarea`

`

type TextAreaProps = {
  name?: string
  id?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  disabled?: boolean
}

// export default function DynoTextArea()

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return (
    <DynoTextAreaStyle
      ref={ref}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.disabled}
    >
    </DynoTextAreaStyle>
  )
})

TextArea.displayName = 'DynoTextArea'

export default TextArea