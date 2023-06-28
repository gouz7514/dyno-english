import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import HeaderDropdown from './HeaderDropdown'
import HeaderMobile from './HeaderMobile'

import { DropdownIntro, DropdownCurriculumn, DropdownStudy } from '@/lib/constants/constatns'

const HeaderStyle = styled.header`
  color: #fff;
  padding: 1rem;
  display: flex;
  height: var(--height-header);
  position: relative;
  z-index: 10;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 3px 12px;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: calc(var(--height-header) - 2rem);
    color: black;
    font-weight: bold;

    .header-home {
      margin-right: auto;
      background-image: url('/logo/logo_dyno_english.webp');
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
        background-image: url('/images/image-dyno-egg.webp');
        width: 50px;
        height: 50px;
        background-size: 50px 50px;

        @media screen and (max-width: 600px) {
          display: block;
        }
      }

      .header-links {
        display: flex;
        gap: 40px;

        .header-link {
          cursor: pointer;
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
                  {/* <div className="arrow" /> */}
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
                  {/* <div className="arrow" /> */}
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
                  {/* <div className="arrow" /> */}
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
            <HeaderMobile isMenuVisible={isMenuVisible} handleMenuClose={handleMenuClose} />
          }
        </div>
      </HeaderStyle>
      <Overlay className={ `${isMenuVisible ? 'visible' : ''}` } onClick={handleMenuClose}></Overlay>
    </>
  )
}