import React, { useState } from 'react'

import { useRouter } from 'next/navigation'
import { db } from '@/firebase/config'
import { addDoc, collection, DocumentData } from 'firebase/firestore'

import Button from '@/app/components/Button'
import ButtonDelete from '@/app/components/Molecule/ButtonDelete'
import Badge from '@/app/components/Molecule/Badge'

import styled from 'styled-components'

const AdminClassFormStyle = styled.div`
  .input-indicator {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .dynamic-input-container {
    height: 500px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      display: none;
    }

    .dynamic-month-container {
      margin-bottom: 20px;

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

const AdminClassForm = React.memo(() => {
  const router = useRouter()
  const [className, setClassName] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  
  const [curriculums, setCurriculums] = useState<{ name: string; days: string[] }[]>([
    { name: 'Month 1', days: [''] },
  ])

  const handleClassNameChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'className') {
      setClassName(value)
    }
  }

  const addMonth = (e: any) => {
    e.preventDefault()
    const lastMonth = curriculums[curriculums.length - 1]
    const monthNumber = parseInt(lastMonth.name.split(' ')[1]) + 1
    const newMonth = { name: `Month ${monthNumber}`, days: [''] };
    setCurriculums([...curriculums, newMonth])
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

    setLoading(true)

    await addDoc(collection(db, 'class'), {
      name: className,
      curriculum: formattedCurriculum
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
          <input
            type="text"
            id="className"
            name="className"
            value={className}
            onChange={handleClassNameChange}
          />
        </div>
        <div className="dynamic-input-container">
          <div className="input-indicator">커리큘럼</div>
          {
            curriculums.map((curriculum, monthIdx) => (
              <div key={monthIdx} className='dynamic-month-container'>
                <div className="dynamic-month-indicator">
                  <Badge
                    text={curriculum.name}
                  />
                  {
                    curriculums.length > 1 && (
                      <ButtonDelete onClick={(e) => removeMonth(monthIdx, e)} />
                    )
                  }
                </div>
                <div>
                  {
                    curriculum.days.map((day, dayIdx) => (
                      <div key={dayIdx} className='dynamic-day-container'>
                        <label htmlFor={`curriculumDay-${dayIdx}`}>{ dayIdx + 1 } 일자</label>
                        <div className="dynamic-day-input">
                          <input
                            type="text"
                            id={`curriculumDay-${dayIdx}`}
                            placeholder={`Day ${dayIdx + 1}`}
                            value={day}
                            onChange={(e) => handleWeekChange(monthIdx, dayIdx, e)}
                          />
                          {
                            curriculum.days.length > 1 && (
                              <ButtonDelete onClick={(e) => removeWeek(monthIdx, dayIdx, e)} />
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
          <Button
            size='small'
            onClick={addMonth}
          >
            수업 월 추가하기
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={className === ''}
        >
          저장하기
        </Button>
      </AdminClassFormStyle>
    </form>
  )
})

AdminClassForm.displayName = 'AdminClassForm'

export default AdminClassForm