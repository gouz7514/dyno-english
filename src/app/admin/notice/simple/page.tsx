'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import EmptyState from '@/app/components/Molecule/EmptyState'
import Skeleton from '@/app/components/Molecule/Skeleton'
import LinkButton from '@/app/components/Atom/Button/LinkButton'
import ListItem from '@/app/components/Atom/ListItem'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

const AdminNoticeSimpleStyle = styled.div`
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

    .content-subtitle {
      margin-top: 8px;
    }
  }
`

function AdminNoticeSimpleContent() {
  const [simpleNoticeList, setSimpleNoticeList] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getSimpleNotice = async () => {
    const simpleNoticeRef = collection(db, 'notice_simple')
    const simpleNoticeSnapshot = await getDocs(simpleNoticeRef)
    const simpleNoticeList = simpleNoticeSnapshot.docs.map(doc => {
      const docData = {
        id: doc.id,
        content: doc.data().content,
      }

      return docData
    })

    setSimpleNoticeList(simpleNoticeList)
    setLoading(false)
  }

  useEffect(() => {
    getSimpleNotice()
  }, [])

  return (
    <AdminNoticeSimpleStyle className='container'>
      {
        loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="content-header">
              <div className="content-title-container">
                <BackButton href="/admin/" />
                <div className="d-flex justify-content-between">
                  <div className="content-title">
                    간단 공지사항
                  </div>
                  <LinkButton href='/admin/notice/simple/form'>
                    간단 공지사항 추가
                  </LinkButton>
                </div>
                <div className="content-subtitle">
                  프로필 페이지 상단에 노출되는 간단 공지사항을 관리합니다.
                </div>
              </div>
            </div>
            {
              simpleNoticeList.length === 0 ? (
                <EmptyState
                  mainText="등록된 간단 공지사항이 없습니다."
                  subText="간단 공지사항을 추가해주세요."
                />
              ) : (
                <div className="content-container">
                  {
                    simpleNoticeList.map((notice, index) => (
                      <ListItem
                        key={index}
                        title={notice.content}
                        href={`/admin/notice/simple/edit?id=${notice.id}`}
                      />
                    ))
                  }
                </div>
              )
            }
          </div>
        )
      }
    </AdminNoticeSimpleStyle>
  )
}

export default function AdminNoticeSimplePage() {
  return (
    <IsStaff>
      <AdminNoticeSimpleContent />
    </IsStaff>
  )
}