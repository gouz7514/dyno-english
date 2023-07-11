'use client'

import { useState, useEffect } from 'react'
import { rdb } from '@/firebase/config'
import { collection, getDocs } from "firebase/firestore"
import { getDatabase, ref, onValue } from "firebase/database"

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
          line-height: 1.3;
          font-weight: 500;
          font-size: 18px;
          word-break: keep-all;
          white-space: pre-line;
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

  // TODO : 모든 문서 가져오는 방식이 아닌 단일 문서 가져오는 방식으로 바꾸기
  // useEffect(() => {
  //   const getTestimonials = async () => {
  //     const querySnapshot = await getDocs(collection(db, "testimonials"))
  //     const testimonials: Testimonial[] = querySnapshot.docs.map((doc) => ({
  //       ...doc.data()
  //     })) as Testimonial[]
  //     setTestimonials(testimonials)
  //     setLoading(false)
  //   }

  //   getTestimonials()
  // }, [])

  useEffect(() => {
    const getTestimonials = async () => {
      const postsRef = ref(rdb, 'testimonials')

      onValue(postsRef, (snapshot) => {
        const data = snapshot.val()
        const testimonials: Testimonial[] = Object.keys(data).map((key) => ({
          ...data[key]
        })) as Testimonial[]
        setTestimonials(testimonials)
        setLoading(false)
      })
    }
    getTestimonials()
  }, [])

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