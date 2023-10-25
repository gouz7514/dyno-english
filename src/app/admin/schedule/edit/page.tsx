'use client'

import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import AdminScheduleForm from '@/app/components/Organism/AdminScheduleForm'

function AdminScheduleEditContent() {
  return (
    <FormStyle className='container'>
      <div className="form-title">
        <h1>
          수업 시간표 수정하기
        </h1>
      </div>
      <AdminScheduleForm isEdit={true} />
    </FormStyle>
  )
}

export default function AdminScheduleEditPage() {
  return (
    <IsStaff>
      <AdminScheduleEditContent />
    </IsStaff>
  )
}