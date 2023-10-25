'use client'

import AdminClassForm from '@/app/components/Organism/AdminClassForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'

function AdminClassFormContent() {
  return (
    <FormStyle className='container'>
      <div className="form-title">
        <h1>
          수업 정보 추가하기
        </h1>
      </div>
      <AdminClassForm />
    </FormStyle>
  )
}

export default function AdminClassFormPage() {
  return (
    <IsStaff>
      <AdminClassFormContent />
    </IsStaff>
  )
}