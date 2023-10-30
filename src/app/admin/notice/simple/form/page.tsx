'use client'

import AdminSimpleNoticeForm from '@/app/components/Organism/AdminSimpleNoticeForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

function AdminNoticeSimpleFormContent() {
  return (
    <FormStyle className='container'>
      <BackButton href="/admin/notice/simple" />
      <div className="form-title">
        <h1>
          간단 공지사항 추가하기
        </h1>
      </div>
      <AdminSimpleNoticeForm />
    </FormStyle>
  )
}

export default function AdminNoticeSimpleFormPage() {
  return (
    <IsStaff>
      <AdminNoticeSimpleFormContent />
    </IsStaff>
  )
}