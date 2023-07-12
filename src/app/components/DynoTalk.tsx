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

  .dyno-talk-inquiry {
    display: none;
    position: relative;
    height: 120px;

    &.visible {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 0;
      width: 150px;
      bottom: 70px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 12px;

      .dyno-talk-relative {
        position: relative;
        padding: 12px;

        .dyno-talk-close {
          margin-left: auto;
          top: 12px;
          right: 12px;
          width: 12px;
          height: 12px;
          background-size: cover;
          background-image: url('/icon/icon-close.webp');
          cursor: pointer;
        }

        .dyno-talk-content {
          line-height: 1.5;
        }
      }
    }
  }
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
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
  }

  .dyno-talk-image {
    position: absolute;
    background-image: url('/icon/icon-question.webp');
    width: 60px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 55px 55px;
    background-position: center;
    transform: translate(4px, 6px);
    right: 0;
  }

  &.hover {
    width: 150px;
    border-radius: 18px;
    transition: width 0.2s ease-in-out;
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
  const [contentVisible, setContentVisible] = useState(false)
  let timer: NodeJS.Timeout | null = null

  const dynoTalkRef = useRef<HTMLDivElement>(null)

  const onClickDynoTalk = () => {
    setContentVisible(!contentVisible)
  }

  const handleMouseMove = (flag: boolean) => {
    if (flag) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      timer = setTimeout(() => {
        dynoTalkRef.current?.classList.add('hover')
        setTimeout(() => {
          setTalkVisible(true)
        }, 100)
      }, 100)
    } else {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      dynoTalkRef.current?.classList.remove('hover')
      setTalkVisible(false)
    }
  }

  // useEffect(() => {
  //   if (currentPathNameRef.current !== pathname) {
  //     setTalkVisible(false)
  //     handleMouseMove(false)
  //     currentPathNameRef.current = pathname
  //   }

  //   setTimeout(() => {
  //     if (currentPathNameRef.current === '/') {
  //       handleMouseMove(true)
  //     }
  //   }, 200)
  // }, [])

  return (
    <DynoTalkContainer className='dyno-talk-container'>
      <div className={ `dyno-talk-inquiry ${contentVisible ? 'visible': 'hide'}` }>
        <div className="dyno-talk-relative">
          <div className='dyno-talk-close' onClick={() => setContentVisible(false)} />
          <div className='dyno-talk-content'>
            <span>
              교육 상담 문의는
            </span><br />
            <span>
              여기로 주세요!
            </span>
          </div>
        </div>
      </div>
      <DynoTalkStyle
        ref={dynoTalkRef}
        onMouseEnter={() => handleMouseMove(true)}
        onMouseLeave={() => handleMouseMove(false)}
      >
        {
          talkVisible && (
            <div className='dyno-talk-text' onClick={() => onClickDynoTalk()}>
              교육 상담 문의
            </div>
          )
        }
        <div className='dyno-talk-image'></div>
      </DynoTalkStyle>
    </DynoTalkContainer>
  )
}