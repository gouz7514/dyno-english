'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const DynoTalkContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 18px;
  right: 18px;

  .dyno-talk-text {
    position: absolute;
    background-color: var(--primary-white);
    top: -80px;
    width: 140px;
    right: 0;
    padding: 12px;
    border-radius: 12px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: opacity 0.2s ease-in-out;
    text-align: center;

    &.visible {
      opacity: 1;
    }

    &.hide {
      opacity: 0;
    }
  }
`

const DynoTalkStyle = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 12px;
  width: 60px;
  height: 60px;

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
  const pathname = usePathname()
  const currentPathNameRef = useRef(pathname)
  const [talkVisible, setTalkVisible] = useState(false)

  const onClickDynoTalk = () => {
    setTalkVisible(!talkVisible)
  }

  useEffect(() => {
    if (currentPathNameRef.current !== pathname) {
      setTalkVisible(false)
      currentPathNameRef.current = pathname
    }
  }, [pathname])

  return (
    <DynoTalkContainer className='dyno-talk-container'>
      <div className={ `dyno-talk-text ${talkVisible ? 'visible': 'hide'}` }>
        <span>
          교육 상담 문의는
        </span><br />
        <span>
          여기로 주세요!
        </span>
      </div>
      <DynoTalkStyle onClick={onClickDynoTalk}>
        <div className='dyno-talk-image'></div>
      </DynoTalkStyle>
    </DynoTalkContainer>
  )
}