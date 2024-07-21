'use client'

import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import HeaderDropdown from './HeaderDropdown'
import HeaderMobile from './HeaderMobile'

import { DropdownIntro, DropdownCurriculumn, DropdownStudy } from '@/lib/constants/constatns'

const HeaderStyle = styled.header`
  color: #fff;
  display: flex;
  height: var(--height-header);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 3px 12px;

  position: sticky;
  top: 0;
  background-color: var(--primary-background-color);
  width: 100%;
  z-index: 101;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    color: black;
    font-weight: bold;
    padding: 0 24px;

    .header-home {
      margin-right: auto;
      z-index: 2;
      width: 50px;
      height: 50px;

      .header-home-logo {
        background-image: url('/images/image-dyno.webp');
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 50px 50px;
        border-bottom-left-radius: 50%;
      }
    }

    .header-menu {
      display: flex;
      align-items: center;
      height: 100%;

      .header-toggle {
        display: none;
        cursor: pointer;
        background-image: url('/icon/icon-menu.svg');
        width: var(--header-icon-size);
        height: var(--header-icon-size);
        background-size: var(--header-icon-size) var(--header-icon-size);

        @media screen and (max-width: 600px) {
          display: block;
        }
      }

      .header-links {
        display: flex;
        gap: 30px;
        height: 100%;
        align-items: center;

        .header-dropdown {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

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

      .btn-profile {
        cursor: pointer;
        width: 25px;
        height: 25px;
        background-size: 25px 25px;
        background-image: url('/icon/icon-profile.webp');
        background-repeat: no-repeat;
        margin-left: 24px;

        @media screen and (max-width: 600px) {
          margin-left: 12px;
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
  z-index: 102;

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
  const { data: session, status } = useSession()

  const router = useRouter()

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

  const onClickProfile = function() {
    if (status !== 'loading') {
      if (!session || !session?.user) {
        router.push('/login')
      } else {
        router.push('/profile')
      }
    }
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
          <Link href={"/"} className='header-home'>
            <div className="header-home-logo" />
          </Link>
          <div className="header-menu">
            <div className={ `header-toggle ${isMenuVisible ? 'close' : 'open' }` } onClick={handleMenuClick} />
            <div className="header-links">
              <div className="header-dropdown d-flex flex-column" onMouseOver={() => handleDropdown('intro', true)} onMouseOut={() => handleDropdown('intro', false)}>
                <div className='header-link'>
                  <div className="header-link-text">
                    소개 
                  </div>
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
            <div className='btn-profile' onClick={onClickProfile} />
          </div>
        </div>
      </HeaderStyle>
      { (isMobile) && 
        <HeaderMobile isMenuVisible={isMenuVisible} handleMenuClose={handleMenuClose} />
      }
      <Overlay className={ `${isMenuVisible ? 'visible' : ''}` } onClick={handleMenuClose}></Overlay>
    </>
  )
}