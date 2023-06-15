import styled from 'styled-components'
import Link from 'next/link'

const DropdownStyle = styled.article`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--primary-yellow);
  margin-top: 6px;

  .arrow,
  .arrow::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
  }

  .arrow {
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent var(--primary-yellow) transparent;
    top: -6px;
    left: 24px;
    transform: translateX(-50%);
  }

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
      <div className="arrow"></div>
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