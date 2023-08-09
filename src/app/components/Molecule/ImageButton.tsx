import styled from 'styled-components'

const StyleImageButton = styled.button<ImageButtonProps>`
  border: none;
  background-image: ${({ role }) => role === 'edit' ? 'url(/icon/icon-edit.webp)' : 'url(/icon/icon-delete.webp)'};
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  border-radius: 50%;
  cursor: pointer;
  background-position: center;

  &:hover {
    transform: scale(1.05);
  }
`

type ImageButtonRole = 'edit' | 'delete'

interface ImageButtonProps {
  onClick: (e: any) => void
  role: ImageButtonRole
}

export default function ImageButton({ onClick, role = 'delete' }: ImageButtonProps) {
  return (
    <StyleImageButton onClick={onClick} role={role}>
    </StyleImageButton>
  )
}