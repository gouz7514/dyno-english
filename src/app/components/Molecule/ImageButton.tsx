import styled from 'styled-components'

const StyleImageButton = styled.button<IImageButtonProps>`
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

interface IImageButtonProps {
  onClick: (e: any) => void
  role?: 'edit' | 'delete'
}

export default function ImageButton({ onClick, role = 'delete' }: IImageButtonProps) {
  return (
    <StyleImageButton onClick={onClick} role={role}>
    </StyleImageButton>
  )
}