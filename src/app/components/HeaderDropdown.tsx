import styled from 'styled-components'
import Link from 'next/link'

const DropdownStyle = styled.article`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--second-yellow);
  
  &.show {
    display: flex;
  }

  .dropdown-link {
    padding: 12px;

    &:hover {
      background-color: var(--primary-yellow-hover);
    }
  }
`

interface DropdownItem {
  title: string,
  link: string,
}

interface DropdownProps {
  list: DropdownItem[] | null
}

export default function HeaderDropdown({ list }: DropdownProps) {
  return (
    <DropdownStyle>
      {
        list && 
        list.map((item, index) => (
          <Link key={index} href={item.link} className='dropdown-link'>
            <div>
              {item.title}
            </div>
          </Link>
        ))
      }
    </DropdownStyle>
  )
}