import styled from 'styled-components'

const FooterStyle = styled.footer`
  height: var(--height-footer);
  width: 100%;
  box-shadow: 0px -1px 2px rgba(149, 157, 165, 0.2);
  background-color: var(--primary-background-color);
  z-index: 101;

  .footer {
    height: 100%;
    display: flex;
    justify-content: center;

    .footer-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  
      .footer-main {
        font-weight: bold;
        margin-bottom: 6px;
      }
    }
  }
`

export default function Footer() {
  return (
    <FooterStyle>
      <div className="footer">
        <div className="footer-text">
          <div className="footer-main">
            다이노영어
          </div>
          <div className="footer-sub">
            [신고번호 제하남102호]
          </div>
        </div>
      </div>
    </FooterStyle>
  )
}