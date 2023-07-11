'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {  Pagination } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import styled from 'styled-components'

SwiperCore.use([Pagination])

const SwiperStyleRoot = styled.div`
  display: flex;
  height: calc(100vh - var(--height-header) - var(--height-footer));
  min-height: calc(100vh - var(--height-header) - var(--height-footer));
  position: relative;

  .swiper {
    height: 500px;
    position: relative;
    position: relative;
    padding-top: 24px;
    margin-top: 24px;

    .swiper-pagination {
      position: absolute;
      bottom: 0 !important;
      top: 0 !important;
      width: 100% !important;
      height: 24px;
      margin: 0 auto !important;

      &-bullet {
        background-color: var(--primary-green);
      }
    }
  }

  .swiper-slide {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 600px) {
      // height: 75%;
      justify-content: flex-start;
    }

    .swiper-image {
      display: flex;
      justify-content: center;
      text-align: center;
      height: 400px;
      gap: 8px;
      margin: 0 auto;

      @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: center;
      }

      img {
        position: relative !important;
        max-width: 400px !important;
        max-height: 400px !important;
        margin: 0 auto;

        &:not(.img-flex) {
          @media screen and (max-width: 600px) {
            max-width: 300px !important;
            max-height: 300px !important;
          }
        }

        &.img-flex {
          max-width: 350px !important;
          max-height: 350px !important;
          position: relative !important;
          margin: 0 auto !important;

          @media screen and (max-width: 600px) {
            max-width: 200px !important;
            max-height: 200px !important;
          }
        }
      }
    }

    .swiper-text {
      position: absolute;
      bottom: 0;
      width: 100%;
      margin-bottom: 12px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;

      @media screen and (max-width: 600px) {
        font-size: 16px;
      }
    }
  }
`

export default function IntroMapDetail() {
  return (
    <SwiperStyleRoot>
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-1.webp"
              alt="다이노 영어 찾아오는 길 1"
              fill
            />
          </div>
          <div className="swiper-text">
            1) 미사중앙초등학교 정문 앞
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              className='img-flex'
              src="/images/intro/image-dyno-english-map-2-1.webp"
              alt="다이노 영어 찾아오는 길 2-1"
              fill
            />
            <Image
              className='img-flex'
              src="/images/intro/image-dyno-english-map-2-2.webp"
              alt="다이노 영어 찾아오는 길 2-2"
              fill
            />
          </div>
          <div className="swiper-text">
            2) 왼쪽 횡단보도 건너기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-3.webp"
              alt="다이노 영어 찾아오는 길 3"
              fill
            />
          </div>
          <div className="swiper-text">
            3) 이디야 커피 방향으로 쭉 걷기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-4.webp"
              alt="다이노 영어 찾아오는 길 4"
              fill
            />
          </div>
          <div className="swiper-text">
            4) 마카롱 가게에서 오른쪽으로 돌기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-5.webp"
              alt="다이노 영어 찾아오는 길 5"
              fill
            />
          </div>
          <div className="swiper-text">
            5) 쭉 걸어 건물 3개 지나가기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-6.webp"
              alt="다이노 영어 찾아오는 길 6"
              fill
            />
          </div>
          <div className="swiper-text">
            6) 노란색 어닝이 있는 신발 가게가 보이면 멈추기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-7.webp"
              alt="다이노 영어 찾아오는 길 7"
              fill
            />
          </div>
          <div className="swiper-text">
            7) 다이노 영어 간판 확인하기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-8.webp"
              alt="다이노 영어 찾아오는 길 8"
              fill
            />
          </div>
          <div className="swiper-text">
            8) 간판 아래 안쪽으로 들어가기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-9.webp"
              alt="다이노 영어 찾아오는 길 9"
              fill
            />
          </div>
          <div className="swiper-text">
            { '9) 공동현관 "202호+종" 누르기' }
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              className='img-flex'
              src="/images/intro/image-dyno-english-map-10-1.webp"
              alt="다이노 영어 찾아오는 길 10-1"
              fill
            />
            <Image
              className='img-flex'
              src="/images/intro/image-dyno-english-map-10-2.webp"
              alt="다이노 영어 찾아오는 길 10-2"
              fill
            />
          </div>
          <div className="swiper-text">
            10) 엘레베이터 또는 계단 이용해서 2층으로 올라가기
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-image">
            <Image
              src="/images/intro/image-dyno-english-map-11.webp"
              alt="다이노 영어 찾아오는 길 11"
              fill
            />
          </div>
          <div className="swiper-text">
            11) 우측으로 돌아 202호 초인종 누르기
          </div>
        </SwiperSlide>
      </Swiper>
    </SwiperStyleRoot>
  )
}