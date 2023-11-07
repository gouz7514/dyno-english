import { Metadata } from 'next'

import HomePage from "./components/Page/HomePage"
import { METADATA } from '@/lib/constants/constatns'

export const metadata: Metadata = METADATA.home

export default function Home() {
  return (
    <HomePage />
  )
}
