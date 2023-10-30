'use client'

import { ArticleStyle } from '@/app/styles/styles'

import Button from '@/app/components/Atom/Button/Button'
import { useRouter } from 'next/navigation'

export default function TestimonialNotice() {
  const router = useRouter()

  const onClickHome = () => {
    router.push('/')
  }

  return (
    <ArticleStyle className='container'>
      <div className="article-title">
        후기 작성 안내
      </div>
      <div className='article-content'>
        <p>수업을 3개월 이상 수강하신 학부모님에 한해서 후기를 작성하실 수 있습니다.</p>
        <p>만약, 3개월 이상임에도 후기를 작성하실 수 없다면 다이노 선생님에게 문의해주세요!</p>
      </div>
      <div className="spacing"></div>
      <Button onClick={onClickHome} size='medium'>
        홈으로 돌아가기
      </Button>
    </ArticleStyle>
  )
}