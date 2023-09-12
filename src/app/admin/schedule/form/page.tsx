'use client'

import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import AdminScheduleForm from '@/app/components/Organism/AdminScheduleForm'

function AdminScheduleFormContent() {
  return (
    <FormStyle className='container'>
      <div className="form-title">
        <h1>
          수업 시간표 추가하기
        </h1>
      </div>
      <AdminScheduleForm />
    </FormStyle>
  )
}

export default function AdminScheduleFormPage() {
  return (
    <IsStaff>
      <AdminScheduleFormContent />
    </IsStaff>
  )
}