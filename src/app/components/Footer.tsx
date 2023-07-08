import styled from 'styled-components'

const FooterStyle = styled.footer`
  height: var(--height-footer);
  width: 100%;
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
      color: #343434;
      opacity: 0.7;
      font-size: 12px;
    }
  }
`

export default function Footer() {
  return (
    <FooterStyle>
      <div className="footer">
        <div className="footer-text">
            신고번호 제하남102호
        </div>
      </div>
    </FooterStyle>
  )
}