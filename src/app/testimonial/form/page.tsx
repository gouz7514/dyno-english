'use client'

import { useEffect, useState, useCallback } from 'react'
import Button from '@/app/components/Button'

import styled from 'styled-components'

import { TestimonialProps } from '@/types/types'

import { useSession } from 'next-auth/react'
import api from '@/lib/api'

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding: 24px;

  .form-title {
    margin-bottom: 24px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      margin-bottom: 8px;
    }

    input[type=text] {
      height: 40px;
      border-radius: 8px;
      padding-left: 8px;
      outline: none;
      border: 0;

      &:focus {
        border: 1px solid var(--primary-green);
      }
    }

    .input-error {
      margin-top: 8px;
      color: red;
      font-size: 12px;
      height: 12px;
    }

    textarea {
      height: 200px;
      border-radius: 8px;
      padding: 8px;
      outline: none;
      border: 0;

      &:focus {
        border: 1px solid var(--primary-green);
      }
    }
  }
`

export default function TestimonialForm() {
  const { data: session, status } = useSession()
  const [testimonials, setTestimonials] = useState<TestimonialProps>({
    author: '',
    content: '',
  })

  const [errors, setErrors] = useState({
    author: '',
    content: '',
  })

  const [touched, setTouched] = useState({
    author: false,
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
      author: '',
      content: ''
    }

    if (!testimonials.author) {
      errors.author = '이름을 입력해주세요.'
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
        window.location.href = '/'
      }
    }
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    setTouched({
      author: true,
      content: true,
    })

    const errors = validate()
    setErrors(errors)

    if (Object.values(errors).some(v => v)) {
      return
    }
    
    const newTestimonial: TestimonialProps = {
      author: testimonials.author,
      content: testimonials.content,
    }

    try {
      api.post('/testimonials', {
        ...newTestimonial,
        user_id: session?.user?.user_id
      }).then((res) => {
        const resData = res.data

        if (resData.status === 201) {
          setLoading(false)
          alert('후기 등록 완료!')
          window.location.href = '/intro/testimonial'
        }
      })
    } catch (error) {
      alert('후기 등록에 실패했습니다.')
      setLoading(false)
      return
    }
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
            <input
              type="text"
              name="author"
              value={testimonials.author}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="input-error">
              {
                touched.author && errors.author && <span>{errors.author}</span>
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
        <Button onClick={handleSubmit} disabled={errors.author !== '' || errors.content !== ''}>{ loading ? '제출 중...' : '완료' }</Button>
      </form>
    </FormStyle>
  )
}