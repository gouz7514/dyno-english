import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/app/components/Button'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'
import Skeleton from '@/app/components/Skeleton'

import { Hours, Minutes } from '@/lib/constants/constatns'

import { db } from "@/firebase/config"
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, DocumentData } from 'firebase/firestore'

import styled from 'styled-components'

const AdimnScheduleFormStyle = styled.div`
  .input-indicator {
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
`

interface AdminScheduleFormProps {
  isEdit?: boolean
}

const HOURS = Object.keys(Hours)
const MINUTES = Object.keys(Minutes)

export default function AdminScheduleForm({ isEdit }: AdminScheduleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(isEdit ? true : false)
  // 전체 수업 목록
  const [allClass, setAllClass] = useState<string[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [customClass, setCustomClass] = useState<string>('')
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

  // 버튼 비활성화 조건
  const isDisabled = () => {
    if (isCustom) {
      return customClass === '' || startDate.date === '' || endDate.date === ''
    } else {
      return selectedClass === '' || startDate.date === '' || endDate.date === ''
    }
  }
  

  const getAllClass = async () => {
    const classRef = collection(db, 'class')
    const classSnap = await getDocs(classRef)

    const classList = classSnap.docs.map(doc => {
      const classData = doc.data()
      return classData.name
    })

    classList.push('직접 입력')

    setAllClass(classList)
    setLoading(false)
    setSelectedClass(classList[0])
  }

  useEffect(() => {
    if (isEdit) {
      // TODO
    } else {
      getAllClass()
    }
  }, [])

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
      case 'date':
        setEndDate({
          ...endDate,
          date: e.target.value
        })
        break
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

  // 정보 제출
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const start = new Date(startDate.date)
    start.setHours(Hours[startDate.hour as keyof typeof Hours])
    start.setMinutes(Minutes[startDate.minute as keyof typeof Minutes])

    const end = new Date(endDate.date)
    end.setHours(Hours[endDate.hour as keyof typeof Hours])
    end.setMinutes(Minutes[endDate.minute as keyof typeof Minutes])

    if (start > end) {
      alert('수업 시작 시간이 수업 종료 시간보다 늦습니다')
      setLoading(false)
      return
    }

    const startUTC = new Date(start.getTime() - (start.getTimezoneOffset() * 60000))
    const startString = startUTC.toISOString().split('.')[0]

    const endUTC = new Date(end.getTime() - (end.getTimezoneOffset() * 60000))
    const endString = endUTC.toISOString().split('.')[0]

    const newClass = {
      title: isCustom ? customClass : selectedClass,
      start: startString,
      end: endString,
      bgColor,
      isRepeat
    }

    await addDoc(collection(db, 'class_schedule'), newClass).then(() => {
      setLoading(false)
      alert('수업을 추가했습니다')
      router.push('/admin/schedule')
    })
  }

  return (
    <AdimnScheduleFormStyle>
      <div className="input-container">
        <div className="input-indicator">수업명</div>
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
      </div>
      <div className='input-container'>
        <div className="input-indicator">
          수업 날짜
        </div>
        <div className="date-container">
          <DynoInput
            type="date"
            id="startDate"
            name="startDate"
            onChange={(e) => onChangeStartDate(e, 'date')}
          />
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
      <div className="input-container">
        <div className="input-indicator">
          배경색
        </div>
        <DynoInput
          type="color"
          id="bgColor"
          name="bgColor"
          value={bgColor}
          onChange={onChangeColor}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={isDisabled() || loading}
      >
        { isEdit ? '수정하기' : '추가하기' }
      </Button>
    </AdimnScheduleFormStyle>
  )
}