'use client'

import '@/app/globals.css'

import StyledComponentsRegistry from '@/lib/registry'
import KakaoScript from './kakaoScript'

import Header from '@/app/components/Organism/Header/Header'
import Footer from '@/app/components/Organism/Footer'
import DynoTalk from '@/app/components/Molecule/DynoTalk'
import { SessionProvider } from 'next-auth/react'

export default function TestComponent({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <KakaoScript />
      <SessionProvider>
        <StyledComponentsRegistry>
          <Header />
          {children}
          <DynoTalk />
          <Footer />
        </StyledComponentsRegistry>
      </SessionProvider>
    </>
  )
}