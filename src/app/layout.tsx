import { Metadata } from 'next'
import { Metadata as MetadataClass } from '@/lib/utils/metadata'

import Script from 'next/script'
import Head from 'next/head'
import LayoutCore from "@/lib/layoutCore"

declare global {
  interface Window {
    Kakao: any
  }
}

export const metadata: Metadata = new MetadataClass()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <Head>
        <title>다이노 영어</title>
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
