'use client'

import './globals.css'

import StyledComponentsRegistry from '@/lib/registry'
import Script from 'next/script'

import Header from '@/app/components/Organism/Header/Header'
import Footer from '@/app/components/Organism/Footer'
import DynoTalk from '@/app/components/Molecule/DynoTalk'
import { SessionProvider } from 'next-auth/react'

const metadata = {
  title: '다이노 영어',
  description: '다이노 영어와 함께 영어를 배워보세요!',
  opengraph: {
    title: '다이노 영어',
    type: 'website',
    image: 'https://dyno-english.vercel.app/logo/og_dyno_english.webp',
    url: 'https://dynoenglish.com',
    description: '다이노 영어와 함께 영어를 배워보세요!',
    locale: 'ko_KR',
  }
}

declare global {
  interface Window {
    Kakao: any
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.opengraph.title} />
        <meta property="og:type" content={metadata.opengraph.type} />
        <meta property="og:image" content={metadata.opengraph.image} />
        <meta property="og:url" content={metadata.opengraph.url} />
        <meta property="og:description" content={metadata.opengraph.description} />
        <meta property="og:locale" content={metadata.opengraph.locale} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <Script
          type="text/javascript"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3u3f8mt3gd"
        ></Script>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
          integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
          crossOrigin='anonymous'
          onLoad={kakaoInit} 
        ></Script>
      </head>
      <body>
        <SessionProvider>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <DynoTalk />
            <Footer />
          </StyledComponentsRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
