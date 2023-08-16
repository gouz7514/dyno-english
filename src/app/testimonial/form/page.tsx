'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Button from '@/app/components/Button'
import { FormStyle } from '@/app/styles/styles'
import DynoInput from '@/app/components/Atom/Input/DynoInput'

import { TestimonialProps } from '@/types/types'

import { db } from "@/firebase/config"
import { collection, addDoc } from 'firebase/firestore'

// form 로직 분리하기
export default function TestimonialForm() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [testimonials, setTestimonials] = useState<TestimonialProps>({
    by: '',
    content: '',
    id: '',
    createdAt: new Date()
  })

  const [errors, setErrors] = useState({
    by: '',
    content: '',
  })

  const [touched, setTouched] = useState({
    by: false,
    content: false,
  })

  const [loading, setLoading] = useState<boolean>(false)

  // blur 이벤트가 발생하면 touched 상태를 true로 바꾼다
  const handleBlur = (e: any) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    })
  }

  const handleChange = (e: any) => {
    setTestimonials({
      ...testimonials,
      [e.target.name]: e.target.value
    })
  }

  const validate = useCallback(() => {
    const errors = {
      by: '',
      content: ''
    }

    if (!testimonials.by) {
      errors.by = '이름을 입력해주세요.'
    }

    if (!testimonials.content) {
      errors.content = '내용을 입력해주세요.'
    }

    setErrors(errors)
    return errors
  }, [testimonials])

  useEffect(() => {
    validate()
  }, [validate])
  
  useEffect(() => {
    if (status !== 'loading') {
      if (!session || !session?.user) {
        alert('로그인 후 이용해주세요.')
        window.location.href = '/login'
      } else {
        if (!session?.user.testimonialAvailable) {
          router.push('/testimonial/notice')
        }
      }
    }
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    setTouched({
      by: true,
      content: true,
    })

    const errors = validate()
    setErrors(errors)

    if (Object.values(errors).some(v => v)) {
      return
    }
    
    const newTestimonial: TestimonialProps = {
      by: testimonials.by,
      content: testimonials.content,
      id: session?.user?.userId as string,
      createdAt: new Date()
    }
    
    await addDoc(collection(db, 'testimonials'), newTestimonial).then(() => {
      setLoading(false)
      alert('후기 등록 완료!')
      window.location.href = '/'
    })
  }

  return (
    <FormStyle className='container'>
      <div className='form-title'>
        <h1>후기 작성</h1>
      </div>
      <form>
        <div>
          <div className="input-container">
            <label htmlFor="name">이름</label>
            <DynoInput
              type="text"
              name="by"
              value={testimonials.by}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="input-error">
              {
                touched.by && errors.by && <span>{errors.by}</span>
              }
            </div>
          </div>
        </div>
        <div>
          <div className="input-container">
            <label htmlFor="content">내용</label>
            <textarea
              name="content"
              value={testimonials.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="input-error">
              {
                touched.content && errors.content && <span>{errors.content}</span>
              }
            </div>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={errors.by !== '' || errors.content !== ''}>{ loading ? '제출 중...' : '완료' }</Button>
      </form>
    </FormStyle>
  )
}