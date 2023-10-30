import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, setDoc, doc, updateDoc, getDocs, DocumentData } from 'firebase/firestore'

import Button from '@/app/components/Atom/Button/Button'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import CurriculumList from '@/app/components/Organism/CurriculumList'

import { Month } from '@/types/types'

import styled from 'styled-components'

const AdminClassFormStyle = styled.div`
  .input-indicator {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .dynamic-input-container {
    height: 400px;
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }

    .dynamic-month-container {
      margin: 12px 0 24px 0;

      .dynamic-month-indicator {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        align-items: center;
      }
    }

    .dynamic-day-container {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 6px;
        font-weight: 700;
        font-size: 14px;
      }

      .dynamic-day-input {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;

        input {
          height: 40px;
          border-radius: 8px;
          padding-left: 8px;
          outline: none;
          border: 0;
          width: 100%;
  
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

const AdminClassForm = React.memo(() => {
  const router = useRouter()
  const [className, setClassName] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  // 전체 커리큘럼
  const [allCurriculum, setAllCurriculum] = useState<DocumentData[]>([])
  // 현재 선택된 커리큘럼
  const [currentCurriculum, setCurrentCurriculum] = useState<curriculumObject>()

  useEffect(() => {
    getAllCurriculum()
  }, [])

  const handleClassNameChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'className') {
      setClassName(value)
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

  const onChangeCurriculum = async (e: any) => {
    const curriculumId = e.target.value

    const selectedCurriculum = allCurriculum.find(curriculum => curriculum.id === curriculumId)

    setCurrentCurriculum(selectedCurriculum as curriculumObject)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const currentCurriculumId = currentCurriculum?.id as string
    const classCurriculum = doc(db, 'class_curriculum', currentCurriculumId)

    // 수업을 추가하고 나면 id 생성
    // 생성된 id를 기반으로 class_homework, class_notice 문서 생성
    const addClass = await addDoc(collection(db, 'class'), {
      name: className,
      curriculum: classCurriculum
    })

    const classId = addClass.id

    const setClassHomework = setDoc(doc(db, 'class_homework', classId), {
      homeworks: []
    })

    const setClassNotice = setDoc(doc(db, 'class_notice', classId), {
      notices: []
    })

    await Promise.all([setClassHomework, setClassNotice])

    const classHomework = doc(db, 'class_homework', classId)
    const classNotice = doc(db, 'class_notice', classId)

    await updateDoc(doc(db, 'class', classId), {
      homework: classHomework,
      notice: classNotice
    }).then(() => {
      setLoading(false)
      alert('수업 정보가 추가되었습니다')
      router.push('/admin/class')
    })
  }

  return (
    <form className='admin-class-form'>
      <AdminClassFormStyle>
        <div className="input-container">
          <div className="input-indicator">수업명</div>
          <DynoInput
            type="text"
            id="className"
            name="className"
            placeholder='새롭게 추가할 수업명을 입력해주세요'
            value={className}
            onChange={handleClassNameChange}
          />
        </div>
        <div className="dynamic-input-container">
          <div className="input-indicator">커리큘럼</div>
          {
            allCurriculum.length > 0 &&
            (
              <DynoSelect value={currentCurriculum ? currentCurriculum.id : allCurriculum[0].id} onChange={onChangeCurriculum}>
                {
                  allCurriculum.map((curriculum) => (
                    <option key={curriculum.id} value={curriculum.id}>{ curriculum.name }</option>
                  ))
                }
              </DynoSelect>
            )
          }
          <div>
            {
              currentCurriculum && (
                Object.entries(currentCurriculum?.curriculum as Object).map(([month, curriculum]) => (
                  <div key={month}>
                    <div>
                      {
                        curriculum.month.map((item: Month, idx: number) => (
                          <CurriculumList
                            key={idx}
                            idx={idx}
                            month={item}
                          />
                        ))
                      }
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={className === '' || loading}
        >
          저장하기
        </Button>
      </AdminClassFormStyle>
    </form>
  )
})

AdminClassForm.displayName = 'AdminClassForm'

export default AdminClassForm