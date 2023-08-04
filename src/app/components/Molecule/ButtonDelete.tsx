import styled from 'styled-components'

const ButtonDeleteStyle = styled.button`
  background-color: red;
  border: none;
  background-image: url('/icon/icon-delete.webp');
  width: 30px;
  height: 30px;
  background-size: 30px 30px;
  border-radius: 8px;
  cursor: pointer;
  background-position: center;
  // transform: scale(0.95);

  &:hover {
    transform: scale(1.05);
  }
`

interface ButtonDeleteProps {
  onClick: (e: any) => void
}

export default function ButtonDelete({ onClick }: ButtonDeleteProps) {
  return (
    <ButtonDeleteStyle onClick={onClick}>
    </ButtonDeleteStyle>
  )
}