import React, { useEffect, useState, useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import Button from '@/app/components/Atom/Button/Button'
import ImageButton from '@/app/components/Atom/Button/ImageButton'
import Badge from '@/app/components/Molecule/Badge'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import Skeleton from '@/app/components/Skeleton'

import styled from 'styled-components'

const AdminCurriculumFormStyle = styled.div`
  .input-indicator {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .dynamic-input-container {
    min-height: 400px;
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
      }
    }
  }

  .button-container {
    display: flex;
    gap: 12px;
  }
`

type AdminCurriculumFormProps = {
  isEdit?: boolean
}

export default function AdminCurriculumForm({ isEdit }: AdminCurriculumFormProps) {
  const searchParams = useSearchParams()
  const curriculumId = searchParams.get('id') as string
  const router = useRouter()
  const [curriculumName, setCurriculumName] = useState('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState(isEdit ? true : false)
  
  const [curriculums, setCurriculums] = useState<{ name: string; days: string[] }[]>([
    { name: 'Month 1', days: [''] },
  ])

  const memoizedCurriculumInfo = useCallback(() => {
    const getCurriculumInfo = async () => {
      const curriculumRef = doc(db, 'class_curriculum', curriculumId)
      const curriculumSnap = await getDoc(curriculumRef)
  
      if (!curriculumSnap.exists()) {
        alert('커리큘럼 정보를 불러올 수 없습니다')
        router.replace('/admin/curriculum')
        return
      } else {
        const curriculumData = curriculumSnap.data()
        setCurriculumName(curriculumData.name)
  
        const initialCurriculums = curriculumData.curriculum.months.month.map((month: any, index: number) => {
          const curriculumMonth = {
            name : `Month ${index + 1}`,
            days : month.days.map((day: any) => {
              return day.content
            })
          }
  
          return curriculumMonth
        })
  
        setCurriculums(initialCurriculums)
        setLoading(false)
      }
    }

    if (isEdit) {
      getCurriculumInfo()
    }
  }, [isEdit, curriculumId, router])

  useEffect(() => {
    memoizedCurriculumInfo()
  }, [memoizedCurriculumInfo])

  const onChangeCurriculumName = (e: any) => {
    const { name, value } = e.target
    setCurriculumName(value)
  }

  const addMonth = (e: any) => {
    e.preventDefault()
    const lastMonth = curriculums[curriculums.length - 1]
    const monthNumber = parseInt(lastMonth.name.split(' ')[1]) + 1
    const newCurriculum = { name: `Month ${monthNumber}`, days: [''] }
    setCurriculums([...curriculums, newCurriculum])
  }

  const removeMonth = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const updatedMonths = curriculums.filter((_, i) => i !== idx)

    updatedMonths.forEach((month, idx) => {
      month.name = `Month ${idx + 1}`
    })

    setCurriculums(updatedMonths)
  }

  const addWeek = (monthIdx: number, e: any) => {
    e.preventDefault()
    const updatedMonths = [...curriculums]
    updatedMonths[monthIdx].days.push('')
    setCurriculums(updatedMonths)
  }

  const removeWeek = (monthIdx: number, weekIdx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const updatedMonths = [...curriculums]
    updatedMonths[monthIdx].days.splice(weekIdx, 1)

    setCurriculums(updatedMonths)
  }

  const handleWeekChange = (monthIdx: number, weekIdx: number, e: any) => {
    const updatedMonths = [...curriculums]
    updatedMonths[monthIdx].days[weekIdx] = e.target.value
    setCurriculums(updatedMonths)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formattedCurriculum = {
      months: {
        month: curriculums.map((curriculum) => {
          return {
            days: curriculum.days.map((day) => {
              return {
                content: day
              }
            })
          }
        })
      }
    }

    setSubmitting(true)

    if (isEdit) {
      await updateCurriculum(formattedCurriculum)
    } else {
      await addNewCurriculum(formattedCurriculum)
    }
  }

  // 커리큘럼 수정
  const updateCurriculum = async (formattedCurriculum: any) => {
    await updateDoc(doc(db, 'class_curriculum', curriculumId), {
      name: curriculumName,
      curriculum: formattedCurriculum
    }).then(() => {
      setSubmitting(false)
      alert('커리큘럼이 수정되었습니다')
      router.push('/admin/curriculum')
    })
  }

  // 커리큘럼 추가
  const addNewCurriculum = async (formattedCurriculum: any) => {
    await addDoc(collection(db, 'class_curriculum'), {
      name: curriculumName,
      curriculum: formattedCurriculum
    }).then(() => {
      setSubmitting(false)
      alert('커리큘럼이 추가되었습니다')
      router.push('/admin/curriculum')
    })
  }

  // 커리큘럼 삭제
  const handleDelete = async (e: any) => {
    e.preventDefault()

    if (confirm('정말로 커리큘럼을 삭제하시겠습니까?')) {
      setSubmitting(true)
      await deleteDoc(doc(db, 'class_curriculum', curriculumId))
      setSubmitting(false)
      alert('커리큘럼이 삭제되었습니다')
      router.push('/admin/curriculum')
    }
  }

  return (
    <form className='admin-class-form'>
      {
        loading ? (
            <Skeleton />
          ) : (
            <AdminCurriculumFormStyle>
              <div className="input-container">
                <div className="input-indicator">커리큘럼 이름</div>
                <DynoInput
                  type="text"
                  id="curriculumName"
                  name="curriculumName"
                  placeholder='새롭게 추가할 커리큘럼 이름을 입력해주세요'
                  value={curriculumName}
                  onChange={onChangeCurriculumName}
                />
              </div>
              <div className="dynamic-input-container">
                <div className="input-indicator">커리큘럼</div>
                <Button
                  size='small'
                  onClick={addMonth}
                >
                  수업 월 추가하기
                </Button>
                {
                  curriculums.map((curriculum, monthIdx) => (
                    <div key={monthIdx} className='dynamic-month-container'>
                      <div className="dynamic-month-indicator">
                        <Badge
                          text={curriculum.name}
                        />
                        {
                          curriculums.length > 1 && (
                            <ImageButton
                              onClick={(e) => removeMonth(monthIdx, e)}
                              role='delete'
                            />
                          )
                        }
                      </div>
                      <div>
                        {
                          curriculum.days.map((day, dayIdx) => (
                            <div key={dayIdx} className='dynamic-day-container'>
                              <label htmlFor={`curriculumDay-${dayIdx}`}>{ dayIdx + 1 } 일자</label>
                              <div className="dynamic-day-input">
                                <DynoInput
                                  type="text"
                                  id={`curriculumDay-${dayIdx}`}
                                  placeholder={`Day ${dayIdx + 1}`}
                                  value={day}
                                  onChange={(e) => handleWeekChange(monthIdx, dayIdx, e)}
                                />
                                {
                                  curriculum.days.length > 1 && (
                                    <ImageButton
                                      onClick={(e) => removeWeek(monthIdx, dayIdx, e)}
                                      role='delete'
                                    />
                                  )
                                }
                              </div>
                            </div>
                          ))
                        }
                        <Button
                          size="small"
                          onClick={(e) => addWeek(monthIdx, e)}
                        >
                          수업 일자 추가하기
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="button-container">
                {
                  isEdit && (
                    <Button
                      color='danger'
                      onClick={handleDelete}
                      disabled={submitting}
                    >
                      삭제하기
                    </Button>
                  )
                }
                <Button
                  onClick={handleSubmit}
                  disabled={curriculumName === '' || submitting}
                >
                  { isEdit ? '수정하기' : '추가하기' }
                </Button>
              </div>
            </AdminCurriculumFormStyle>
          )
      }
    </form>
  )
}