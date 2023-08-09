import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from'next/navigation'

import Skeleton from '../Skeleton'

type IsStaffProps = {
  children: React.ReactNode
}

export default function IsStaff({ children }: IsStaffProps) {
  const { data: session, status } = useSession()
  const [seconds, setSeconds] = useState(3)
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      alert('로그인이 필요합니다')
      router.push('/login')
      return
    }

    if (!session.user.isStaff) {
      const timer = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)

      setTimeout(() => {
        router.push('/')
        clearInterval(timer)
      }, seconds * 1000)

      return () => clearInterval(timer)
    }
  }, [session, status, seconds, router])

  if (status === 'loading') return (
    <div className="container">
      <Skeleton />
    </div>
  )

  if (!session) {
    alert('로그인이 필요합니다')
    router.push('/login')
    return
  }

  if (!session.user.isStaff) {
    return (
      <div className='container'>
        접근 권한이 없습니다. {seconds}초 후 메인 페이지로 이동합니다.
      </div>
    )
  }

  return children
}