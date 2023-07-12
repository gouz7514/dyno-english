'use client'

import { useState, useEffect } from "react"

import { ArticleStyle } from "@/app/styles/styles"
import Image from 'next/image'
import Divider from "@/app/components/Divider"

import { CurriculumReading } from "@/lib/constants/constatns"

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {  Pagination } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import styled from 'styled-components'

SwiperCore.use([Pagination])

const SwiperStyleRoot = styled.div`
  .swiper {
    height: 400px;
    width: 100%;
    max-width: 600px;
    position: relative;
    margin-top: 12px;
    padding-bottom: 24px;

    .swiper-pagination {
      position: absolute;
      bottom: 0;
      height: 24px;
    }
  }
`

export default function CurriculmReading() {
  const [swiperCnt, setSwiperCnt] = useState<number>(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSwiperCnt(1)
      } else {
        setSwiperCnt(1.5)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ArticleStyle>
      <div className="container">
        <div className="article-title">
          [수업 안내] 원서리딩 (AR 1.0~1.5) 
        </div>
        <div className="article-content">
          <p>
            안녕하세요,
          </p>
          <p>
            다이노 영어입니다.
          </p>
          <br />
          <p>
            원서리딩
          </p>
          <p>
            AR 1.0 ~ 1.5 
          </p>
          <p>
            레벨 수업은
          </p>
          <p>
            파닉스 과정을 마친 후
          </p>
          <p>
            리딩을 처음 시작하는
          </p>
          <p>
            7세 ~ 초등 저학년
          </p>
          <p>
            아이들에게 적합합니다.
          </p>
          <br />
          <p>
            정원 4명
          </p>
          <p>
            주 2회 60분
          </p>
          <p>
            월 17만원
          </p>
          <p>
            수업입니다.
          </p>
          <br />
          <p>
            Elephant & Piggie 시리즈
          </p>
          <p>
            총 24권을 
          </p>
          <p>
            6개월 동안 학습합니다.
          </p>
          <br />
          <p>
            원서 리딩 수업은
          </p>
          <p>
            직접 제작한 학습자료로
          </p>
          <p>
            수업을 진행합니다.
          </p>
          <br />
          <p>
            원서 준비는
          </p>
          <p>
            필수가 아니지만,
          </p>
          <br />
          <p>
            준비해주시면
          </p>
          <p>
            아이들이 책을 넘기며
          </p>
          <p>
            읽는 재미를 느끼고,
          </p>
          <p>
            숙제를 할 때
          </p>
          <p>
            더 편리할 수 있습니다.
          </p>
          <Image
            src="/images/curriculum/image-dyno-curriculum-reading-1.webp"
            alt="커리큘럼 리딩 이미지 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', margin: '24px 0' }}
          />
          <Divider />
          <div className="article-section">
            <div className="section-title">
              <div className="section-title-text">
                샘플 레슨
              </div>
              <SwiperStyleRoot>
                <Swiper
                  slidesPerView={swiperCnt}
                  pagination={{ clickable: true }}
                  spaceBetween={12}
                >
                  {
                    CurriculumReading.filter(item => item.section === 2).map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
          </div>
          <Divider />
          <div className="article-section">
            <div className="section-title">
              <div className="section-title-text">
                커리큘럼
              </div>
              <SwiperStyleRoot>
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  spaceBetween={12}
                >
                  {
                    CurriculumReading.filter(item => item.section === 3).map((item, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: '100%', height: '90%' }}
                        />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </SwiperStyleRoot>
            </div>
          </div>
        </div>
      </div>
    </ArticleStyle>
  )
}