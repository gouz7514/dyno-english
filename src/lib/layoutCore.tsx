import '@/app/globals.css'

import StyledComponentsRegistry from '@/lib/registry'
import ClientProvider from '@/lib/clientProvider'
import { authOptions } from "@/lib/auth"
import KakaoScript from './kakaoScript'

import Header from '@/app/components/Organism/Header/Header'
import Footer from '@/app/components/Organism/Footer'
import DynoTalk from '@/app/components/Molecule/DynoTalk'
import { getServerSession } from 'next-auth/next'

export default async function LayoutCore({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <KakaoScript />
      <StyledComponentsRegistry>
        <ClientProvider session={session}>
          <Header />
          {children}
          <DynoTalk />
          <Footer />
        </ClientProvider>
      </StyledComponentsRegistry>
    </>
  )
}