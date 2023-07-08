'use client'

import './globals.css'

import StyledComponentsRegistry from '@/lib/registry'
import Script from 'next/script'

import Header from './components/Header'
import Footer from './components/Footer'
import DynoTalk from './components/DynoTalk'

const metadata = {
  title: '다이노 영어',
  description: '다이노 영어와 함께 영어를 배워보세요!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta charSet="utf-8" />
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://dyno-english.vercel.app/logo/og_dyno_english.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          type="text/javascript"
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=3u3f8mt3gd"
        ></Script>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <DynoTalk />
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
