import { Metadata } from 'next'

import Script from 'next/script'
import Head from 'next/head'
import LayoutCore from "@/lib/layoutCore"

declare global {
  interface Window {
    Kakao: any
  }
}

const METADATA = {
  title: '다이노 영어',
  description: '다이노 영어와 함께 영어를 배워보세요!',
  openGraph: {
    title: '다이노 영어',
    type: 'website',
    image: 'https://dyno-english.vercel.app/logo/og_dyno_english.webp',
    url: 'https://dynoenglish.com',
    description: '다이노 영어와 함께 영어를 배워보세요!',
    locale: 'ko_KR',
  }
}

export const metadata: Metadata = METADATA

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <Head>
        <title>{ METADATA.title }</title>
        <meta name="naver-site-verification" content="63f93978ef407fabe9271f046062a63e08227120" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Script
        type="text/javascript"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3u3f8mt3gd"
      ></Script>
      <body>
        <LayoutCore>
          {children}
        </LayoutCore>
      </body>
    </html>
  )
}
