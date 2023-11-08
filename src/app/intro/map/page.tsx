import { Metadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

const IntroMapMetadta = new CustomMetadata(METADATA.introMap)
const { title, description, openGraph } = IntroMapMetadta
export const metadata: Metadata = {
  title,
  description,
  openGraph,
}

export default function IntroMap() {
  return (
    <Map />
  )
}