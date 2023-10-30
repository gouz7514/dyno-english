import { useState, useEffect, Fragment, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/app/components/Atom/Button/Button'
import ImageButton from '@/app/components/Atom/Button/ImageButton'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'
import Toggle from '@/app/components/Toggle/Toggle'
import Skeleton from '@/app/components/Molecule/Skeleton'

import { Hours, Minutes } from '@/lib/constants/constatns'
import { DayKorean, scheduleRepeatRule, scheduleRepeatRules, ClassSchedule } from "@/types/types"

import { db } from "@/firebase/config"
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, DocumentData } from 'firebase/firestore'

import styled from 'styled-components'

const AdimnScheduleFormStyle = styled.div`
  section {
    margin-bottom: 24px;
  }

  .section-title {
    font-weight: 700;
    margin-bottom: 6px;
  }

  .date-container {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .date-time-container {
      gap: 12px;
      align-items: center;

      .date-time-hint {
        margin-bottom: 12px;
        word-break: keep-all;
      }
    }
  }

  .repeat-section {
    .section-header {
      button {
        margin-right: 0;
      }
    }

    .repeat-rule-container {
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      background-color: var(--color-card);

      .repeat-rule-day-container {
        display: flex;
        align-items: center;
        gap: 12px;
  
        .repeat-day-title {
          word-break: keep-all;
          margin-bottom: 12px;
        }
      }
  
      .repeat-rule-time-container {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      button[role='delete'] {
        margin-top: 12px;
      }

      & + .repeat-rule-container {
        margin-top: 12px;
      }
    }
  }

`

interface AdminScheduleFormProps {
  isEdit?: boolean
}

const HOURS = Object.keys(Hours)
const MINUTES = Object.keys(Minutes)

export default function AdminScheduleForm({ isEdit }: AdminScheduleFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scheduleId = searchParams.get('id') as string
  const [submitting, setSubmitting] = useState(isEdit ? true : false)
  const [loading, setLoading] = useState(isEdit ? true : false)

  // 전체 수업 목록
  const [allClass, setAllClass] = useState<string[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [customClass, setCustomClass] = useState<string>('')
  // 직접 입력 여부
  const [isCustom, setIsCustom] = useState<boolean>(false)
  // 수업 반복 여부
  const [isRepeat, setIsRepeat] = useState<boolean>(false)
  // 수업 배경 색깔
  const [bgColor, setBgColor] = useState<string>('#30A680')
  // 수업 날짜
  const [startDate, setStartDate] = useState({
    date: '',
    hour: HOURS[12],
    minute: MINUTES[0]
  })
  const [endDate, setEndDate] = useState({
    date: '',
    hour: HOURS[12],
    minute: MINUTES[0]
  })
  // 수업 반복 정보
  const initialRepeatRule: scheduleRepeatRule = {
    repeatDay: Object.keys(DayKorean)[1],
    repeatStart: '',
    repeatEnd: ''
  }

  const [repeatRule, setRepeatRule] = useState<scheduleRepeatRules>([initialRepeatRule])

  // 버튼 비활성화 조건
  const btnDisabled = () => {
    let isDisabled = true
    
    if (isCustom) {
      isDisabled = customClass === '' || startDate.date === '' || endDate.date === ''
    } else {
      isDisabled = selectedClass === '' || startDate.date === '' || endDate.date === ''
    }

    if (isRepeat) {
      isDisabled = isDisabled || repeatRule.some((rule) => rule.repeatStart === '' || rule.repeatEnd === '')
    }

    return isDisabled
  }
  

  const getAllClass = async () => {
    console.log('get all class')
    const classRef = collection(db, 'class')
    const classSnap = await getDocs(classRef)

    const classList = classSnap.docs.map(doc => {
      const classData = doc.data()
      return classData.name
    })

    classList.push('직접 입력')

    setAllClass(classList)
    setSubmitting(false)
    setSelectedClass(classList[0])
  }

  const getScheduleInfo = async () => {
    const scheduleRef = doc(db, 'class_schedule', scheduleId)
    const scheduleSnap = await getDoc(scheduleRef)

    if (!scheduleSnap.exists()) {
      alert('존재하지 않는 수업입니다')
      router.push('/admin/schedule')
      return
    }

    const scheduleData = scheduleSnap.data()

    if (scheduleData.isCustom) {
      setSelectedClass('직접 입력')
      setCustomClass(scheduleData.title)
    } else {
      setSelectedClass(scheduleData.title)
    }

    setStartDate({
      date: scheduleData.start.split('T')[0],
      hour: Object.keys(Hours)[parseInt(scheduleData.start.split('T')[1].split(':')[0])],
      minute: Object.keys(Minutes)[parseInt(scheduleData.start.split('T')[1].split(':')[1]) / 10]
    })
    setEndDate({
      date: scheduleData.end.split('T')[0],
      hour: Object.keys(Hours)[parseInt(scheduleData.end.split('T')[1].split(':')[0])],
      minute: Object.keys(Minutes)[parseInt(scheduleData.end.split('T')[1].split(':')[1]) / 10]
    })
    setIsCustom(scheduleData.isCustom)
    setBgColor(scheduleData.bgColor)
    setIsRepeat(scheduleData.isRepeat)

    if (scheduleData.isRepeat) {
      setRepeatRule(scheduleData.repeatRule)
    }

    setLoading(false)
  }

  const memoizedScheduleInfo = useCallback(() => {
    const getScheduleInfo = async () => {
      console.log('schedule info')
      const scheduleRef = doc(db, 'class_schedule', scheduleId)
      const scheduleSnap = await getDoc(scheduleRef)
  
      if (!scheduleSnap.exists()) {
        alert('존재하지 않는 수업입니다')
        router.push('/admin/schedule')
        return
      }
  
      const scheduleData = scheduleSnap.data()
  
      if (scheduleData.isCustom) {
        setSelectedClass('직접 입력')
        setCustomClass(scheduleData.title)
      } else {
        setSelectedClass(scheduleData.title)
      }
  
      setStartDate({
        date: scheduleData.start.split('T')[0],
        hour: Object.keys(Hours)[parseInt(scheduleData.start.split('T')[1].split(':')[0])],
        minute: Object.keys(Minutes)[parseInt(scheduleData.start.split('T')[1].split(':')[1]) / 10]
      })
      setEndDate({
        date: scheduleData.end.split('T')[0],
        hour: Object.keys(Hours)[parseInt(scheduleData.end.split('T')[1].split(':')[0])],
        minute: Object.keys(Minutes)[parseInt(scheduleData.end.split('T')[1].split(':')[1]) / 10]
      })
      setIsCustom(scheduleData.isCustom)
      setBgColor(scheduleData.bgColor)
      setIsRepeat(scheduleData.isRepeat)
  
      if (scheduleData.isRepeat) {
        setRepeatRule(scheduleData.repeatRule)
      }
  
      setLoading(false)
    }

    if (isEdit) {
      getScheduleInfo()
    }
  }, [isEdit, scheduleId, router])

  useEffect(() => {
    getAllClass()
    memoizedScheduleInfo()
  }, [memoizedScheduleInfo])

  useEffect(() => {
    if (selectedClass === '직접 입력') {
      setIsCustom(true)
    } else {
      setIsCustom(false)
    }
  }, [selectedClass])

  const onChangeClass = (e: any) => {
    setSelectedClass(e.target.value)
  }

  const handleClassNameChange = (e: any) => {
    setCustomClass(e.target.value)
  }

  // 수업 시작 날짜
  const onChangeStartDate = (e: any, type: string) => {
    switch (type) {
      case 'date':
        setStartDate({
          ...startDate,
          date: e.target.value
        })
        setEndDate({
          ...endDate,
          date: e.target.value
        })
        break
      case 'hour':
        setStartDate({
          ...startDate,
          hour: e.target.value
        })
        break
      case 'minute':
        setStartDate({
          ...startDate,
          minute: e.target.value
        })
        break
      default:
        break
    }
  }

  // 수업 종료 날짜
  const onChangeEndDate = (e: any, type: string) => {
    switch (type) {
      case 'hour':
        setEndDate({
          ...endDate,
          hour: e.target.value
        })
        break
      case 'minute':
        setEndDate({
          ...endDate,
          minute: e.target.value
        })
        break
      default:
        break
    }
  }

  // 수업 배경 색 변경
  const onChangeColor = (e: any) => {
    setBgColor(e.target.value)
  }

  const handleToggleChange = (isChecked: boolean) => {
    setIsRepeat(isChecked)
  }

  const onChangeRepetDay = (e: any, idx: number) => {
    const newRepeatRule = repeatRule.map((rule, index) => {
      if (index === idx) {
        return {
          ...rule,
          repeatDay: e.target.value
        }
      } else {
        return rule
      }
    })

    setRepeatRule(newRepeatRule)
  }

  const onChangeRepeatDate = (e: any, idx: number, type: string) => {
    const newRepeatRule = repeatRule.map((rule, index) => {
      if (index === idx) {
        switch (type) {
          case 'start':
            return {
              ...rule,
              repeatStart: e.target.value,
              repeatEnd: rule.repeatEnd
            }
          case 'end':
            return {
              ...rule,
              repeatStart: rule.repeatStart,
              repeatEnd: e.target.value
            }
          default:
            return rule
        }
      } else {
        return rule
      }
    })

    setRepeatRule(newRepeatRule)
  }

  function onDeleteRepeatRule(idx: number) {
    return () => {
      setRepeatRule(repeatRule.filter((rule, index) => index !== idx))
    }
  }

  // 정보 제출
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    const start = new Date(startDate.date)
    start.setHours(Hours[startDate.hour as keyof typeof Hours])
    start.setMinutes(Minutes[startDate.minute as keyof typeof Minutes])

    const end = new Date(endDate.date)
    end.setHours(Hours[endDate.hour as keyof typeof Hours])
    end.setMinutes(Minutes[endDate.minute as keyof typeof Minutes])

    if (start > end) {
      alert('수업 시작 시간이 수업 종료 시간보다 늦습니다')
      setSubmitting(false)
      return
    }

    const startUTC = new Date(start.getTime() - (start.getTimezoneOffset() * 60000))
    const startString = startUTC.toISOString().split('.')[0]

    const endUTC = new Date(end.getTime() - (end.getTimezoneOffset() * 60000))
    const endString = endUTC.toISOString().split('.')[0]

    const newClass: ClassSchedule = {
      title: isCustom ? customClass : selectedClass,
      start: startString,
      end: endString,
      bgColor,
      isRepeat,
      isCustom
    }

    if (isRepeat && repeatRule) {
      repeatRule.map((rule) => {
        if (rule.repeatStart.split('T').length === 1) {
          rule.repeatStart += 'T00:00:00'
        }
        if (rule.repeatEnd.split('T').length === 1) {
          rule.repeatEnd += 'T23:59:59'
        }
      })
    
      newClass['repeatRule'] = repeatRule
    }

    if (isEdit) {
      await updateSchedule(newClass)
    } else {
      await addSchedule(newClass)
    }
  }

  const updateSchedule = async (schedule: ClassSchedule) => {
    const newSchedule: ClassSchedule = {
      title: schedule.title,
      start: schedule.start,
      end: schedule.end,
      bgColor: schedule.bgColor,
      isRepeat: schedule.isRepeat,
      isCustom: schedule.isCustom,
      repeatRule : schedule.isRepeat ? schedule.repeatRule : []
    }

    await updateDoc(doc(db, 'class_schedule', scheduleId), newSchedule as DocumentData).then(() => {
      setSubmitting(false)
      alert('수업을 수정했습니다')
      router.push('/admin/schedule')
    })
  }

  const addSchedule = async (schedule: ClassSchedule) => {
    await addDoc(collection(db, 'class_schedule'), schedule).then(() => {
      setSubmitting(false)
      alert('수업을 추가했습니다')
      router.push('/admin/schedule')
    })
  }

  return (
    <AdimnScheduleFormStyle>
      {
        loading ? (
          <Skeleton />
        ) : (
          <Fragment>
            <section>
              <div className="section-title">수업명</div>
              <DynoSelect value={selectedClass} onChange={onChangeClass}>
                {allClass.map((className, index) => (
                  <option key={index} value={className}>{className}</option>
                ))}
              </DynoSelect>
              {
                selectedClass === '직접 입력' && (
                  <DynoInput
                    type="text"
                    id="className"
                    name="className"
                    placeholder="수업명을 입력해주세요"
                    value={customClass}
                    onChange={handleClassNameChange}
                  />
                )
              }
            </section>
            <section>
              <div className="section-title">
                첫 수업 날짜
              </div>
              <div className="date-container">
                <DynoInput
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate.date}
                  onChange={(e) => onChangeStartDate(e, 'date')}
                />
                <div className="d-flex flex-column">
                  <div className="date-time-container d-flex">
                    <DynoSelect value={startDate.hour} onChange={(e) => onChangeStartDate(e, 'hour')}>
                      {HOURS.map((hour, index) => (
                        <option key={index} value={hour}>{hour}</option>
                      ))}
                    </DynoSelect>
                    <DynoSelect value={startDate.minute} onChange={(e) => onChangeStartDate(e, 'minute')}>
                      {MINUTES.map((minute, index) => (
                        <option key={index} value={minute}>{minute}</option>
                      ))}
                    </DynoSelect>
                    <div className='date-time-hint'>
                      부터
                    </div>
                  </div>
                  <div className="date-time-container d-flex">
                    <DynoSelect value={endDate.hour} onChange={(e) => onChangeEndDate(e, 'hour')}>
                      {HOURS.map((hour, index) => (
                        <option key={index} value={hour}>{hour}</option>
                      ))}
                    </DynoSelect>
                    <DynoSelect value={endDate.minute} onChange={(e) => onChangeEndDate(e, 'minute')}>
                      {MINUTES.map((minute, index) => (
                        <option key={index} value={minute}>{minute}</option>
                      ))}
                    </DynoSelect>
                    <div className='date-time-hint'>
                      까지
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="section-title">
                배경색
              </div>
              <DynoInput
                type="color"
                id="bgColor"
                name="bgColor"
                value={bgColor}
                onChange={onChangeColor}
              />
            </section>
            <section className='repeat-section'>
              <div className="section-header d-flex">
                <div className="section-title">
                  반복
                </div>
                {
                  isRepeat && (
                    <Button
                      size='small'
                      onClick={() => setRepeatRule([...repeatRule, initialRepeatRule])}
                    >
                      추가
                    </Button>
                  )
                }
              </div>
              <Toggle
                defaultChecked={isRepeat}
                onChange={handleToggleChange}
              />
              {
                isRepeat && (
                  repeatRule.map((rule, idx) => (
                    <div key={idx} className='repeat-rule-container'>
                      <div className='repeat-rule-day-container'>
                        <span className='repeat-day-title'>매주</span>
                        <DynoSelect value={rule.repeatDay} onChange={(e) => onChangeRepetDay(e, idx)}>
                          {
                            Object.keys(DayKorean).map((day, idx) => (
                              <option key={idx} value={day}>{DayKorean[day as keyof typeof DayKorean]}</option>
                            ))
                          }
                        </DynoSelect>
                      </div>
                      <div className='repeat-rule-time-container'>
                        <DynoInput
                          type="date"
                          id="repeatStartDate"
                          name="repeatStartDate"
                          value={rule.repeatStart.split('T')[0]}
                          onChange={(e) => onChangeRepeatDate(e, idx, 'start')}
                        />
                        ~
                        <DynoInput
                          type="date"
                          id="repeatEndDate"
                          name="repeatEndDate"
                          value={rule.repeatEnd.split('T')[0]}
                          onChange={(e) => onChangeRepeatDate(e, idx, 'end')}
                        />
                      </div>
                      {
                        repeatRule.length > 1 && (
                          <ImageButton
                            role='delete'
                            onClick={onDeleteRepeatRule(idx)}
                          />
                        )
                      }
                    </div>
                  ))
                )
              }
            </section>
            <Button
              onClick={handleSubmit}
              disabled={btnDisabled() || submitting}
            >
              { isEdit ? '수정하기' : '추가하기' }
            </Button>
          </Fragment>
        )
      }
    </AdimnScheduleFormStyle>
  )
}