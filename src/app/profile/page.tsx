'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styled from 'styled-components'

import Skeleton from '../components/Skeleton'
import CurriculumMonth from '../components/CurriculumMonth'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Pagination])

const ProfileStyle = styled.div`
  padding: 24px 12px 0;

  .swiper {
    height: 650px !important;

    @media screen and (min-width: 600px) {
      height: 350px !important;
    }
  }

  .profile-container {
    .profile-title {
      display: flex;
      margin-bottom: 12px;

      .profile-username {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .profile-setting {
        margin-left: auto;
        width: 28px;
        height: 28px;
        background-size: cover;
        background-image: url('/icon/icon-setting.webp');
        cursor: pointer;
      }
    }

    .profile-class {
      width: 100%;

      .class-title {
        font-size: 1.2rem;
        margin-bottom: 12px;
      }

      .class-info {
        display: flex;
        gap: 12px;
        width: 100%;

        @media screen and (max-width: 600px) {
          flex-direction: column;
        }
      }

      .class-notice,
      .class-homework {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        width: 100%;
        height: 300px;
        border-radius: 12px;
        padding: 12px;
      }

      .class-notice {
        background-color: rgba(48, 166, 128, 0.6);
      }

      .class-homework {
        background-color: rgba(255, 203, 28, 0.65);
      }

      .class-curriculum-container {
        margin-top: 24px;

        .class-curriculum-header {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
      }
    }
  }

  .empty-container {
    background-color: #eee;
    height: 400px;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .empty-container-img {
      width: 100px;
      height: 100px;
      background-size: 100px 100px;
      background-image: url('/images/image-dyno.webp');
      margin-bottom: 12px;
    }

    .empty-text {
      text-align: center;
      line-height: 1.5;
    }
  }
`

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false)

      if (!session || !session?.user) {
        alert('로그인 후 이용해주세요!')
        router.push('/login')
        return
      }
    }
  }, [session, router, status])

  const convertDate = function(date: string) {
    const [_year, month, day] = date.split('-')

    return `${month}월 ${day}일`
  }

  const onClickToggle = function(curriculumRef: React.RefObject<HTMLDivElement>) {
    if (!curriculumRef.current) return
    curriculumRef.current.classList.toggle('show')
  }

  return (
    <ProfileStyle className='container'>
      {
        loading ? (
          <Skeleton height={400} />
        ) : (
          <div className='profile-container'>
            <div className="profile-title">
              <div className="profile-username">
                { session?.user.kidName ? `${session?.user.kidName} 학부모님` : `${session?.user.name} 님` }
              </div>
              <Link href='/profile/account' className='profile-setting' />
            </div>
            {
              session?.classInfo.name !== null ? (
                <div className="profile-class">
                  {
                    <>
                      <div className="class-title">
                        {session?.classInfo.name}
                      </div>
                      <Swiper
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        initialSlide={session?.classDetails ? Object.keys(session?.classDetails).length - 1 : 0}
                      >
                        {
                          session?.classDetails && (
                            Object.entries(session?.classDetails).map(([key, value]) => (
                              <SwiperSlide key={key} className='class-info'>
                                <div className="class-notice">
                                  <div>
                                    { convertDate(key) } 수업내용
                                  </div>
                                  <div>
                                    { value.notice }
                                  </div>
                                </div>
                                <div className="class-homework">
                                  <div>
                                  { convertDate(key) } 숙제
                                  </div>
                                  <div>
                                    { value.homework }
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))
                          )
                        }
                      </Swiper>
                    </>
                  }
                  <div className="class-curriculum-container">
                    <div className='class-curriculum-header'>커리큘럼</div>
                    {
                      session?.classInfo.curriculum && (
                        <div>
                          {
                            session?.classInfo.curriculum?.months?.month.map((month) => (
                              <CurriculumMonth
                                key={month.id}
                                month={month}
                                onClickToggle={onClickToggle}
                              />
                            ))
                          }
                        </div>  
                      )
                    }
                  </div>
                </div>
              ) : (
                <div className='empty-container'>
                  <div className="empty-container-img"></div>
                  <div className="empty-text">
                    <div>
                      등록된 수업 정보가 없습니다.
                    </div>
                    <div>
                      다이앤 선생님이 수업을 등록하시면 수업 정보를 확인하실 수 있습니다.
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </ProfileStyle>
  )
}