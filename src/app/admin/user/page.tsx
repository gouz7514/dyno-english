'use client'

import styled from 'styled-components'

import { useEffect, useState } from 'react'

import { db } from '@/firebase/config'
import { getDocs, collection, DocumentData } from 'firebase/firestore'

import Skeleton from '@/app/components/Skeleton'
import ModalUser from '@/app/components/Modal/ModalUser'

const AdminUserStyle = styled.div`
  max-width: 1024px;

  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    align-items: center;

    &-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  table {
    width: 100%;
    border-spacing: 0;

    th {
      padding: 4px;
      border: 1px solid #eee;
    }

    tbody {
      tr {
        border: 1px solid #000;
        background-color: #ddd;
        height: 40px;

        &.table-user-row {
          cursor: pointer;
        }
      }
    
      td {
        text-align: center;
        border: 1px solid #eee;
      }
    }
  }
`

export default function AdminUser() {
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
    const classRef = collection(db, 'classes')
    const classSnapshot = await getDocs(classRef)
    const classes = classSnapshot.docs.map((doc) => doc.data())

    setDynoClass(classes)
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

  const getClassName = function(classId: string) {
    const className = dynoClass.filter((cls) => cls.id === classId)
    return className[0].name
  }

  return (
    <AdminUserStyle className='container'>
      {
        loading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="table-header">
              <div className="table-header-title">
                회원 목록
              </div>
              <div>
                총 회원 수: {users.length}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th rowSpan={2}>
                    이름
                  </th>
                  <th rowSpan={2}>
                    전화번호
                  </th>
                  <th rowSpan={2}>
                    수업명
                  </th>
                  <th colSpan={2}>
                    아이 정보
                  </th>
                  <th rowSpan={2}>
                    후기 가능 여부
                  </th>
                </tr>
                <tr>
                  <th>
                    이름
                  </th>
                  <th>
                    생년월일
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, idx) => {
                    return (
                      <tr
                        key={idx}
                        onClick={() => onClickUser(user)}
                        className="table-user-row"
                      >
                        <td>
                          {user.name}
                        </td>
                        <td>
                          {user.phone}
                        </td>
                        <td>
                          {
                            dynoClass.map((cls) => {

                              if (cls.id === user.class.id) {
                                return cls.name
                              }
                            })
                          }
                        </td>
                        <td>
                          {user.kid.name}
                        </td>
                        <td>
                          {user.kid.birth}
                        </td>
                        <td>
                          {user.testimonialAvailable ? '가능' : '불가능'}
                        </td>
                      </tr>
                    )
                  }
                  )
                }
              </tbody>
            </table>
          </div>
        )
      }
      <ModalUser
        isOpen={isModalOpen}
        onClose={handleModalClose}
        currentUser={currentUser}
        currentClass={currentUser.class ? getClassName(currentUser.class.id) : ''}
      />
    </AdminUserStyle>
  )
}