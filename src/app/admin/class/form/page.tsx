'use client'

import AdminClassForm from '@/app/components/Organism/AdminClassForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

function AdminClassFormContent() {
  return (
    <FormStyle className='container'>
      <BackButton href="/admin/class" />
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