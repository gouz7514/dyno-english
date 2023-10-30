import styled from 'styled-components'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/app/components/Atom/Button/Button'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import Skeleton from '@/app/components/Skeleton'

import { db } from "@/firebase/config"
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const AdminSimpleNoticeFormStyle = styled.div`
  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`

interface AdminSimpleNoticeFormProps {
  isEdit?: boolean
}

export default function AdminSimpleNoticeForm({ isEdit }: AdminSimpleNoticeFormProps) {
  const [simpleNotice, setSimpleNotice] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState(isEdit ? true : false)
  const simpleNoticeId = useSearchParams().get('id') as string
  const router = useRouter()

  const getSimpleNoticeInfo = async (id: string) => {
    const docRef = doc(db, 'notice_simple', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const docData = docSnap.data()
      setSimpleNotice(docData.content)
      setLoading(false)
    } else {
      alert('존재하지 않는 간단 공지사항입니다')
      router.replace('/admin/notice/simple')
    }
  }

  const memoizedSimpleNoticeInfo = useCallback(() => {
    const getSimpleNoticeInfo = async (id: string) => {
      const docRef = doc(db, 'notice_simple', id)
      const docSnap = await getDoc(docRef)
  
      if (docSnap.exists()) {
        const docData = docSnap.data()
        setSimpleNotice(docData.content)
        setLoading(false)
      } else {
        alert('존재하지 않는 간단 공지사항입니다')
        router.replace('/admin/notice/simple')
      }
    }

    if (isEdit) {
      getSimpleNoticeInfo(simpleNoticeId)
    }
  }, [isEdit, simpleNoticeId, router])

  useEffect(() => {
    memoizedSimpleNoticeInfo()
  }, [memoizedSimpleNoticeInfo])

  const handleSimpleNoticeChange = (e: any) => {
    setSimpleNotice(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    if (isEdit) {
      await updateSimpleNotice(simpleNoticeId)
    } else {
      await addSimpleNotice()
    }
  }

  const updateSimpleNotice = async (simpleNoticeId: string) => {
    await updateDoc(doc(db, 'notice_simple', simpleNoticeId), {
      content: simpleNotice,
    }).then(() => {
      alert('간단 공지사항을 수정했습니다')
      setSubmitting(false)
      router.push('/admin/notice/simple')
    })
  }

  const addSimpleNotice = async () => {
    await addDoc(collection(db, 'notice_simple'), {
      content: simpleNotice,
    }).then(() => {
      alert('간단 공지사항을 추가했습니다')
      setSubmitting(false)
      router.push('/admin/notice/simple')
    }).catch((error) => {
      alert(error.message)
      setSubmitting(false)
    })
  }

  const handleDelete = async (e: any) => {
    e.preventDefault()

    if (confirm('정말로 공지사항을 삭제하시겠습니까?')) {
      setSubmitting(true)
      await deleteDoc(doc(db, 'notice_simple', simpleNoticeId))
      setSubmitting(false)
      alert('간단 공지사항을 삭제했습니다')
      router.push('/admin/notice/simple')
    }
  }

  return (
    <div>
      {
        loading ? (
          <Skeleton />
        ) : (
          <AdminSimpleNoticeFormStyle>
            <div className="input-container">
              <DynoInput
                type="text"
                id="simpleNotice"
                name="simpleNotice"
                placeholder={ isEdit ? "수정할 간단 공지사항을 입력해주세요" : "새롭게 추가할 간단 공지사항을 입력해주세요" }
                value={simpleNotice}
                onChange={handleSimpleNoticeChange}
              />

            </div>
            <div className="button-container">
              {
                isEdit && (
                  <Button
                    color='danger'
                    onClick={handleDelete}
                    disabled={submitting}
                  >
                    삭제하기
                  </Button>
                )
              }
              <Button
                onClick={handleSubmit}
                disabled={simpleNotice === '' || submitting}
              >
                { isEdit ? '수정하기' : '추가하기' }
              </Button>
            </div>
          </AdminSimpleNoticeFormStyle>
        )
      }
    </div>
  )
}