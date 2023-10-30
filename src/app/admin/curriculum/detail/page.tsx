'use client'

import AdminCurriculumForm from '@/app/components/Organism/AdminCurriculumForm'
import { FormStyle } from '@/app/styles/styles'
import IsStaff from '@/app/components/Template/IsStaff'
import BackButton from '@/app/components/Atom/Button/BackButton'

function AdminCurriculumEditContent() {
  return (
    <FormStyle className='container'>
      <BackButton href="/admin/curriculum" />
      <div className="form-title">
        <h1>
          커리큘럼 수정하기
        </h1>
      </div>
      <AdminCurriculumForm
        isEdit={true}
      />
    </FormStyle>
  )
}

export default function AdminCurriculumEditPage() {
  return (
    <IsStaff>
      <AdminCurriculumEditContent  />
    </IsStaff>
  )
}