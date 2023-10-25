'use client'

import AdminSimpleNoticeForm from '@/app/components/Organism/AdminSimpleNoticeForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'

function AdminNoticeSimpleEditContet() {
  return (
    <FormStyle className='container'>
      <div className="form-title">
        <h1>
          간단 공지사항 수정하기
        </h1>
      </div>
      <AdminSimpleNoticeForm isEdit />
    </FormStyle>
  )
}

export default function AdminNoticeSimpleEditPage() {
  return (
    <IsStaff>
      <AdminNoticeSimpleEditContet />
    </IsStaff>
  )
}