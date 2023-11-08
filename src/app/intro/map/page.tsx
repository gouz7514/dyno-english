import { Metadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = new CustomMetadata(METADATA.introMap).getMetadata()

export default function IntroMap() {
  return (
    <Map />
  )
}