import { Metadata } from 'next'

import IntroTeacherPage from '@/app/components/Page/intro/IntroTeacherPage'
import { genPageMetadata } from '@/lib/utils/metadata'
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = genPageMetadata(METADATA.introTeacher)

export default function IntroTeacher() {
  return (
    <IntroTeacherPage />
  )
}