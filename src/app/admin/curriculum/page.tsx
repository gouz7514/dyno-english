'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/LinkButton'
import CardItem from '@/app/components/Atom/CardItem'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminCurriculumStyle = styled.div`
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
            <div className="content-title">
              커리큘럼 목록
            </div>
            <LinkButton href="/admin/curriculum/form">
              커리큘럼 추가
            </LinkButton>
            <div className="content-container">
              {
                curriculumList.map((curriculum, index) => (
                  <CardItem
                    key={index}
                    href={`/admin/curriculum/${curriculum.id}`}
                    cardItem={curriculum}
                  />
                ))
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