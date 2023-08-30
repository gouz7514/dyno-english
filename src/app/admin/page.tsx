'use client'

import styled from 'styled-components'

import ListItem from '@/app/components/Atom/ListItem'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminContainer = styled.div`
  .admin-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
  }
`

function AdminContent() {
  return (
    <AdminContainer className='container'>
      <div className="admin-title">
        관리자 페이지
      </div>
      <div className="admin-item-container">
        <ListItem title="회원 관리" href="/admin/user" />
        <ListItem title="수업 관리" href="/admin/class" />
        <ListItem title="커리큘럼 관리" href="/admin/curriculum" />
        <ListItem title="간단 공지사항 관리" href="/admin/notice/simple" />
      </div>
    </AdminContainer>
  )
}

export default function AdminPage() {
  return (
    <IsStaff>
      <AdminContent />
    </IsStaff>
  )
}