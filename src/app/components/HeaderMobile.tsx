import styled from 'styled-components'
import Link from 'next/link'

const HeaderMobileStyle = styled.header`
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
`

interface HeaderMobileProps {
  isMenuVisible: boolean,
  handleMenuClose: () => void,
}

export default function HeaderMobile({ isMenuVisible, handleMenuClose }: HeaderMobileProps ) {
  return (
    <HeaderMobileStyle>
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
    </HeaderMobileStyle>
  )
}