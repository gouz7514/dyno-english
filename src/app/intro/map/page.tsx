import { Metadata, ResolvingMetadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

// export const metadata: Metadata = new CustomMetadata(METADATA.introMap)
export async function generateMetadata() {
  return new CustomMetadata(METADATA.introMap)
}

export default function IntroMap() {
  return (
    <Map />
  )
}