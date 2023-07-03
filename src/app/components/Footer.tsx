import styled from 'styled-components'

const FooterStyle = styled.footer`
  height: var(--height-footer);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 0px -1px 2px rgba(149, 157, 165, 0.2);
`

export default function Footer() {
  return (
    <FooterStyle>
      <div>다이노영어</div>
      <div>
        [신고번호 제하남102호]
      </div>
    </FooterStyle>
  )
}