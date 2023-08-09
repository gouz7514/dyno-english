'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/LinkButton'
import ClassItem from '@/app/components/Molecule/ClassItem'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminClassStyle = styled.div`
  max-width: 1024px;

  .content-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
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
            <div className='content-title'>
              수업 목록
            </div>
            <LinkButton href='/admin/class/form'>
              수업 추가
            </LinkButton>
            <div className='content-container'>
              {
                classList.map((classItem, index) => (
                  <ClassItem
                    key={index}
                    href={`/admin/class/${classItem.id}`}
                    classItem={classItem}
                  />
                ))
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