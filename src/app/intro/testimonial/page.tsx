'use client'

import styled from 'styled-components'

const TestimonialStyle = styled.div`
  --testimonial-item-width: 200px;
  --testimonial-item-height: 200px;
  --testimonial-item-margin-right: 12px;

  position: relative;
  white-space: nowrap;
  overflow: hidden;
  background: white;

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(var(--testimonial-item-width) * -9 - var(--testimonial-item-margin-right) * 8));
    }
  }

  &:hover {
    .testimonial-items {
      animation-play-state: paused;
    }
  }

  .testimonial-items {
    display: inline-block;
    animation: slide 20s linear infinite;

    .testimonial-item {
      display: inline-block;
      border: 1px solid black;
      width: var(--testimonial-item-width);
      height: var(--testimonial-item-height);
      margin-right: 12px;

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
    height: 100%;
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
    <>
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
    </>
  )
}