import styled from 'styled-components'
import Link from 'next/link'

const DropdownStyle = styled.article`
  .desktop {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 12px 0;
    background-color: var(--primary-white);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    z-index: 2;

    .dropdown-link {
      padding: 18px 12px;

      .dropdown-link-text {
        font-weight: normal;
        font-size: 14px;
      }

      &:hover {
        .dropdown-link-text {
          transform: scale(1.05);
        }
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
        font-weight: normal;
      }
    }

    &.mobile-visible {
      display: flex;
      animation: rotateMenu 400ms ease-in-out forwards;
      transform-origin: top center;
    }

    &.mobile-hide {
      display: none;
      animation: rotateOut 400ms ease-in-out forwards;
      transform-origin: top center;;
    }

    @keyframes rotateMenu {
      0% {
      transform: rotateX(-90deg);
      }

      70% {
        transform: rotateX(20deg);
      }

      100% {
        transform: rotateX(0deg);
      }
    }

    @keyframes rotateOut {
      0% {
        transform: rotateX(0deg);
      }

      70% {
        transform: rotateX(20deg);
      }

      100% {
        transform: rotateX(-90deg);
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
  visible?: boolean
}

export default function HeaderDropdown({ list, mobile = false, visible = false }: DropdownProps) {
  return (
    <DropdownStyle className={ `${mobile ? 'header-mobile' : ''}` }>
      <div className={ `${mobile ? (visible ? 'mobile mobile-visible' : 'mobile mobile-hide') : 'desktop' }` }>
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