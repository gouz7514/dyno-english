'use client'

import { useState, useEffect } from 'react'
import { db } from '@/firebase/config'
import { collection, getDocs } from "firebase/firestore"

import styled from 'styled-components'

import Skeleton from '@/app/components/Skeleton'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Pagination, Autoplay])

const TesitmonialPage = styled.div`
  padding: 16px;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));

  .title {
    margin-bottom: 24px;
  }

  .title-text {
    font-size: 16px;
  }
`

const TestimonialStyle = styled.div<{ $length?: number }>`
  --testimonial-item-width: 400px;
  --testimonial-item-height: 300px;
  --testimonial-item-margin-right: 12px;
  --animation-duration: 40s;

  position: relative;
  white-space: nowrap;
  overflow: hidden;
  background: white;
  padding: 16px 0;

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(var(--testimonial-item-width) * calc(0 - ${props => props.$length}) - var(--testimonial-item-margin-right) * calc(1 + ${props => props.$length})));
    }
  }

  @keyframes slide2 {
    from {
      transform: translateX(-100px);
    }
    to {
      transform: translateX(calc(var(--testimonial-item-width) * calc(0 - ${props => props.$length}) - var(--testimonial-item-margin-right) * calc(0 - ${props => props.$length}) - 100px));
    }
  }

  .testimonial-items {
    display: inline-flex;
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
      position: relative;

      .testimonial-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: pre-wrap;
        text-align: center;
        padding: 8px;
        line-height: 1.5;
        word-break: keep-all;
      }

      .testimonial-by {
        position: absolute;
        bottom: 24px;
        left: 24px;
        color: var(--primary-green);
        font-weight: 500;
        font-size: 14px;
      }
    }
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    width: 30px;
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

const TestimonialSwiper = styled.div`
  display: flex;
  padding: 0 12px;

  .swiper {
    position: relative;
    margin-top: 12px;
    padding-bottom: 24px;

    .swiper-slide {
      padding: 12px 16px;

      .testimonial-item {
        height: 300px;
        border-radius: 12px;
        padding: 24px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media screen and (max-width: 600px) {
          height: 400px;
        }

        .testimonial-content {
          line-height: 1.5;
          font-weight: 500;
          font-size: 18px;
          word-break: keep-all;
        }

        .testimonial-by {
          bottom: 24px;
          left: 24px;
          font-size: 16px;
          font-weight: 500;
          margin-top: 40px;
          color: var(--primary-green);
        }
      }
    }

    .swiper-pagination-bullet {
      background-color: var(--primary-green);
    }
  }
`

export default function IntroTestimonial() {
  type Testimonial = {
    content: string,
    by: string
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getTestimonials = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonials"))
      const testimonials: Testimonial[] = querySnapshot.docs.map((doc) => ({
        ...doc.data()
      })) as Testimonial[]
      setTestimonials(testimonials)
      setLoading(false)
    }

    getTestimonials()
  }, [testimonials])

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
        <h2>시안 1</h2>
        {
          loading ? (
            <Skeleton height={300} />
          ) :
          (
            <TestimonialStyle $length={testimonials.length}>
              <div className="testimonial-items">
                {
                  testimonials.map((testimonial, index) => (
                    <div key={index} className='testimonial-item'>
                      <div className="testimonial-content">
                        {testimonial.content}
                      </div>
                      <div className="testimonial-by">
                        - {testimonial.by}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="testimonial-items">
                {
                  testimonials.map((testimonial, index) => (
                    <div key={index} className='testimonial-item'>
                      <div className="testimonial-content">
                        {testimonial.content}
                      </div>
                      <div className="testimonial-by">
                        {testimonial.by}
                      </div>
                    </div>
                  ))
                }
              </div>
            </TestimonialStyle>
          )
        }
      </div>
      <div className='d-flex flex-column'>
        <h2>시안 2</h2>
        {
          loading ? (
            <Skeleton height={300} />
          ) :
          (
            <TestimonialSwiper>
              <Swiper
                slidesPerView={1}
                spaceBetween={12}
                pagination={{
                  clickable: true
                }}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
                }}
              >
                {
                  testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                      <div className='testimonial-item'>
                        
                        <div className="testimonial-content">
                          {testimonial.content}
                        </div>
                        <div className="testimonial-by">
                          - {testimonial.by}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </TestimonialSwiper>
          )
        }
      </div>
    </TesitmonialPage>
  )
}