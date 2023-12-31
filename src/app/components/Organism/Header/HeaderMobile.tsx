import styled from 'styled-components'
import Link from 'next/link'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import HeaderDropdown from './HeaderDropdown'
import { DropdownIntro, DropdownCurriculumn, DropdownStudy } from '@/lib/constants/constatns'

const HeaderMobileStyle = styled.div`
  position: absolute;

  .header-links-mobile {
    position: fixed;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: white;
    right: 0;
    top: 0;
    transform: translateX(100%);
    --webkit-transform: translateX(100%);
    transition: all 0.3s ease-in-out;
    color: black;
    font-weight: bold;
    z-index: 103;
    filter: opacity(0.85);
    border-left: 1px solid #e5e5e5;

    .header-close {
      background-image: url('/icon/icon_menu.svg');
      width: var(--header-icon-size);
      height: var(--header-icon-size);
      background-size: var(--header-icon-size) var(--header-icon-size);
      background-image: url('/icon/icon_close.svg');
      cursor: pointer;
      position: absolute;
      right: 1.8em;
      top: 1.6em;
    }

    .header-links {
      padding-top: var(--height-header);
      
      .header-link {
        padding: 1.8rem;
        cursor: pointer;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;

        .header-dropdown-icon {
          &.up {
            background-image: url('/icon/icon-arrow-up.svg');
            width: 16px;
            height: 12px;
            background-size: 16px 12px;
          }

          &.down {
            background-image: url('/icon/icon-arrow-down.svg');
            width: 16px;
            height: 9px;
            background-size: 16px 9px;
          }
        }
      }
    }

    &.open {
      transform: translateX(0);
      position: fixed;
    }
  }
`

interface HeaderMobileProps {
  isMenuVisible: boolean,
  handleMenuClose: () => void,
}

export default function HeaderMobile({ isMenuVisible, handleMenuClose }: HeaderMobileProps ) {
  const pathname = usePathname()
  const currentPathNameRef = useRef(pathname)

  const [dropdownVisible, setDropdownVisible] = useState({
    intro: false,
    curriculumn: false,
    study: false,
  })

  const handleDropdownClick = (dropdownName: string) => {
    setDropdownVisible({
      intro: dropdownName === 'intro' ? !dropdownVisible.intro : false,
      curriculumn: dropdownName === 'curriculumn' ? !dropdownVisible.curriculumn : false,
      study: dropdownName === 'study' ? !dropdownVisible.study : false,
    })
  }

  const closeDropdown = () => {
    setDropdownVisible({
      intro: false,
      curriculumn: false,
      study: false,
    })
  }

  useEffect(() => {
    if (currentPathNameRef.current !== pathname) {
      closeDropdown()
      currentPathNameRef.current = pathname
    }
  }, [pathname])

  return (
    <HeaderMobileStyle>
      <div className={ `header-links-mobile ${isMenuVisible ? 'open' : 'hide'}` }>
        <div className="header-close" onClick={handleMenuClose}/>
        <div className="header-links">
          <div className="header-link" onClick={() => handleDropdownClick('intro')}>
            <div className="header-link-text">
              소개
            </div>
          </div>
          <HeaderDropdown list={DropdownIntro} mobile={true} visible={dropdownVisible.intro} />
          <div className="header-link" onClick={() => handleDropdownClick('curriculumn')}>
            <div className="header-link-text">
              커리큘럼
            </div>
          </div>
          <HeaderDropdown list={DropdownCurriculumn} mobile={true} visible={dropdownVisible.curriculumn} />
          <div className="header-link" onClick={() => handleDropdownClick('study')}>
            <div className="header-link-text">
              수업
            </div>
          </div>
          <HeaderDropdown list={DropdownStudy} mobile={true} visible={dropdownVisible.study} />
          <div className="header-link">
            <Link href="/notice">공지사항</Link>
          </div>
        </div>
      </div>
    </HeaderMobileStyle>
  )
}