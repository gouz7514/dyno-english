import styled from 'styled-components'
import { useEffect, useState, useRef } from "react"
import { DocumentData } from "firebase/firestore"

import Button from '@/app/components/Atom/Button/Button'
import Toggle from '@/app/components/Molecule/Toggle/Toggle'
import DynoSelect from '@/app/components/Atom/Input/DynoSelect'

import { db } from "@/firebase/config"
import { doc, updateDoc } from 'firebase/firestore'

const ModalStyle = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    padding: 0 12px;
  }

  .modal.open {
    opacity: 1;
    visibility: visible;
  }

  .modal-container {
    max-width: 500px;
    min-width: 300px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .modal-content {
      display: flex;
      flex-direction: column;

      .modal-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;

        h3 {
          margin-bottom: 8px;
        }

        .modal-item-flex {
          display: flex;
          justify-content: space-between;

          .item-section {
            margin-bottom: 12px;
            gap: 8px;
          }

          .modal-item-flex-item {
            flex: 1;

            h4 {
              margin-bottom: 8px;
            }
          }
        }
      }
    }

    .button-container {
      display: flex;
      gap: 12px;
    }
  }
`

type ModalProps = {
  isOpen: boolean
  onClose: (message?: string) => void
  currentUser: DocumentData
  allClass: DocumentData[]
}

export default function Modal({ isOpen, onClose, currentUser, allClass }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [toggleValue, setToggleValue] = useState<boolean>(false)
  const [userKids, setUserKids] = useState<DocumentData[]>(currentUser.kids)

  const handleChangeSelect = (e: any, idx: number) => {
    const newKids = userKids.map((kid, i) => {
      if (i === idx) {
        return {
          ...kid,
          classId: e.target.value
        }
      }
      return kid
    })

    setUserKids(newKids)
  }

  const handleToggleChange = (isChecked: boolean) => {
    setToggleValue(isChecked)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen && currentUser) {
      setToggleValue(currentUser.testimonialAvailable)
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick)
      setUserKids(currentUser.kids)
    }

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }

  }, [onClose, isOpen, currentUser])


  const onSubmit = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUser.id), {
        testimonialAvailable: toggleValue,
        kids: userKids,
      })
      
      alert('수정되었습니다')
      onClose('UPDATED')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalStyle>
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <div className="modal-container" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-item">
              <h3>
                이름
              </h3>
              <div className="modal-item-content">
                { currentUser.name }
              </div>
            </div>
            <div className="modal-item">
              <h3>
                전화번호
              </h3>
              <div className="modal-item-content">
                { currentUser.phone }
              </div>
            </div>
            <div className="modal-item">
              <h3>
                아이 정보
              </h3>
              <div className={ `modal-item-flex ${userKids && userKids.length > 0 ? 'flex-column' : ''}` }>
                {
                  userKids && userKids.length ? (
                    userKids.map((kid: any, idx: number) => (
                    <div className='d-flex flex-column item-section' key={idx}>
                      <div className="d-flex justify-content-between">
                        <div className="modal-item-flex-item" key={`name-${idx}`}>
                          <h4>
                            이름
                          </h4>
                          <div className="modal-item-content">
                            { kid.name }
                          </div>
                        </div>
                        <div className="modal-item-flex-item" key={`birth-${idx}`}>
                          <h4>
                            생년월일
                          </h4>
                          <div className="modal-item-content">
                            { kid.birth }
                          </div>
                        </div>
                      </div>
                      <DynoSelect value={kid.classId} onChange={(e) => handleChangeSelect(e, idx)}>
                        {
                          allClass.map((cls) => (
                            <option value={cls.id} key={cls.id}>
                              { cls.name }
                            </option>
                          ))
                        }
                      </DynoSelect>
                    </div>
                  ))
                  ) : (
                    <>
                      <div className="modal-item-flex-item">
                        <h4>
                          이름
                        </h4>
                        <div className="modal-item-content">
                          정보가 없습니다
                        </div>
                      </div>
                      <div className="modal-item-flex-item">
                        <h4>
                          생년월일
                        </h4>
                        <div className="modal-item-content">
                          정보가 없습니다
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
            <div className="modal-item">
              <h3>
                후기 가능 여부
              </h3>
              <div className="modal-item-content">
                <Toggle
                  defaultChecked={currentUser.testimonialAvailable}
                  onChange={handleToggleChange}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <Button
              onClick={onClose}
            >
              닫기
            </Button>
            <Button
              color='default'
              onClick={onSubmit}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
}