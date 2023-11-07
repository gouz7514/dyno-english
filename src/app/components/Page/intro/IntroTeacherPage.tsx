'use client'

import Image from "next/image"
import styled from "styled-components"

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import ImageProfilePicture from "../../../../../public/images/intro/teacher/dyno-profile-picture.webp"

SwiperCore.use([Pagination])

const IntroTeacherStyle = styled.div`
  width: 100%;
  max-width: 1024px;
  height: calc(100vh - var(--height-header) - var(--height-footer));
  padding: 24px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto;

  .profile-container {
    width: 100%;
    max-width: 400px;

    .profile-picture {
      border-radius: 12px;
    }

    @media screen and (max-width: 450px) {
      max-width: 400px;
    }
  }

  @media screen and (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }

  @media screen and (max-width: 450px) {
    justify-content: start;
  }
`

const IntroTeacherSwiper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;

  .swiper {
    position: relative;

    .swiper-slide {
      padding: 2px;
      border-radius: 12px;

      .swiper-teacher {
        position: relative;
        height: 512px;
        padding: 12px 18px;
        border-radius: 12px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        display: flex;
        gap: 12px;
        flex-direction: column;
        touch-action: pan-y;
        color: white;

        &.first {
          background: radial-gradient(at 90% 90%, rgb(255, 114, 58), rgb(255, 80, 110));
        }

        &.second {
          background: radial-gradient(ellipse farthest-corner at 90% 90%, #00e244, #00b48e);
        }

        &.third {
          background: radial-gradient(ellipse farthest-corner at 90% 90%, #882ef0, rgba(80, 115, 255, 0.8));
        }

        .swiper-title {
          font-size: 24px;
          font-weight: bold;
        }

        .swiper-content {
          font-size: 16px;
          word-break: keep-all;
          white-space: pre-line;

          p {
            margin-bottom: 12px;
            line-height: 1.5;
            font-weight: 500;
          }
        }
      }
    }
  }

  @media screen and (max-width: 850px) {
    height: 512px;
  }

  @media screen and (max-width: 450px) {
    max-width: 400px;
  }
`

export default function IntroTeacherPage() {
  return (
    <IntroTeacherStyle>
      <div className="profile-container">
        <Image
          src={ImageProfilePicture}
          className="profile-picture"
          alt="profile picture"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          placeholder="blur"
        />
      </div>
      <IntroTeacherSwiper className="intro-teacher-swiper">
        <Swiper
          className="profile-swiper"
          slidesPerView={1}
          spaceBetween={12}
          pagination={{
            clickable: true
          }}
          loop={true}
        >
          <SwiperSlide>
            <div className="swiper-teacher first">
              <div className="swiper-title">
                1. 미국 초 ・ 중학교 졸업
              </div>
              <div className="swiper-content">
                <p>
                  저는 초등학교 4학년 때 부모님과 함께 미국으로 갔습니다.
                </p>
                <p>
                  캘리포니아 주, Rancho Cucamonga 라는 작은 동네에서
                  John L. Golden Elementary School 과
                  Day Creek Intermediate School 을 졸업했어요.
                </p>
                <p>
                  미국 학교를 다니면서 경험하고 배운 것들을 늘 제 수업에 적용하고 학부모님과 나누고자 노력하고 있습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-teacher second">
              <div className="swiper-title">
                2. 영문학 전공 ・ 교직이수
              </div>
              <div className="swiper-content">
                <p>
                  저는 동국대학교에서 영어영문을 전공하고 교직 과정을 이수했습니다.
                </p>
                <p>
                  대학 생활을 하면서 전공 지식을 쌓는 것도 중요했지만,
                  무엇보다 값진 경험은 교육 봉사 활동이었어요.
                  교육 봉사를 하면서 저는 교육이 단지 지식을 전달하는 게 아니라는 걸 알게 되었습니다.
                </p>
                <p>
                  저에게 교육은 사람과 사람 간의 만남이었고,
                  이러한 만남을 통해 서로의 세계를 이해하고 나누며 더 넓혀갈 수 있다는 것을 배웠어요.
                </p>
                <p>
                  아이들은 저에게 가장 큰 자극과 에너지를 주는 존재입니다.
                </p>
                <p>
                  그리고 아이들에게도 늘 긍정적인 영향을 주는 선생님으로 남고 싶어요.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-teacher third">
              <div className="swiper-title">
                3. 다양하고 실질적인 경험
              </div>
              <div className="swiper-content">
                <p>
                  다이노 영어를 시작하기까지 긴 여정이 있었습니다.
                </p>
                <p>
                  대학을 졸업한 후, 임용 시험 준비부터 영어 유치원과 학원
                  그리고 사무직까지 다양한 경험을 했습니다.
                  돌고 돌아 결국 아이들을  가장 가까이서 만날 수 있는 일을 선택하게 되었지만,
                  그 경험들이 결코 헛된 것은 아니었어요.
                </p>
                <p>
                  임용 시험을 준비하면서 교육학적 지식을 더 심화시킬 수 있었고,
                  영어 유치원에서는 4세부터 7세까지 어린 아이들을 다루는 법을 배웠습니다.
                </p>
                <p>
                  학원에서는 초등학생뿐만 아니라 학교 내신과 수능 대비
                  수업까지 맡았으며, 교육 회사에서는 교재 및 온라인 콘텐츠를 제작하는 일을 배웠어요.
                </p>
                <p>
                  이렇게 다양한 현장에서의 경험을 토대로 저만의 가치가 녹아든
                  다이노 영어를 시작하게 되었습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </IntroTeacherSwiper>
    </IntroTeacherStyle>
  )
}