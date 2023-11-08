import { Metadata } from 'next'

import Map from '@/app/components/Page/intro/IntroMap'
import { METADATA } from '@/lib/constants/constatns'
import { CustomMetadata } from '@/lib/utils/metadata'

// export const metadata: Metadata = new CustomMetadata(METADATA.introMap)
export const metadata: Metadata = {
  title: '다이노 영어 | 오시는 길',
  description: '다이노 영어 오시는 길',
  openGraph: {
    title: '다이노 영어 | 오시는 길 og',
    description: '다이노 영어 오시는 길 og',
  }
}

export default function IntroMap() {
  return (
    <Map />
  )
}