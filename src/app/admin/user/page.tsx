'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import Skeleton from '@/app/components/Skeleton'
import ModalUser from '@/app/components/Modal/ModalUser'
import ListItem2 from '@/app/components/Atom/ListItem2'
import IsStaff from '@/app/components/Template/IsStaff'

const AdminUserStyle = styled.div`
  max-width: 1024px;

  .admin-user-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    align-items: center;

    &-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
`

function AdminUserContent() {
  const [users, setUsers] = useState<DocumentData[]>([])
  const [dynoClass, setDynoClass] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<DocumentData>([])
  const [isUpdated, setIsUpdated] = useState(false)
  
  const getUsers = async () => {
    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)
    const users = usersSnapshot.docs.map((doc) => doc.data())
    
    setUsers(users)
    setLoading(false)
  }

  const getClass = async () => {
    const classRef = collection(db, 'class')
    const classSnapshot = await getDocs(classRef)
    const classList = classSnapshot.docs.map((doc) => {
      const classData = doc.data()
      classData.id = doc.id
      return classData
    })

    setDynoClass(classList)
  }

  useEffect(() => {
    getUsers()
    getClass()
  }, [])

  // when user info is updated, get updated user info
  useEffect(() => {
    if (isUpdated) {
      getUsers()
      setIsUpdated(false)
    }
  }, [isUpdated])
      

  const onClickUser = function(user: DocumentData) {
    setIsModalOpen((prevState) => !prevState)
    setCurrentUser(user)
  }

  const handleModalClose = function(message?: string) {
    setIsModalOpen(false)

    if (message === 'UPDATED') {
      setIsUpdated(true)
    }
  }

  return (
    <AdminUserStyle className='container'>
      {
        loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="admin-user-list">
              <div className="admin-user-list-title">
                회원 목록
              </div>
              <div>
                총 회원 수: {users.length}
              </div>
            </div>
            <div>
              {
                users.map((user, idx) => {
                  const userKidsName = user.kids.map((kid: any) => kid.name).join(', ')
                  const userItemTitle = userKidsName ? `${user.name} (${userKidsName} 학부모님)` : user.name
                  return (
                    <ListItem2
                      key={idx}
                      title={userItemTitle}
                      onClick={() => onClickUser(user)}
                    />
                  )
                })
              }
            </div>
          </div>
        )
      }
      <ModalUser
        isOpen={isModalOpen}
        onClose={handleModalClose}
        currentUser={currentUser}
        currentClassId={currentUser.class ? currentUser.class.id : ''}
        allClass={dynoClass}
      />
    </AdminUserStyle>
  )
}

export default function AdminUser() {
  return (
    <IsStaff>
      <AdminUserContent />
    </IsStaff>
  )
}