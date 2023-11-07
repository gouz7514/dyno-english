import { Metadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = METADATA.introMap

export default function IntroMap() {
  return (
    <Map />
  )
}