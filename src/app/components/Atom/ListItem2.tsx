import styled from 'styled-components'

const ListItemStyle = styled.li`
  width: 100%;
  border-radius: 12px;
  background-color: #eaeaea;
  list-style: none;
  margin-bottom: 12px;
  cursor: pointer;

  .list-item {
    display: flex;
    list-style: none;
    align-items: center;
    height: 64px;
    padding: 0 0 0 16px;
  }

  &:hover {
    background-color: #d8d8d8;
  }
`

type ListItemProps = {
  title: string
  onClick?: () => void
}

export default function ListItem({ title, onClick }: ListItemProps) {
  return (
    <div onClick={onClick}>
      <ListItemStyle>
        <div className='list-item'>
          { title }
        </div>
      </ListItemStyle>
    </div>
  )
}