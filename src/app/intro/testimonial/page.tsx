import { Metadata } from 'next'

import IntroTestimonialPage from "@/app/components/Page/intro/IntroTestimonialPage"
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = METADATA.introTestimonial

export default function IntroTestimonial() {
  return (
    <IntroTestimonialPage />
  )
}