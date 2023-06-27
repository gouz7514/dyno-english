import styled from 'styled-components'
import Link from 'next/link'

const DropdownStyle = styled.article`
  .desktop {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 18px;
    
    &.show {
      display: flex;
    }

    .dropdown-link {
      padding: 12px;

      .dropdown-link-text {
        font-weight: normal;
        font-size: 14px;
      }
    }
  }

  .mobile {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dropdown-link {
      width: 100%;
      text-align: center;

      .dropdown-link-text {
        padding: 12px 0;
        background-color: var(--primary-white);
        font-weight: normal;
      }
    }
  }
`

interface DropdownItem {
  title: string,
  link: string,
}

interface DropdownProps {
  list: DropdownItem[] | null
  mobile?: boolean
}

export default function HeaderDropdown({ list, mobile = false }: DropdownProps) {
  return (
    <DropdownStyle className={ `${mobile ? 'header-mobile' : ''}` }>
      <div className={ `${mobile ? 'mobile': 'desktop' }` }>
        {
          list && 
          list.map((item, index) => (
            <Link key={index} href={item.link} className='dropdown-link'>
              <div className='dropdown-link-text'>
                {item.title}
              </div>
            </Link>
          ))
        }
      </div>
    </DropdownStyle>
  )
}