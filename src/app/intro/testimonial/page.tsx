import { Metadata } from 'next'

import IntroTestimonialPage from "@/app/components/Page/intro/IntroTestimonialPage"
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = new CustomMetadata(METADATA.introTestimonial)

export default function IntroTestimonial() {
  return (
    <IntroTestimonialPage />
  )
}