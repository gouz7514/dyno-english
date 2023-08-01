'use client'

import styled from 'styled-components'

import { useSession } from 'next-auth/react'
import { useRouter } from'next/navigation'

import Skeleton from '../components/Skeleton'
import ListItem from '../components/ListItem'

const AdminContainer = styled.div`
  .admin-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
  }
`

function IsStaff() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status !== 'loading') {
    if (!session) {
      alert('로그인이 필요합니다')
      router.push('/login')
      return
    }
    if (!session.user.isStaff) {
      return (
        <div>
          접근 권한이 없습니다.
        </div>
      )
    }
  }

  return (
    <div className='container'>
      {
        status === 'loading' ? (
          <div>
            <Skeleton />
          </div>
        ) : (
          <AdminContainer>
            <div className="admin-title">
              관리자 페이지
            </div>
            <div className="admin-item-container">
              <ListItem title="회원 관리" href="/admin/user" />
              <ListItem title="수업 관리" href="/admin/class" />
            </div>
          </AdminContainer>
        )
      }
    </div>
  )
}

export default function AdminPage() {
  return (
    <div>
      <IsStaff />
    </div>
  )
}