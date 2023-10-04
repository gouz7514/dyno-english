'use client'

import styled from 'styled-components'

import { useState } from 'react'
import { storage } from '@/firebase/config'
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage'

const DynoUploaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: relative;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    position: relative; 

    .uploader {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      padding: 8px;
      cursor: pointer;

      .btn-upload {
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
        background-image: url(/icon/icon-upload.svg);
      }

      .file-name {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .uploading {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #ddd;
    opacity: 0.8;
    font-size: 14px;
  }

  .btn-copy {
    width: 24px;
    height: 24px;
    background-size: 24px 24px;
    background-image: url(/icon/icon-copy.svg);
    margin-right: 8px;
    cursor: pointer;
  }

  input {
    display: none;
  }
`

export default function DynoUploader() {
  const [uploading, setUploading] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [fileUrl, setFileUrl] = useState<string>('')

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      setUploading(true)
    } else {
      return
    }

    const file = e.target.files[0]
    const fileName = file.name
    const fileType = file.type.split('/')[0] === 'image' ? 'image' : 'video'

    const fileRef = ref(storage, `${fileType}/${fileName}`)

    try {
      uploadBytes(fileRef, file)
        .then((_) => {
          setUploading(false)
          alert('파일 업로드가 완료되었습니다')
  
          getDownloadURL(fileRef)
            .then((url) => {
              setFileUrl(url)
            })
        })
    } catch (error) {
      console.log(error)
      alert('파일 업로드에 실패했습니다')
    }

  }

  const onClickCopy = () => {
    navigator.clipboard.writeText(fileUrl)
      .then(() => {
        alert('URL이 복사되었습니다')
      })
  }

  return (
    <DynoUploaderStyle className="uploder-container">
      <label htmlFor="file">
        <div className='uploader'>
          <div className="btn-upload"></div>
          <div className="file-name">
            {selectedFile ? selectedFile.name : '파일을 선택해주세요'}
          </div>
        </div>
      </label>
      {
        uploading && (
          <div className="uploading">
            파일 업로드 중...
          </div>
        )
      }
      <div className="btn-copy" onClick={onClickCopy}></div>
      <input
        type="file"
        name="file"
        id="file"
        onChange={onSelectFile}
      />
    </DynoUploaderStyle>
  )
}