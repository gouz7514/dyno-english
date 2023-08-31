'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import EmptyState from '@/app/components/Molecule/EmptyState'
import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/LinkButton'
import ListItem from '@/app/components/Atom/ListItem'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminClassStyle = styled.div`
  .content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .content-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`

/*
  TODO List
  1. 수업 클릭 시 해당 수업 정보 보이기 (커리큘럼, 과제, 수업 내용)
  2. 수업 내용 및 과제 추가 form
*/

function AdminClassContent() {
  const [classList, setClassList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  const getClass = async () => {
    const classRef = collection(db, 'class')
    const classSnapshot = await getDocs(classRef)
    const classList = classSnapshot.docs.map(doc => {
      const docData = {
        id: doc.id,
        name: doc.data().name
      }

      return docData
    })

    setClassList(classList)
    setLoading(false)
  }

  useEffect(() => {
    getClass()
  }, [])

  return (
    <AdminClassStyle className='container'>
      {
        loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="content-header">
              <div className='content-title'>
                수업 목록
              </div>
              <LinkButton href='/admin/class/form'>
                수업 추가
              </LinkButton>
            </div>
            <div className='content-container'>
              {
                classList.length === 0 ? (
                  <EmptyState
                    mainText="등록된 수업이 없습니다."
                    subText="수업을 추가해주세요."
                  />
                ) : (
                  classList.map((classItem, index) => (
                    <ListItem
                      key={index}
                      title={classItem.name}
                      href={`/admin/class/detail?id=${classItem.id}`}
                    />
                  ))
                )
              }
            </div>
          </div>
        )
      }
    </AdminClassStyle>
  )
}

export default function AdminClassPage() {
  return (
    <IsStaff>
      <AdminClassContent />
    </IsStaff>
  )
}