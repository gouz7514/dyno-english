import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/app/components/Button'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import Skeleton from '@/app/components/Skeleton'

import { db } from "@/firebase/config"
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

interface AdminSimpleNoticeFormProps {
  isEdit?: boolean
}

export default function AdminSimpleNoticeForm({ isEdit }: AdminSimpleNoticeFormProps) {
  const [simpleNotice, setSimpleNotice] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState(isEdit ? true : false)
  const simpleNoticeId = useSearchParams().get('id') as string
  const router = useRouter()

  useEffect(() => {
    if (isEdit) getSimpleNoticeInfo()
  }, [isEdit])

  const getSimpleNoticeInfo = async () => {
    const docRef = doc(db, 'notice_simple', simpleNoticeId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const docData = docSnap.data()
      setSimpleNotice(docData.content)
      setLoading(false)
    } else {
      alert('존재하지 않는 간단 공지사항입니다')
      router.push('/admin/notice/simple')
    }
  }

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

  return (
    <div>
      {
        loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="input-container">
              <DynoInput
                type="text"
                id="simpleNotice"
                name="simpleNotice"
                placeholder="새롭게 추가할 간단 공지사항을 입력해주세요"
                value={simpleNotice}
                onChange={handleSimpleNoticeChange}
              />

            </div>
            <Button
              onClick={handleSubmit}
              disabled={simpleNotice === '' || submitting}
            >
              { isEdit ? '수정하기' : '추가하기' }
            </Button>
          </div>
        )
      }
    </div>
  )
}