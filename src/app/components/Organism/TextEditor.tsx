'use client'

import styled from 'styled-components'

import DynoSelect from '@/app/components/Atom/Input/DynoSelect'
import DynoInput from '@/app/components/Atom/Input/DynoInput'
import Button from '@/app/components/Button'

import { useState, useEffect, useRef, ChangeEvent, use } from 'react'

const EditorStyle = styled.div`
  position: relative;

  .editor-area {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 12px;
    min-height: 200px;
  }
`

const ModalStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  z-index: 1;

  .drag-modal {
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    border: 1px solid #ccc;
    max-width: 300px;

    .button-container {
      margin-top: 12px;
      gap: 8px;
    }
  }

  &.open {
    opacity: 1;
    visibility: visible;
  }
`

interface TextEditorProps {
  isOpen: boolean
  content: string
  onInputChange?: (e: string) => void
  isEdit?: boolean
}

export default function TextEditor({ isOpen, content, onInputChange, isEdit }: TextEditorProps) {
  const selection = window.getSelection()
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [isDragged, setisDragged] = useState<boolean>(false)

  const [savedRange, setSavedRange] = useState<Range | null>(null)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [metaData, setMetaData] = useState({
    url: '',
    type: 'image'
  })

  // modal의 위치
  const [modalPosition, setModalPosition] = useState({
    left: '0px',
    top: '0px'
  })

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
    }
  }, [isOpen])

  const handleContentChange = (e: ChangeEvent<HTMLDivElement>) => {
    setisDragged(false)
    if (modalVisible) hideModal()
    onInputChange!(e.currentTarget.innerHTML)
  }

  const handleMouseDown = (e: any) => {
    setisDragged(false)
    if (modalVisible) hideModal()
    setInitialMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 드래그 끝났을 때 선택된 텍스트가 있다면 modal을 보여준다
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const deltaX = Math.abs(initialMousePosition.x - e.clientX)
    const deltaY = Math.abs(initialMousePosition.y - e.clientY)
    
    if (window.getSelection()?.toString() && (deltaX >= 10 || deltaY >= 10)) {
      setisDragged(true);
    }
    
    if (selection) {
      const range = selection.getRangeAt(0)
      setSavedRange(range)
      const rectRange = range.getBoundingClientRect()
      const rectEditor = editorRef.current?.getBoundingClientRect()
      
      const left = rectRange.left - rectEditor!.left
      const top = rectRange.top - rectEditor!.top
      
      // set modal position
      setModalPosition({
        left: left + 'px',
        top: top + rectRange.height + 10 + 'px'
      })

      if (range.toString()) {
        openModal()
      }
    }
  }

  useEffect(() => {
    // When the modal is opened, focus the input field
    if (modalVisible) {
      // Restore the saved selection range
      if (savedRange) {
        if (selection && selection.rangeCount > 0) {
          setTimeout(() => {
            selection.removeAllRanges();
            selection.addRange(savedRange);
          }, 0)
        }
      }
    }
  }, [modalVisible, savedRange])

  const openModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  const handleChangeMetadata = (e: ChangeEvent<HTMLInputElement>) => {
    setMetaData({
      ...metaData,
      url: e.target.value
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // get savedRange
    if (savedRange) {
      selection?.removeAllRanges()
      selection?.addRange(savedRange)
      // add property to selection with submitted metadata
      if (selection && selection.rangeCount > 0) {
        // add property to selection with metadata and wrap text
        const range = selection.getRangeAt(0)
        const node = document.createElement('span')
        node.setAttribute('data-url', metaData.url)
        node.setAttribute('data-type', metaData.type)
        node.innerText = metaData.url
        range.surroundContents(node)
        node.style.textDecoration = 'underline'
        node.style.cursor = 'pointer'
        
        if (!node.nextSibling?.textContent) {
          const textNode = document.createTextNode('\u00A0')
          const parent = node.parentElement
  
          if (parent) {
            parent.insertBefore(textNode, node.nextSibling)
          }
        }
      }
    }
    
    hideModal()
    setMetaData({
      url: '',
      type: 'image'
    })
    
    onInputChange!(editorRef.current?.innerHTML!)
  }

  return (
    <EditorStyle>
      <div
        ref={editorRef}
        className='editor-area'
        id="editor"
        contentEditable={true}
        onInput={handleContentChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragged ? 'grabbing' : 'auto'
        }}
      />
      <ModalStyle className={ `${modalVisible ? 'open' : 'close'}` } style={{ left: modalPosition.left, top: modalPosition.top}}>
        <div className='drag-modal'>
          <p>링크를 입력하세요</p>
          <DynoSelect value={metaData.type} onChange={(e) => setMetaData({ ...metaData, type: e.target.value })}>
            <option value="image">이미지</option>
            <option value="video">동영상</option>
          </DynoSelect>
          <DynoInput
            type="text"
            value={metaData.url}
            onChange={handleChangeMetadata}
          />
          <div className="button-container d-flex">
            <Button
              size='medium'
              onClick={onSubmit}
            >
              완료
            </Button>
            <Button
              size='medium'
              color='default'
              onClick={hideModal}
            >
              취소
            </Button>
          </div>
        </div>
      </ModalStyle>
    </EditorStyle>
  )
}