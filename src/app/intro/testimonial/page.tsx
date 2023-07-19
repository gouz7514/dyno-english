'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import { rdb } from '@/firebase/config'
import { ref, onValue } from "firebase/database"

import styled from 'styled-components'

import Skeleton from '@/app/components/Skeleton'
import Button from '@/app/components/Button'
import { TestimonialProps } from '@/types/types'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Pagination, Autoplay])

const TesitmonialPage = styled.div`
  padding: 24px;
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
  margin: 0 auto;
  max-width: 1024px;

  .title {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
    justify-content: center;

    .title-text {
      font-size: 24px;
      font-weight: 600;

      @media screen and (max-width: 600px) {
        font-size: 18px;
      }
    }
  }
`

const TestimonialSwiper = styled.div`
  .swiper {
    position: relative;
    padding-bottom: 36px;

    .swiper-slide {
      padding: 4px;

      .testimonial-item {
        height: 500px;
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
          white-space: pre-line;

          @media screen and (max-width: 600px) {
            font-size: 14px
          }
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

    .swiper-pagination {
      padding-top: 12px;
    }
  }
`

export default function IntroTestimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [swiperCnt, setSwiperCnt] = useState<number>(1)
  const { data: session, status } = useSession()
  
  const router = useRouter()

  const onClickTestimonialFromBtn = () => {
    if (status !== 'loading') {
      if (!session || !session?.user) {
        alert('로그인 후 이용해주세요!')
        router.push('/')
      }
    }
  }

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsRef = ref(rdb, 'testimonials')

      onValue(testimonialsRef, (snapshot) => {
        const data = snapshot.val()
        const testimonials: TestimonialProps[] = Object.keys(data).map((key) => ({
          ...data[key]
        })) as TestimonialProps[]
        setTestimonials(testimonials)
        setLoading(false)
      }), {
        onlyOnce: true
      }
    }
    getTestimonials()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSwiperCnt(1)
      } else {
        setSwiperCnt(2)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <TesitmonialPage>
      <div className='title'>
        <div className="title-text">
          다이노 영어의 소중한 후기를 소개합니다!
        </div>
      </div>
      <Button onClick={onClickTestimonialFromBtn} size='medium'>
        <div>
          후기 작성하기
        </div>
      </Button>
      <div className="spacing"></div>
      <div>
        {
          loading ? (
            <Skeleton height={300} />
          ) :
          (
            <TestimonialSwiper>
              <Swiper
                slidesPerView={swiperCnt}
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
                          { testimonial.content.replaceAll('/n', '\n') }
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