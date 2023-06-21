import styled from 'styled-components'
import Link from 'next/link'

const DropdownStyle = styled.article`
  .desktop {
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
  }

  .mobile {
    flex-direction: column;
    align-items: center;

    .dropdown-link {
      width: 100%;
      text-align: center;

      .dropdown-link-text {
        padding: 12px 0;
        background-color: var(--primary-white);
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        &:hover {
          background-color: var(--primary-white-hover);
        }
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
      <div className={ `${mobile ? 'mobile': 'desktop'}` }>
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