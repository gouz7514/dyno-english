import styled, { css } from 'styled-components'

const StyleImageButton = styled.button<ImageButtonProps>`
  --image-button-size: 28px;

  border: none;
  width: var(--image-button-size);
  height: var(--image-button-size);
  background-size: var(--image-button-size) var(--image-button-size);
  border-radius: 50%;
  cursor: pointer;
  background-position: center;

  ${({ role }) => css`
    ${role === 'add' && css`
      background-image: url(/icon/icon-add.webp);
    `}

    ${role === 'edit' && css`
      background-image: url(/icon/icon-edit.webp);
    `}

    ${role === 'delete' && css`
      background-image: url(/icon/icon-delete.webp);
    `}
  `}

  &:hover {
    transform: scale(1.05);
  }
`

type ImageButtonRole = 'edit' | 'delete' | 'add'

interface ImageButtonProps {
  onClick: (e: any) => void
  role: ImageButtonRole
}

export default function ImageButton({ onClick, role }: ImageButtonProps) {
  return (
    <StyleImageButton onClick={onClick} role={role}>
    </StyleImageButton>
  )
}