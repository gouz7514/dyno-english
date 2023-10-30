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
import BackButton from '@/app/components/Atom/Button/BackButton'

const AdminCurriculumStyle = styled.div`
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

function AdminCurriculmContent() {
  const [curriculumList, setCurriculumList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getCurriculums = async () => {
    const curriculumRef = collection(db, 'class_curriculum')
    const curriculumSnapshot = await getDocs(curriculumRef)
    const curriculumList = curriculumSnapshot.docs.map(doc => {
      const docData = {
        id: doc.id,
        name: doc.data().name
      }

      return docData
    })

    setCurriculumList(curriculumList)
    setLoading(false)
  }

  useEffect(() => {
    getCurriculums()
  }, [])

  return (
    <AdminCurriculumStyle className='container'>
      {
        loading? (
          <Skeleton />
        ) : (
          <div>
            <BackButton href="/admin/" />
            <div className="content-header">
              <div className="content-title">
                커리큘럼 목록
              </div>
              <LinkButton href="/admin/curriculum/form">
                커리큘럼 추가
              </LinkButton>
            </div>
            <div className="content-container">
              {
                curriculumList.length === 0 ? (
                  <EmptyState
                    mainText="커리큘럼이 없습니다."
                    subText="커리큘럼을 추가해주세요."
                  />
                ) : (
                  curriculumList.map((curriculum, index) => (
                    <ListItem
                      key={index}
                      href={`/admin/curriculum/detail?id=${curriculum.id}`}
                      title={curriculum.name}
                    />
                  ))
                )
              }
            </div>
          </div>
        )
      }
    </AdminCurriculumStyle>
  )
}

export default function AdminCUrriculumPage() {
  return (
    <IsStaff>
      <AdminCurriculmContent />
    </IsStaff>
  )
}