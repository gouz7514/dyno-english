'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

const DynoTalkContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 18px;
  right: 24px;
  z-index: 11;
`

const DynoTalkStyle = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 60px;
  height: 60px;
  background-color: var(--primary-background-color);
  cursor: pointer;
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  transition: width 0.2s ease-in-out;
  display: flex;
  align-items: center;

  .dyno-talk-text {
    position: absolute;
    left: 12px;
    font-size: 14px;
  }

  .dyno-talk-image {
    position: absolute;
    background-image: url('/icon/icon-question-4.png');
    width: 60px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 55px 55px;
    background-position: center;
    transform: translate(4px, 6px);
    right: 0;
  }

  &:hover {
    width: 150px;
    border-radius: 18px;
    transition: width 0.2s ease-in-out;
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
      {/* <div className={ `dyno-talk-text ${talkVisible ? 'visible': 'hide'}` }>
        <span>
          교육 상담 문의는
        </span><br />
        <span>
          여기로 주세요!
        </span>
      </div> */}
      <DynoTalkStyle onMouseEnter = {() => setTimeout(() => setTalkVisible(true), 100)} onMouseLeave={() => setTalkVisible(false)}>
        {
          talkVisible && (
            <div className='dyno-talk-text'>
              교육 상담 문의
            </div>
          )
        }
        <div className='dyno-talk-image'></div>
      </DynoTalkStyle>
    </DynoTalkContainer>
  )
}