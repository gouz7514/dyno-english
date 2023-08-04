'use client'

import AdminClassForm from '@/app/components/Organism/AdminClassForm'
import { FormStyle } from '@/app/styles/styles'

export default function AdminClassFormPage() {
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