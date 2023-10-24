import styled from 'styled-components'

import { kakaoConsult } from '@/lib/utils/kakao'

const DynoTalkStyle = styled.button`
  outline: none;
  border: none;
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 18px;
  right: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 12px;
  width: 60px;
  height: 60px;
  background-color: var(--primary-white);
  cursor: pointer;

  .dyno-talk-image {
    background-image: url('/images/image-dyno.webp');
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
  }

  &:hover {
    transform: scale(1.05);
  }
`

export default function DynoTalk() {
  return (
    <DynoTalkStyle onClick={kakaoConsult}>
      <div className="dyno-talk-image"></div>
    </DynoTalkStyle>
  )
}