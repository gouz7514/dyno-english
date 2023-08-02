import styled from 'styled-components'
import { useEffect, useState, useRef } from "react"
import { DocumentData } from "firebase/firestore"

import Button from '@/app/components/Button'
import Toggle from '@/app/components/Toggle/Toggle'

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
    height: 500px;
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
  currentClass: string
}

export default function Modal({ isOpen, onClose, currentUser, currentClass }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [toggleValue, setToggleValue] = useState<boolean>(currentUser.testimonialAvailable)

  const handleToggleChange = (isChecked: boolean) => {
    setToggleValue(isChecked)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }

  }, [onClose, isOpen])

  const onSubmit = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUser.id), {
        testimonialAvailable: toggleValue
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
            <div className='modal-item'>
              {/* 수업명은 전체 수업 정보 가져와서 토글로 할 수 있어야 한다 */}
              <h3>
                수업명
              </h3>
              <div className="modal-item-content">
                { currentClass }
              </div>
            </div>
            <div className="modal-item">
              <h3>
                아이 정보
              </h3>
              <div className="modal-item-flex">
                <div className="modal-item-flex-item">
                  <h4>
                    이름
                  </h4>
                  {
                    currentUser.kid && currentUser.kid.name ? (
                      <div className="modal-item-content">
                        { currentUser.kid.name }
                      </div>
                    ) : (
                      <div className='modal-item-content'>
                        정보가 없습니다
                      </div>
                    )
                  }
                </div>
                <div className="modal-item-flex-item">
                  <h4>
                    생년월일
                  </h4>
                  {
                    currentUser.kid && currentUser.kid.birth ? (
                      <div className="modal-item-content">
                        { currentUser.kid.birth }
                      </div>
                    ) : (
                      <div className='modal-item-content'>
                        정보가 없습니다
                      </div>
                    )
                  }
                </div>
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