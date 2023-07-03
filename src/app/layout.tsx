'use client'

import './globals.css'

import StyledComponentsRegistry from '@/lib/registry'
import GlobalHeader from '@/lib/globalHeader'

import Header from './components/Header'
import Footer from './components/Footer'

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
        <meta property="og:image" content="https://dyno-english.vercel.app/image/og_dyno_english.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
