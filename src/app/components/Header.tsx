import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import HeaderDropdown from './HeaderDropdown'
import ClickAwayListener from './ClickAwayListener'

const HeaderStyle = styled.header`
  // background-color: var(--primary-green);
  color: #fff;
  padding: 1rem;
  display: flex;
  height: var(--height-header);
  position: relative;
  z-index: 10;
  border: 1px black solid;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40px;
    color: black;
    font-weight: bold;

    .header-home {
      margin-right: auto;
      background-image: url('/logo/logo_dyno_english.png');
      width: 180px;
      height: 40px;
      background-repeat: no-repeat;
      background-size: 180px 40px;
      z-index: 10;
    }

    .header-menu {
      .header-toggle {
        display: none;
        cursor: pointer;
        background-image: url('/icon/icon_menu.svg');
        width: 30px;
        height: 30px;
        background-size: 30px 30px;

        @media screen and (max-width: 600px) {
          display: block;
        }
      }

      .header-links {
        display: flex;
        gap: 18px;

        .header-link {
          cursor: pointer;
          background-color: var(--primary-yellow);
          padding: 12px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;

          .arrow {
            background-image: url('/icon/icon-arrow-down.svg');
            width: 16px;
            height: 9px;
            background-size: 16px 9px;
          }
        }

        @media screen and (max-width: 600px) {
          display: none;
        }
      }
    }

    .header-links-mobile {
      position: absolute;
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--primary-yellow);
      right: 0;
      top: 0;
      transform: translateX(100%);
      --webkit-transform: translateX(100%);
      transition: all 0.3s ease-in-out;
      color: black;
      font-weight: bold;
      z-index: 10;

      .header-close {
        background-image: url('/icon/icon_menu.svg');
        width: 30px;
        height: 30px;
        background-size: 30px 30px;
        background-image: url('/icon/icon_close.svg');
        cursor: pointer;
        position: absolute;
        right: 1em;
        top: 1em;
      }

      .header-links {
        padding-top: var(--height-header);
        
        .header-link {
          padding: 2rem;
          cursor: pointer;
          text-align: center;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  
          &:hover {
            backdrop-filter: brightness(1.1);
          }
        }
      }

      &.open {
        transform: translateX(0);
        position: fixed;
      }
    }
  }
`

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: 2;

  &.visible {
    opacity: 0.5;
    visibility: visible;
    background-color: #000;
    transition: opacity 0.3s ease-in-out;
  }
`

const DropdownIntro = [
  {
    title: '공부방 소개',
    link: '/intro/place'
  },
  {
    title: '선생님 소개',
    link: '/intro/teacher'
  },
  {
    title: '오시는 길',
    link: '/intro/map'
  },
  {
    title: '후기',
    link: '/intro/review'
  }
]

const DropdownCurriculumn = [
  {
    title: '파닉스',
    link: '/curriculum/phonics'
  },
  {
    title: '리딩',
    link: '/curriculum/reading'
  },
]

const DropdownStudy = [
  {
    title: '시간표',
    link: '/study/table'
  },
  {
    title: '수강생 모집',
    link: '/study/recruit'
  }
]

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const pathname = usePathname()
  const currentPathNameRef = useRef(pathname)

  const [isDropdownVisible, setIsDropdownVisible] = useState({
    intro: false,
    curriculum: false,
    study: false
  })

  const handleDropdown = function(dropdownName: string, flag: boolean) {
    setIsDropdownVisible({
      ...isDropdownVisible,
      [dropdownName]: flag
    })
  }

  const closeDropdown = function() {
    setIsDropdownVisible({
      intro: false,
      curriculum: false,
      study: false
    })
  }

  const handleMenuClick = function() {
    setIsMenuVisible(!isMenuVisible)
  }

  const handleMenuClose = function() {
    setIsMenuVisible(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (currentPathNameRef.current !== pathname) {
      handleMenuClose()
      closeDropdown()
      currentPathNameRef.current = pathname
    }
  })

  return (
    <>
      <HeaderStyle>
        <div className="header">
          <Link href={"/"} className="header-home" />
          <div className="header-menu">
            <div className={ `header-toggle ${isMenuVisible ? 'close' : 'open' }` } onClick={handleMenuClick} />
            <div className="header-links">
              <div className="header-dropdown d-flex flex-column" onMouseOver={() => handleDropdown('intro', true)} onMouseOut={() => handleDropdown('intro', false)}>
                <div className='header-link'>
                  <div className="header-link-text">
                    소개 
                  </div>
                  <div className="arrow" />
                </div>
                {
                  isDropdownVisible.intro ? (
                    <HeaderDropdown list={DropdownIntro} />
                  ) :
                  null
                }
              </div>
              <div className="header-dropdown d-flex flex-column" onMouseOver={() => handleDropdown('curriculum', true)} onMouseOut={() => handleDropdown('curriculum', false)}>
                <div className='header-link'>
                  <div className="header-link-text">
                    커리큘럼
                  </div>
                  <div className="arrow" />
                </div>
                {
                  isDropdownVisible.curriculum ? (
                    <HeaderDropdown list={DropdownCurriculumn} />
                  ) :
                  null
                }
              </div>
              <div className="header-dropdown d-flex flex-column" onMouseOver={() => handleDropdown('study', true)} onMouseOut={() => handleDropdown('study', false)}>
                <div className='header-link'>
                  <div className="header-link-text">
                    수업
                  </div>
                  <div className="arrow" />
                </div>
                {
                  isDropdownVisible.study ? (
                    <HeaderDropdown list={DropdownStudy} />
                  ) :
                  null
                }
              </div>
              <Link href="/notice" className="header-link">
                <div className="header-link-text">
                  공지사항
                </div>
              </Link>
            </div>
          </div>
          { isMobile && 
            <div className={ `header-links-mobile ${isMenuVisible ? 'open' : 'hide'}` }>
              <div className="header-close" onClick={handleMenuClose}/>
              <div className="header-links">
                <div className="header-link">
                  <Link href="/intro">소개</Link>
                </div>
                <div className="header-link">
                  <Link href="/curriculum">커리큘럼</Link>
                </div>
                <div className="header-link">
                  <Link href="/study">수업</Link>
                </div>
                <div className="header-link">
                  <Link href="/notice">공지사항</Link>
                </div>
              </div>
            </div>
          }
        </div>
      </HeaderStyle>
      <Overlay className={ `${isMenuVisible ? 'visible' : ''}` } onClick={handleMenuClose}></Overlay>
    </>
  )
}