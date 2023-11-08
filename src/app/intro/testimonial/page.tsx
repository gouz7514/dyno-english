import { Metadata } from 'next'

import IntroTestimonialPage from "@/app/components/Page/intro/IntroTestimonialPage"
import { genPageMetadata } from '@/lib/utils/metadata'
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = genPageMetadata(METADATA.introTestimonial)

export default function IntroTestimonial() {
  return (
    <IntroTestimonialPage />
  )
}