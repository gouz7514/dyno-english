import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderStyle = styled.header`
  background-color: var(--primary-green);
  color: #fff;
  padding: 1rem;
  display: flex;
  height: var(--height-header);
  position: relative;
  z-index: 10;

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
        gap: 12px;

        .header-link {
          cursor: pointer;
          background-color: var(--primary-yellow);
          padding: 12px;
          position: relative;
          transform: scale(0.95);

          &:hover {
            transform: scale(0.92);
          }

          .header-link-text {
            font-size: 20px;
            font-weight: bold;
            color: white;

            &:before {
              content: '';
              position: absolute;
              bottom: -4px;
              height: 4px;
              width: 100%;
              left: 2px;
              transform: skewX(45deg);
              background-color: #E2B537;
            }

            &:after {
              content: '';
              position: absolute;
              right: -4px;
              height: 100%;
              width: 4px;
              bottom: -2px;
              transform: skewY(45deg);
              background-color: #E2B537;
            }
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

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const pathname = usePathname()
  const currentPathNameRef = useRef(pathname)

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
              <Link href="/intro" className="header-link">
                <div className="header-link-text">
                  소개
                </div>
              </Link>
              <Link href="/curriculum" className="header-link">
                <div className="header-link-text">
                  커리큘럼
                </div>
              </Link>
              <Link href="/study" className="header-link">
                <div className="header-link-text">
                  수업
                </div>
              </Link>
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