'use client'

import styled from 'styled-components'

import { useEffect, useState, Suspense } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import EmptyState from '@/app/components/Molecule/EmptyState'
import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/Atom/Button/LinkButton'
import ListItem from '@/app/components/Atom/ListItem'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

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
    <Suspense fallback={<Skeleton />}>
      <AdminClassStyle className='container'>
          <div>
            <BackButton href="/admin/" />
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
                loading ? (
                  <Skeleton /> // Show a loading indicator if data is loading
                ) : (
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
                )
              }
            </div>
          </div>
      </AdminClassStyle>
    </Suspense>
  )
}

export default function AdminClassPage() {
  return (
    <IsStaff>
      <AdminClassContent />
    </IsStaff>
  )
}