'use client'

import styled from 'styled-components'

const TesitmonialPage = styled.div`
  padding: 12px;
  height: calc(100vh - var(--height-header) - var(--height-footer));

  .title {
    margin-bottom: 24px;
  }

  .title-text {
    font-size: 16px;
  }
`

const TestimonialStyle = styled.div`
  --testimonial-item-width: 200px;
  --testimonial-item-height: 200px;
  --testimonial-item-margin-right: 12px;
  --animation-duration: 40s;

  position: relative;
  white-space: nowrap;
  overflow: hidden;
  background: white;
  padding: 12px 0;

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(var(--testimonial-item-width) * -9 - var(--testimonial-item-margin-right) * 8));
    }
  }

  @keyframes slide2 {
    from {
      transform: translateX(-100px);
    }
    to {
      transform: translateX(calc(var(--testimonial-item-width) * -9 - var(--testimonial-item-margin-right) * 8 - 100px));
    }
  }

  .testimonial-items {
    display: inline-block;
    animation: slide var(--animation-duration) linear infinite;

    &.second {
      animation: slide2 var(--animation-duration) linear infinite;
    }

    .testimonial-item {
      display: inline-block;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      width: var(--testimonial-item-width);
      height: var(--testimonial-item-height);
      margin-right: 12px;
      border-radius: 12px;

      .testimonial-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    width: 120px;
    height: 240px;
    content: '';
    z-index: 2;
  }

  &:before {
    left: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
  }

  &:after {
    right: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
  }
`

export default function IntroTestimonial() {
  return (
    <TesitmonialPage>
      <div>
        <div className="title">
          <h1>후기</h1>
        </div>
        <div className='title-text'>
          다이노 영어의 소중한 후기를 소개합니다!
        </div>
      </div>
      <div className='d-flex flex-column'>
        <TestimonialStyle>
          <div className="testimonial-items">
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 1
              </div>
            </div>
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 2
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 3
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 4
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 5
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 6
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 7
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 8
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 9
              </div>
            </div>
          </div>
          <div className="testimonial-items">
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 1
              </div>
            </div>
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 2
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 3
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 4
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 5
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 6
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 7
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 8
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 9
              </div>
            </div>
          </div>
        </TestimonialStyle>
        <TestimonialStyle>
          <div className="testimonial-items second">
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 1
              </div>
            </div>
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 2
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 3
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 4
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 5
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 6
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 7
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 8
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 9
              </div>
            </div>
          </div>
          <div className="testimonial-items second">
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 1
              </div>
            </div>
            <div className='testimonial-item'>
              <div className="testimonial-content">
                후기 2
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 3
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 4
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 5
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 6
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 7
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 8
              </div>
            </div><div className='testimonial-item'>
              <div className="testimonial-content">
                후기 9
              </div>
            </div>
          </div>
        </TestimonialStyle>
      </div>
    </TesitmonialPage>
  )
}