import styled from 'styled-components'
import { useEffect, useRef } from "react"

type ModalProps = {
  isOpen: boolean
  onClose: (message?: string) => void
  children: React.ReactNode
}

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
  }
`

export default function Modal({ isOpen, onClose, children } : ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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

  })

  return (
    <ModalStyle>
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <div className="modal-container" ref={modalRef}>
          {children}
        </div>
      </div>
    </ModalStyle>
  )
}