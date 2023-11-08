import { Metadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { genPageMetadata } from '@/lib/utils/metadata'
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = genPageMetadata(METADATA.introMap)

export default function IntroMap() {
  return (
    <Map />
  )
}