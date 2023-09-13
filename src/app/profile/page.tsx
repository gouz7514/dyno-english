'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styled from 'styled-components'

import Skeleton from '@/app/components/Skeleton'
import CurriculumList from '@/app/components/Organism/CurriculumList'
import EmptyState from '@/app/components/Molecule/EmptyState'
import Callout from '@/app/components/Molecule/Callout'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'

import { convertDate } from '@/lib/utils/date'

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
      height: 400px !important;
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

    .simple-notice-content {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }

    .profile-class {
      width: 100%;

      .class-title {
        font-size: 1.2rem;
        margin: 12px 0;
      }

      .swiper-slide {
        padding: 0 12px;
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
        height: 400px;
        border-radius: 12px;
        padding: 12px;
      }

      .content-title {
        font-size: 1.2rem;
        font-weight: 700;
      }

      .content-inner {
        white-space: pre-line;
        word-break: keep-all;
        height: calc(100% - 44px);
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }
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
`

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedKid, setSelectedKid] = useState<string>(session?.user.kids[0].name as string)
  const [selectedClass, setSelectedClass] = useState<any>({})

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

  const onChangeKidName = (e: any) => {
    const selectedKid = session?.user.kids.find((kid: any) => kid.name === e.target.value)
    setSelectedKid(selectedKid?.name as string)
    if (selectedKid?.classId === '') {
      setSelectedClass({})
      return
    }
    const selectedClass = session?.classInfo.find((info: any) => info.id === selectedKid?.classId)
    setSelectedClass(selectedClass)
  }

  useEffect(() => {
    if (session?.user.kids.length) {
      const selectedKid = session?.user.kids.find((kid: any) => kid.name === session?.user.kids[0].name)
      setSelectedKid(selectedKid?.name as string)

      const selectedClass = session?.classInfo.find((info: any) => info.id === selectedKid?.classId)
      setSelectedClass(selectedClass)
    }
  }, [session])

  return (
    <ProfileStyle className='container'>
      {
        loading ? (
          <Skeleton height={400} />
        ) : (
          <div className='profile-container'>
            <div className="profile-title">
              <div className="profile-username">
                { session?.user.kids.length ? `${session?.user.kids.map(kid => kid.name).join(', ')} 학부모님` : `${session?.user.name} 님` }
              </div>
              <Link href='/profile/account' className='profile-setting' />
            </div>
            <Callout title='공지사항'>
              {
                session?.simpleNotice && (
                  session?.simpleNotice.map((notice, index) => (
                    <div key={index} className='simple-notice-content'>
                      { notice.content }
                    </div>
                  ))
                )
              }
            </Callout>
            {
              session?.user.kids.length && (
                <Fragment>
                  <DynoSelect value={selectedKid} onChange={onChangeKidName}>
                    {
                      session?.user.kids.map((kid: any, idx: number) => (
                        <option value={kid.name} key={idx}>
                          { kid.name }
                        </option>
                      ))
                    }
                  </DynoSelect>
                  {
                    Object.keys(selectedClass).length ? (
                      <div className="profile-class">
                        {
                          <Fragment>
                            <div className="class-title">
                              { selectedClass.name }
                            </div>
                            {
                              selectedClass.details && Object.keys(selectedClass.details).length === 0 ? (
                                <EmptyState
                                  mainText='등록된 수업 정보가 없습니다.'
                                  size='medium'
                                />
                              ) : (
                                <Swiper
                                  slidesPerView={1}
                                  pagination={{ clickable: true }}
                                  initialSlide={selectedClass ? Object.keys(selectedClass).length - 1 : 0}
                                >
                                  {
                                    Object.keys(selectedClass).length && (
                                      Object.entries(selectedClass.details).map(([key, value]: [string, any]) => (
                                        <SwiperSlide key={key} className='class-info'>
                                          <div className="class-notice">
                                            <div className='content-title'>
                                              { convertDate(key) } 수업내용
                                            </div>
                                            <div className='content-inner'>
                                              { value.notice }
                                            </div>
                                          </div>
                                          <div className="class-homework">
                                            <div className='content-title'>
                                            { convertDate(key) } 숙제
                                            </div>
                                            <div className='content-inner'>
                                              { value.homework }
                                            </div>
                                          </div>
                                        </SwiperSlide>
                                      ))
                                    )
                                  }
                                </Swiper>
                              )
                            }
                          </Fragment>
                        }
                        <div className="class-curriculum-container">
                          <div className='class-curriculum-header'>커리큘럼</div>
                          {
                            selectedClass.curriculum && (
                              <div>
                                {
                                  Object.entries(selectedClass.curriculum).map(([key, value]: [string, any]) => (
                                    (
                                      key === 'curriculum' && (
                                        value.months?.month.map((month: any, index: any) => (
                                          <CurriculumList
                                            key={index}
                                            idx={index}
                                            month={month}
                                          />
                                        ))
                                      )
                                    )
                                  ))
                                }
                              </div>  
                            )
                          }
                        </div>
                      </div>
                    ) : (
                      <EmptyState
                        mainText='등록된 수업이 없습니다.'
                        subText='다이노 선생님이 수업을 등록할 때까지 기다려주세요.'
                        size='medium'
                      />
                    )
                  }
                </Fragment>
              )
            }
          </div>
        )
      }
    </ProfileStyle>
  )
}