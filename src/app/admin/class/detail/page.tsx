'use client'

import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import { useEffect, useState, Fragment } from "react"

import { db } from "@/firebase/config"
import { doc, getDoc, updateDoc, getDocs, collection, DocumentData } from 'firebase/firestore'

import EmptyState from '@/app/components/Molecule/EmptyState'
import ImageButton from '@/app/components/Atom/Button/ImageButton'
import Button from '@/app/components/Button'
import Modal from '@/app/components/Organism/Modal'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import IsStaff from '@/app/components/Template/IsStaff'
import CurriculumList from '@/app/components/Organism/CurriculumList'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'
import Skeleton from '@/app/components/Skeleton'
import TextEditor from '@/app/components/Organism/TextEditor'
import EditableText from '@/app/components/Organism/EditableText'
import DynoUploader from '@/app/components/Atom/Input/DynoUploader'
import BackButton from '@/app/components/Atom/Button/BackButton'

import { convertDate } from '@/lib/utils/date'
import { Month } from '@/types/types'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

SwiperCore.use([Pagination, Navigation])

const ClassDetailStyle = styled.div`
  max-width: 1024px;
  padding: 40px 12px 24px;

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
      margin-bottom: 12px;

      &.space-between {
        justify-content: space-between;

        button {
          margin-right: 0;
        }
      }

      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    .editor-body {
      padding: 24px;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;

      .editor-title {
        display: flex;
        flex-direction: column;
      }

      .form-title {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 12px;
      }

      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 12px;

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
      background-color: var(--color-card);
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
        height: calc(100% - 24px);

        .homework-content,
        .notice-content {
          word-break: keep-all;
          height: 100%;
          overflow-y: scroll;
          touch-action: pan-y;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
`

const MetaModalStyle = styled.div`
  .modal-meta {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    background-color: #eee;
    padding: 24px;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    gap: 24px;

    .form-description {
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-direction: column;

      .input-container {
        display: flex;
        flex-direction: column;
        gap: 24px;

        input {
          height: 40px;
          border-radius: 8px;
          padding-left: 8px;
          outline: none;
          border: 0;
    
          &:focus {
            border: 1px solid var(--primary-green);
          }
        }
      }
    }
  }
`

type curriculumObject = {
  name: string,
  curriculum: object,
  id?: string
}

interface AdminClassDetailProps {
  className?: string
  homework: Object
  notice: Object
  curriculum: curriculumObject
}

function ClassDetailContent({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  // 과제 편집 모드
  const [homeworkEditMode, setHomeworkEditMode] = useState<boolean>(false)
  // 공지사항 편집 모드
  const [noticeEditMode, setNoticeEditMode] = useState<boolean>(false)

  // 과제 추가
  const [newHomework, setNewHomework] = useState({
    date: new Date().toISOString().slice(0, 10),
    content: ''
  })

  // 공지사항 추가
  const [newNotice, setNewNotice] = useState({
    date: new Date().toISOString().slice(0, 10),
    content: ''
  })

  // 과제 추가 form 보이기
  const [showAddHomework, setShowAddHomework] = useState(false)
  // 수업내용 추가 form 보이기
  const [showAddNotice, setShowAddNotice] = useState(false)

  const [editHomework, setEditHomework] = useState({
    date: '',
    content: '',
    id: ''
  })

  const [editNotice, setEditNotice] = useState({
    date: '',
    content: '',
    id: ''
  })

  const [swiperCnt, setSwiperCnt] = useState<number>(1)
  const [classInfo, setClassInfo] = useState<AdminClassDetailProps>({
    className: '',
    homework: {},
    notice: {},
    curriculum: {
      name: '',
      curriculum: {}
    }
  })

  // 메타데이터 모달
  const [showMetaModal, setShowMetaModal] = useState<boolean>(false)
  const [currentMeta, setCurrentMeta] = useState({
    url: '',
    type: ''
  })

  // 전체 커리큘럼
  const [allCurriculum, setAllCurriculum] = useState<DocumentData[]>([])
  // 현재 선택된 커리큘럼
  const [currentCurriculum, setCurrentCurriculum] = useState<curriculumObject>()
  // 초기 커리큘럼
  const [initialCurriculum, setInitialCurriculum] = useState<curriculumObject>()

  // 과제 수정
  const onClickEditHomework = (date: string, content: string, id: string) => {
    setEditHomework({
      date,
      content,
      id
    })
    setHomeworkEditMode(true)
  }

  // 공지사항 수정
  const onClickEditNotice = (date: string, content: string, id: string) => {
    setEditNotice({
      date,
      content,
      id
    })
    setNoticeEditMode(true)
  }

  // 과제 삭제
  const onClickDeleteHomework = async (e: any, idx: number) => {
    e.preventDefault()

    if (confirm('과제를 삭제하시겠습니까?')) {
      const currentHomework = Object.values(classInfo.homework as Object)
      currentHomework[0].splice(idx, 1)
  
      const classHomework = doc(db, 'class_homework', params.id)
  
      await updateDoc(classHomework, {
        homeworks: currentHomework[0]
      })
  
      getClassInfo()
    }
  }

  // 공지사항 삭제
  const onClickDeleteNotice = async (e: any, idx: number) => {
    e.preventDefault()

    if (confirm('수업내용을 삭제하시겠습니까?')) {
      const currentNotice = Object.values(classInfo.notice as Object)
      currentNotice[0].splice(idx, 1)
  
      const classNotice = doc(db, 'class_notice', params.id)
  
      await updateDoc(classNotice, {
        notices: currentNotice[0]
      })
  
      getClassInfo()
    }
  }

  const getAllCurriculum = async () => {
    const curriculumRef = collection(db, 'class_curriculum')
    const curriculumSnapshot = await getDocs(curriculumRef)
    const curriculumList = curriculumSnapshot.docs.map(doc => {
      const curriculumData = doc.data()
      curriculumData.id = doc.id
      return curriculumData
    })

    setAllCurriculum(curriculumList)
  }

  // 커리큘럼 변경
  const onChangeCurriculum = async (e: any) => {
    const curriculumId = e.target.value

    const selectedCurriculum = allCurriculum.find(curriculum => curriculum.id === curriculumId)

    setCurrentCurriculum(selectedCurriculum as curriculumObject)
  }

  // 커리큘럼 변경 반영햐기
  const onClickChangeCurriculum = async () => {
    const currentCurriculumId = currentCurriculum?.id as string
    const classCurriculum = doc(db, 'class_curriculum', currentCurriculumId)
    
    await updateDoc(doc(db, 'class', params.id), {
      curriculum: classCurriculum
    }).then(() => {
      alert('커리큘럼이 변경되었습니다')
    })

    getClassInfo()
  }

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
      const classCurriculum = classData.curriculum ? (await getDoc(classData.curriculum).then((doc) => {
        const curriculumData = doc.data() as curriculumObject
        curriculumData.id = doc.id
        return curriculumData
      })) : null

      if (classHomework) {
        Object.entries(classHomework).forEach(([_, value]) => {
          value.sort((a: { date: string }, b : { date: string }) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })
        })
      }

      if (classNotice) {
        Object.entries(classNotice).forEach(([_, value]) => {
          value.sort((a: { date: string }, b : { date: string }) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          })
        })
      }

      setClassInfo({
        className: classData.name,
        homework: classHomework as Object,
        notice: classNotice as Object,
        curriculum: classCurriculum as curriculumObject
      })

      setCurrentCurriculum(classCurriculum as curriculumObject)
      setInitialCurriculum(classCurriculum as curriculumObject)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllCurriculum()
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

  const onChangeNewHomework = (value: string) => {
    setNewHomework((prevState) => {
      return {
        ...prevState,
        content: value
      }
    })
  }

  const onChangeNewNotice = (value: string) => {
    setNewNotice((prevState) => {
      return {
        ...prevState,
        content: value
      }
    })
  }

  // 새로운 과제 날짜 변경
  const onChangeNewHomeworkDate = (e: any) => {
    setNewHomework((prevState) => {
      return {
        ...prevState,
        date: e.target.value
      }
    })
  }
  
  // 새로운 과제 추가
  const onClickSubmitNewHomework = async (e: any) => {
    e.preventDefault()

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
    setShowAddHomework(false)
  }

  // 새로운 과제 추가 취소
  const onClickCloseNewHomework = (e: any) => {
    e.preventDefault()
    setShowAddHomework(false)

    setNewHomework({
      date: new Date().toISOString().slice(0, 10),
      content: ''
    })
  }

  // 과제 내용 수정
  const onChangeHomework = (value: string) => {
    setEditHomework((prevState) => {
      return {
        ...prevState,
        content: value
      }
    })
  }

  // 과제 내용 수정 완료
  const onEditHomework = async (e: any) => {
    e.preventDefault()
    if (!editHomework.content) {
      alert('수정할 내용을 입력해주세요')
      return
    }

    const currentHomework = Object.values(classInfo.homework as Object)
    const idx = currentHomework[0].findIndex((item: { id: string }) => item.id === editHomework.id)
    currentHomework[0][idx].content = editHomework.content
    
    const classHomework = doc(db, 'class_homework', params.id)

    try {
      await updateDoc(classHomework, {
        homeworks: currentHomework[0]
      })

      alert('과제 정보가 수정되었습니다')
    } catch (error) {
      console.log(error)
    }

    setHomeworkEditMode(false)
    getClassInfo()
  }

  // 과제 내용 수정 취소
  const onClickCloseEditHomework = (e: any) => {
    e.preventDefault()
    setHomeworkEditMode(false)
  }

  const onChangeNotice = (value: string) => {
    setEditNotice((prevState) => {
      return {
        ...prevState,
        content: value
      }
    })
  }

  // EditableText에서 onClick 발생 시 metadata를 바인딩
  const handleMeta = (meta: any) => {
    setShowMetaModal(true)
    setCurrentMeta(meta)
  }

  const closeMetaModal = () => {
    setShowMetaModal(false)
    setCurrentMeta({
      url: '',
      type: ''
    })
  }

  // 수업 내용 수정 완료
  const onEditNotice = async (e: any) => {
    e.preventDefault()
    if (!editNotice) {
      alert('수정할 내용을 입력해주세요')
      return
    }

    const currentNotice = Object.values(classInfo.notice as Object)
    const idx = currentNotice[0].findIndex((item: { id: string }) => item.id === editNotice.id)
    currentNotice[0][idx].content = editNotice.content

    const classNotice = doc(db, 'class_notice', params.id)

    try {
      await updateDoc(classNotice, {
        notices: currentNotice[0]
      })

      alert('수업내용이 수정되었습니다')
    } catch (error) {
      console.log(error)
    }

    setNoticeEditMode(false)
    getClassInfo()
  }

  // 수업 내용 수정 취소
  const onClickCloseEditNotice = (e: any) => {
    e.preventDefault()
    setNoticeEditMode(false)
  }

  // 새로운 공지 사항 날짜 변경
  const onChangeNewNoticeDate = (e: any) => {
    setNewNotice((prevState) => {
      return {
        ...prevState,
        date: e.target.value
      }
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
      date: new Date().toISOString().slice(0, 10),
      content: ''
    })
  }

  return (
    <ClassDetailStyle className='container'>
      <BackButton href="/admin/class" />
      <div className="class-title">
        { classInfo.className }
      </div>
      {
        loading ? (
          <Skeleton />
        ) : (
          <Fragment>
            <section>
              <div className="section-header">
                <div className='section-title'>
                  과제
                </div>
                <Fragment>
                  <ImageButton
                    onClick={() => setShowAddHomework(!showAddHomework)}
                    role='add'
                  />
                  {
                    showAddHomework && (
                      <Modal
                        isOpen={showAddHomework}
                        onClose={() => setShowAddHomework(false)}
                      >
                        <div className='editor-body'>
                          <div className="editor-title">
                            <div className='form-title'>
                              과제 추가하기
                            </div>
                            <DynoUploader isOpen={showAddHomework} />
                          </div>
                          <div className='editor-container'>
                            <DynoInput value={newHomework.date} type='date' onChange={onChangeNewHomeworkDate} />
                            <TextEditor
                              isOpen={showAddHomework}
                              content={newHomework.content}
                              onInputChange={onChangeNewHomework}
                            />
                            <div className="button-container">
                              <Button color='primary' disabled={!newHomework.date || !newHomework.content} onClick={onClickSubmitNewHomework}>추가</Button>
                              <Button color='default' onClick={onClickCloseNewHomework}>취소</Button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    )
                  }
                </Fragment>
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
                      initialSlide={Object.values(classInfo.homework as Object)[0]?.length - 1}
                    >
                      {
                        Object.entries(classInfo.homework as Object).map(([key, value]) => (
                          <div key={key}>
                            {
                              value.map((item: { content: string, date: string, id: string }, idx: number) => (
                                <SwiperSlide
                                  key={idx}
                                  className='swiper-item homework'
                                >
                                  <div className="swiper-item-header">
                                    <div className='swiper-date'>
                                      { convertDate(item.date) }
                                    </div>
                                    <div className="swiper-btn-container">
                                      <ImageButton
                                        onClick={() => onClickEditHomework(item.date, item.content, item.id)}
                                        role='edit'
                                      />
                                      <ImageButton
                                        onClick={(e) => onClickDeleteHomework(e, idx)}
                                        role='delete'
                                      />
                                    </div>
                                  </div>
                                  <div className='swiper-content'>
                                    <div className='homework-content'>
                                      <EditableText
                                        content={item.content}
                                        handleMeta={handleMeta}
                                      />
                                    </div>
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
                <Modal
                  isOpen={showMetaModal}
                  onClose={closeMetaModal}
                >
                  <MetaModalStyle>
                    <div className="modal-meta">
                      {
                        currentMeta.type === 'image' ? (
                          <img src={currentMeta.url} alt="modal" />
                        ) : (
                          <video src={currentMeta.url} controls width={'100%'}></video>
                        )
                      }
                    </div>
                  </MetaModalStyle>
                </Modal>
                {
                  homeworkEditMode && (
                    <Modal
                      isOpen={homeworkEditMode}
                      onClose={() => setHomeworkEditMode(false)}
                    >
                      <div className='editor-body'>
                        <div className="editor-title">
                          <div className='form-title'>
                            과제 수정하기
                          </div>
                          <DynoUploader isOpen={homeworkEditMode} />
                        </div>
                        <div className='editor-container'>
                          <DynoInput
                            value={editHomework.date}
                            type='date'
                            onChange={onChangeNewHomeworkDate}
                            disabled
                          />
                          <TextEditor
                            isOpen={homeworkEditMode}
                            content={editHomework.content}
                            onInputChange={onChangeHomework}
                            isEdit={true}
                          />
                          <div className="button-container d-flex">
                            <Button
                              color='primary'
                              disabled={!editHomework}
                              onClick={(e) => onEditHomework(e)}
                            >
                              수정하기
                            </Button>
                            <Button
                              color='default'
                              onClick={onClickCloseEditHomework}
                            >
                              취소
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
                  {
                    showAddNotice && (
                      <Modal
                        isOpen={showAddNotice}
                        onClose={() => setShowAddNotice(false)}
                      >
                        <div className='editor-body'>
                          <div className="editor-title">
                            <div className='form-title'>
                              수업내용 추가하기
                            </div>
                            <DynoUploader isOpen={showAddNotice} />
                          </div>
                          <div className='editor-container'>
                            <DynoInput value={newNotice.date} type='date' onChange={onChangeNewNoticeDate} />
                            <TextEditor
                              isOpen={showAddNotice}
                              content={newNotice.content}
                              onInputChange={onChangeNewNotice}
                            />
                            <div className="button-container">
                              <Button color='primary' disabled={!newNotice.date || !newNotice.content} onClick={onClickSubmitNewNotice}>추가</Button>
                              <Button color='default' onClick={onClickCloseNewNotice}>취소</Button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    )
                  }
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
                      initialSlide={Object.values(classInfo.notice as Object)[0]?.length - 1}
                    >
                      {
                        classInfo.notice && (
                          Object.entries(classInfo.notice as Object).map(([key, value]) => (
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
                                          onClick={() => onClickEditNotice(item.date, item.content, item.id)}
                                          role='edit'
                                        />
                                        <ImageButton
                                          onClick={(e) => onClickDeleteNotice(e, idx)}
                                          role='delete'
                                        />
                                      </div>
                                    </div>
                                    <div className='swiper-content'>
                                      <div className='notice-content'>
                                        <EditableText
                                          content={item.content}
                                          handleMeta={handleMeta}
                                        />
                                      </div>
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
                {
                  noticeEditMode && (
                    <Modal
                      isOpen={noticeEditMode}
                      onClose={() => setNoticeEditMode(false)}
                    >
                      <div className='editor-body'>
                        <div className="editor-title">
                          <div className='form-title'>
                            수업내용 수정하기
                          </div>
                          <DynoUploader isOpen={noticeEditMode} />
                        </div>
                        <div className='editor-container'>
                          <DynoInput
                            value={editNotice.date}
                            type='date'
                            onChange={onChangeNewNoticeDate}
                            disabled
                          />
                          <TextEditor
                            isOpen={noticeEditMode}
                            content={editNotice.content}
                            onInputChange={onChangeNotice}
                            isEdit={true}
                          />
                          <div className="button-container d-flex">
                            <Button
                              color='primary'
                              disabled={!editNotice}
                              onClick={(e) => onEditNotice(e)}
                            >
                              수정하기
                            </Button>
                            <Button
                              color='default'
                              onClick={onClickCloseEditNotice}
                            >
                              취소
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  )
                }
              </SwiperStyle>
            </section>

            <section>
              <div className="section-header space-between">
                <div className="section-title">
                  커리큘럼
                </div>
                <Button
                  color='primary'
                  size='small'
                  onClick={onClickChangeCurriculum}
                  disabled={currentCurriculum?.id === initialCurriculum?.id}
                >
                  변경하기
                </Button>
              </div>
              <Fragment>
                {
                  currentCurriculum && (
                    <DynoSelect value={currentCurriculum.id} onChange={onChangeCurriculum}>
                      {
                        allCurriculum.map((curriculum) => (
                          <option key={curriculum.id} value={curriculum.id}>
                            { curriculum.name }
                          </option>
                        ))
                      }
                    </DynoSelect>
                  )
                }
              </Fragment>
              <Fragment>
                {
                  currentCurriculum && (
                    Object.entries(currentCurriculum?.curriculum as Object).map(([month, curriculum]) => (
                      <Fragment key={month}>
                          {
                            curriculum.month.map((item: Month, idx: number) => (
                              <CurriculumList
                                key={idx}
                                idx={idx}
                                month={item}
                              />
                            ))
                          }
                      </Fragment>
                    ))
                  )
                }
              </Fragment>
            </section>
          </Fragment>
        )
      }
    </ClassDetailStyle>
  )
}

export default function AdminClassDetailPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <IsStaff>
      <ClassDetailContent params={{ id: id as string }} />
    </IsStaff>
  )
}