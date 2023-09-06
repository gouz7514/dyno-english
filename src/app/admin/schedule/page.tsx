'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import { ClassSchedule } from '@/types/types'

import EmptyState from '@/app/components/Molecule/EmptyState'
import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/LinkButton'
import ScheduleItem from '@/app/components/Molecule/ScheduleItem'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminScheduleStyle = styled.div`
  .content-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between;
    margin-bottom: 24px;

    .content-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`

function AdminScheduleContent() {
  const [scheduleList, setScheduleList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getSchedules = async () => {
    const scheduleRef = collection(db, 'class_schedule')
    const scheduleSnapshot = await getDocs(scheduleRef)
    const scheduleList = scheduleSnapshot.docs.map(doc => {
      const docData = {
        ...doc.data(),
        id: doc.id
      }

      return docData
    })

    setScheduleList(scheduleList)
    setLoading(false)
  }

  useEffect(() => {
    getSchedules()
  }, [])

  return (
    <AdminScheduleStyle className='container'>
      <div>
        <div className="content-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="content-title">
              수업 시간표
            </div>
            <LinkButton href="/admin/schedule/form">
              추가하기
            </LinkButton>
          </div>
          <span className='small-text text-gray'>
            * 하루만 진행하는 수업인 경우, 수업 시작일과 종료일이 나타납니다.
          </span>
        </div>
        {
          loading ? (
            <Skeleton />
          ) : (
            scheduleList.length === 0 ? (
              <EmptyState
                mainText="수업 일정이 없습니다."
                subText="시간표를 추가해주세요."
              />
            ) : (
              <div className="content-container">
                {
                  scheduleList.map((schedule) => (
                    <ScheduleItem
                      key={schedule.id}
                      schedule={schedule as ClassSchedule}
                    />
                  ))
                }
              </div>
            )
          )
        }
      </div>
    </AdminScheduleStyle>
  )
}

export default function AdminSchedulePage() {
  return (
    <IsStaff>
      <AdminScheduleContent />
    </IsStaff>
  )
}