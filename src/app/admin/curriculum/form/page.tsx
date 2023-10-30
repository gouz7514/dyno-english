'use client'

import AdminCurriculumForm from '@/app/components/Organism/AdminCurriculumForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

function AdminCurriculumFormContent() {
  return (
    <FormStyle className='container'>
      <BackButton href="/admin/curriculum" />
      <div className="form-title">
        <h1>
          커리큘럼 추가하기
        </h1>
      </div>
      <AdminCurriculumForm />
    </FormStyle>
  )
}

export default function AdminCurriculumFormPage() {
  return (
    <IsStaff>
      <AdminCurriculumFormContent />
    </IsStaff>
  )
}