'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import Skeleton from '@/app/components/Skeleton'
import LinkButton from '@/app/components/LinkButton'

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
  }

  .content-item {
    border-radius: 12px;
    width: 200px;
    height: 200px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-green);
    color: white;
    font-weight: 900;
    font-size: 24px;
    cursor: pointer;
    margin-top: 40px;

    &:hover {
      transform: scale(1.05);
    }
  }
`

export default function AdminClass() {
  const [classList, setClassList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)

  const getClass = async () => {
    const classRef = collection(db, 'class')
    const classSnapshot = await getDocs(classRef)
    const classList = classSnapshot.docs.map(doc => doc.data())

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
                  <div key={index} className='content-item'>
                    <div className="content-name">
                      { classItem.name }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </AdminClassStyle>
  )
}