'use client'

import styled from 'styled-components'
import { useEffect, useState } from "react"

import { db } from "@/firebase/config"
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import EmptyState from '@/app/components/Molecule/EmptyState'
import ImageButton from '@/app/components/Atom/Button/ImageButton'
import Button from '@/app/components/Button'
import Modal from '@/app/components/Organism/Modal'
import Input from '@/app/components/Atom/Input/Input'

import { convertDate } from '@/lib/utils/date'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Pagination, Navigation])

const ClassDetailStyle = styled.div`
  max-width: 1024px;
  padding: 24px 12px;

  .class-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }

  section {
    margin-bottom: 24px;

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;

      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    .form-container {
      padding: 24px;
      border-radius: 12px;
      background-color: #fff;
      width: 100%;
      max-width: 500px;

      .form-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 12px;

        textarea {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 12px;
          outline: none;
        }

        .button-container {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      }
    }
  }
`

const SwiperStyle = styled.div`
  .swiper {
    height: 300px;
    margin: 12px 0;

    .swiper-item {
      background-color: rgba(48, 166, 128, 0.6);
      border-radius: 12px;
      padding: 24px;

      .swiper-item-header {
        display: flex;
        justify-content: space-between;

        .swiper-btn-container {
          display: flex;
          gap: 8px;
        }
      }

      .swiper-date {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .swiper-content {
        font-size: 1rem;
        font-weight: 400;

        form {
          margin-top: 12px;

          textarea {
            width: 100%;
            height: 150px;
            border: none;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
`

interface AdminClassDetailProps {
  className?: string
  homework: Object
  notice: Object
  curriculum: Object
}

export default function ClassDetail({ params }: { params: { id: string } }) {
  // 과제 편집 모드
  const [homeworkEditMode, setHomeworkEditMode] = useState<boolean[]>([])
  // 공지사항 편집 모드
  const [noticeEditMode, setNoticeEditMode] = useState<boolean[]>([])

  // 과제 추가
  const [newHomework, setNewHomework] = useState({
    date: '',
    content: ''
  })

  // 공지사항 추가
  const [newNotice, setNewNotice] = useState({
    date: '',
    content: ''
  })

  // 과제 추가 form 보이기
  const [showAddHomework, setShowAddHomework] = useState(false)
  // 수업내용 추가 form 보이기
  const [showAddNotice, setShowAddNotice] = useState(false)

  const [editHomework, setEditHomework] = useState('')
  const [editNotice, setEditNotice] = useState('')

  // 과제 수정
  const onClickEditHomework = (idx: number) => {
    setEditHomework('')
    const newEditModes = homeworkEditMode.map((mode, i) => (i === idx ? !mode : false));
    setHomeworkEditMode(newEditModes);
  }

  // 공지사항 수정
  const onClickEditNotice = (idx: number) => {
    setEditNotice('')
    const newEditModes = noticeEditMode.map((mode, i) => (i === idx ? !mode : false));
    setNoticeEditMode(newEditModes);
  }

  // 과제 삭제
  const onClickDeleteHomework = async (e: any, idx: number) => {
    e.preventDefault()
    alert('삭제하기')
    
    const currentHomework = Object.values(classInfo.homework as Object)
    currentHomework[0].splice(idx, 1)

    const classHomework = doc(db, 'class_homework', params.id)

    await updateDoc(classHomework, {
      homeworks: currentHomework[0]
    })

    getClassInfo()
  }

  // 공지사항 삭제
  const onClickDeleteNotice = async (e: any, idx: number) => {
    e.preventDefault()
    alert('삭제하기')

    const currentNotice = Object.values(classInfo.notice as Object)
    currentNotice[0].splice(idx, 1)

    const classNotice = doc(db, 'class_notice', params.id)

    await updateDoc(classNotice, {
      notices: currentNotice[0]
    })

    getClassInfo()
  }

  const [swiperCnt, setSwiperCnt] = useState<number>(1)
  const [classInfo, setClassInfo] = useState<AdminClassDetailProps>({
    className: '',
    homework: {},
    notice: {},
    curriculum: {}
  })

  const getClassInfo = async () => {
    const classRef = doc(db, 'class', params.id)
    const classSnapshot = await getDoc(classRef)

    if (!classSnapshot.exists()) {
      alert('존재하지 않는 수업입니다')
      return
    } else {
      const classData = classSnapshot.data()
      const classHomework = classData.homework ? (await getDoc(classData.homework)).data() : null
      const classNotice = classData.notice ? (await getDoc(classData.notice)).data() : null

      if (classHomework) {
        Object.entries(classHomework).forEach(([key, value]) => {
          value.sort((a: { date: string }, b : { date: string }) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })
        })
      }

      if (classNotice) {
        Object.entries(classNotice).forEach(([key, value]) => {
          value.sort((a: { date: string }, b : { date: string }) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })
        })
      }

      setClassInfo({
        className: classData.name,
        homework: classHomework as Object,
        notice: classNotice as Object,
        curriculum: classData.curriculum
      })

      setHomeworkEditMode(new Array(Object.values(classHomework as Object)[0].length).fill(false))
      setNoticeEditMode(new Array(Object.values(classNotice as Object)[0].length).fill(false))
    }
  }

  useEffect(() => {
    getClassInfo()
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

  const onChangeNewHomework = (e: any) => {
    setNewHomework({
      ...newHomework,
      content: e.target.value
    })
  }

  const onChangeNewNotice = (e: any) => {
    setNewNotice({
      ...newNotice,
      content: e.target.value
    })
  }

  // 새로운 과제 날짜 변경
  const onChangeNewHomeworkDate = (e: any) => {
    setNewHomework({
      ...newHomework,
      date: e.target.value
    })
  }
  
  // 새로운 과제 추가
  const onClickSubmitNewHomework = async (e: any) => {
    e.preventDefault()
    setShowAddHomework(false)

    const classHomework = doc(db, 'class_homework', params.id)
    const classHomeworkSnapshot = await getDoc(classHomework)
    const classHomeworkData = classHomeworkSnapshot.data()

    const newHomeworkList = classHomeworkData?.homeworks

    const maxId = newHomeworkList.length ? Math.max(...newHomeworkList?.map((item: { id: number }) => item.id)) : -1

    newHomeworkList?.push({
      date: newHomework.date,
      content: newHomework.content,
      id: maxId + 1
    })

    await updateDoc(classHomework, {
      homeworks: newHomeworkList
    })

    setNewHomework({
      date: '',
      content: ''
    })

    getClassInfo()
    setHomeworkEditMode([])
  }

  // 새로운 과제 추가 취소
  const onClickCloseNewHomework = (e: any) => {
    e.preventDefault()
    setShowAddHomework(false)

    setNewHomework({
      date: '',
      content: ''
    })
  }

  // 과제 내용 수정
  const onChangeHomework = (e: any) => {
    e.preventDefault()
    setEditHomework(e.target.value)
  }

  // 과제 내용 수정 완료
  const onEditHomework = async (e: any, id: string, idx: number) => {
    e.preventDefault()
    if (!editHomework) {
      alert('수정할 내용을 입력해주세요')
      return
    }

    const currentHomework = Object.values(classInfo.homework as Object)
    currentHomework[0][idx].content = editHomework
    
    const classHomework = doc(db, 'class_homework', params.id)

    await updateDoc(classHomework, {
      homeworks: currentHomework[0]
    })

    getClassInfo()
  }

  // 새로운 공지 사항 날짜 변경
  const onChangeNewNoticeDate = (e: any) => {
    setNewNotice({
      ...newNotice,
      date: e.target.value
    })
  }

  // 새로운 공지 사항 추가
  const onClickSubmitNewNotice = async (e: any) => {
    e.preventDefault()
    setShowAddNotice(false)

    const classNotice = doc(db, 'class_notice', params.id)
    const classNoticeSnapshot = await getDoc(classNotice)
    const classNoticeData = classNoticeSnapshot.data()

    const newNoticeList = classNoticeData?.notices

    const maxId = newNoticeList.length ? Math.max(...newNoticeList?.map((item: { id: number }) => item.id)) : -1

    newNoticeList?.push({
      date: newNotice.date,
      content: newNotice.content,
      id: maxId + 1
    })

    await updateDoc(classNotice, {
      notices: newNoticeList
    })

    setNewNotice({
      date: '',
      content: ''
    })

    getClassInfo()
  }

  // 새로운 공지 사항 추가 취소
  const onClickCloseNewNotice = (e: any) => {
    e.preventDefault()
    setShowAddNotice(false)

    setNewNotice({
      date: '',
      content: ''
    })
  }

  return (
    <ClassDetailStyle className='container'>
      <div className="class-title">
        { classInfo.className }
      </div>
      <section>
        <div className="section-header">
          <div className='section-title'>
            과제
          </div>
          <div>
            <ImageButton
              onClick={() => setShowAddHomework(!showAddHomework)}
              role='add'
            />
            <Modal
              isOpen={showAddHomework}
              onClose={() => setShowAddHomework(false)}
            >
              <div className='form-container'>
                <div className='form-title'>
                  과제 추가하기
                </div>
                <form>
                  <Input value={newHomework.date} type='date' onChange={onChangeNewHomeworkDate} />
                  <textarea value={newHomework.content} cols={30} rows={10} onChange={onChangeNewHomework}></textarea>
                  <div className="button-container">
                    <Button color='primary' disabled={!newHomework.date || !newHomework.content} onClick={onClickSubmitNewHomework}>추가</Button>
                    <Button color='default' onClick={onClickCloseNewHomework}>취소</Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        <SwiperStyle>
          {
            (classInfo.homework && Object.values(classInfo.homework as Object)[0]?.length === 0) ? (
              <EmptyState
                mainText='과제가 없습니다'
                size="medium"
              />
            ) : (
              <Swiper
                slidesPerView={swiperCnt}
                pagination={{ clickable: true }}
                spaceBetween={12}
                >
                  {
                    Object.entries(classInfo.homework as Object).map(([key, value]) => (
                      <div key={key}>
                        {
                          value.map((item: { content: string, date: string, id: string }, idx: number) => (
                            <SwiperSlide key={idx} className='swiper-item'>
                              <div className="swiper-item-header">
                                <div className='swiper-date'>
                                  { convertDate(item.date) }
                                </div>
                                <div className="swiper-btn-container">
                                  <ImageButton
                                    onClick={() => onClickEditHomework(idx)}
                                    role='edit'
                                  />
                                  <ImageButton
                                    onClick={(e) => onClickDeleteHomework(e, idx)}
                                    role='delete'
                                  />
                                </div>
                              </div>
                              <div className='swiper-content'>
                                {
                                  homeworkEditMode[idx] ? (
                                    <div className='swiper-form-container'>
                                      <form>
                                        <textarea
                                          value={editHomework}
                                          onChange={(e) => onChangeHomework(e)}
                                          placeholder={item.content}
                                        />
                                        <Button
                                          color='default'
                                          disabled={!editHomework}
                                          onClick={(e) => onEditHomework(e, item.id, idx)}
                                        >
                                          수정하기
                                        </Button>
                                      </form>
                                    </div>
                                  ) : (
                                    <div>
                                      { item.content }
                                    </div>
                                  )
                                }
                              </div>
                            </SwiperSlide>
                          ))
                        }
                      </div>
                    ))
                  }
              </Swiper>
            )
          }
        </SwiperStyle>
      </section>

      <section>
        <div className="section-header">
          <div className="section-title">
            수업내용
          </div>
          <div>
            <ImageButton
              onClick={() => setShowAddNotice(!showAddNotice)}
              role='add'
            />
            <Modal
              isOpen={showAddNotice}
              onClose={() => setShowAddNotice(false)}
            >
              <div className='form-container'>
                <div className='form-title'>
                  수업내용 추가하기
                </div>
                <form>
                  <Input value={newNotice.date} type='date' onChange={onChangeNewNoticeDate} />
                  <textarea value={newNotice.content} cols={30} rows={10} onChange={onChangeNewNotice}></textarea>
                  <div className="button-container">
                    <Button color='primary' disabled={!newNotice.date || !newNotice.content} onClick={onClickSubmitNewNotice}>추가</Button>
                    <Button color='default' onClick={onClickCloseNewNotice}>취소</Button>
                  </div>
                </form>
              </div>
            </Modal>
            </div>
        </div>
        <SwiperStyle>
          {
            (classInfo.notice && Object.values(classInfo.notice as Object)[0]?.length === 0) ? (
              <EmptyState
                mainText='수업내용이 없습니다'
                size="medium"
              />
            ) : (
              <Swiper
                slidesPerView={swiperCnt}
                pagination={{ clickable: true }}
                spaceBetween={12}
                >
                  {
                    classInfo.notice && (
                      Object.entries(classInfo.notice as Object).map(([key, value]) => (
                        <div key={key}>
                          {
                            value.map((item: { content: string, date: string }, idx: number) => (
                              <SwiperSlide key={idx} className='swiper-item'>
                                <div className="swiper-item-header">
                                  <div className='swiper-date'>
                                    { convertDate(item.date) }
                                  </div>
                                  <div className="swiper-btn-container">
                                    <ImageButton
                                      onClick={() => onClickEditNotice(idx)}
                                      role='edit'
                                    />
                                    <ImageButton
                                      onClick={(e) => onClickDeleteNotice(e, idx)}
                                      role='delete'
                                    />
                                  </div>
                                </div>
                                <div className='swiper-content'>
                                  {
                                    noticeEditMode[idx] ? (
                                      <div className='swiper-form-container'>
                                        <form>
                                          <textarea
                                            value={editNotice}
                                            onChange={(e) => setEditNotice(e.target.value)}
                                            placeholder={item.content}
                                          />
                                          <Button
                                            color='default'
                                            disabled={!editNotice}
                                            onClick={(e) => onEditHomework(e, item.date, idx)}
                                          >
                                            수정하기
                                          </Button>
                                        </form>
                                      </div>
                                    ) : (
                                      <div>
                                        { item.content }
                                      </div>
                                    )
                                  }
                                </div>
                              </SwiperSlide>
                            ))
                          }
                        </div>
                      ))
                    )
                  }
              </Swiper>
            )
          }
        </SwiperStyle>
      </section>

      <section>
        <div className="section-title">
          커리큘럼
        </div>
        <div>
          {
            classInfo.curriculum && (
              Object.entries(classInfo.curriculum as Object).map(([month, curriculum]) => (
                curriculum.month.map((singleMonth: { days: { content: string }[] }, contentIdx: number) => (
                  <div key={contentIdx}>
                    Month { contentIdx + 1 }
                    <div>
                      {
                        singleMonth.days.map((day, dayIdx: number) => (
                          <div key={dayIdx}>
                            Day { dayIdx + 1 }
                            <div key={dayIdx}>
                              { day.content }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              ))
            )
          }
        </div>
      </section>
    </ClassDetailStyle>
  )
}