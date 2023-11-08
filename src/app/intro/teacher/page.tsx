import { Metadata } from 'next'

import IntroTeacherPage from '@/app/components/Page/intro/IntroTeacherPage'
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

// export const metadata: Metadata = new CustomMetadata(METADATA.introTeacher)

export default function IntroTeacher() {
  return (
    <IntroTeacherPage />
  )
}