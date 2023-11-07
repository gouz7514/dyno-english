import { Metadata } from 'next'

import IntroTeacherPage from '@/app/components/Page/intro/IntroTeacherPage'
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = METADATA.introTeacher

export default function IntroTeacher() {
  return (
    <IntroTeacherPage />
  )
}