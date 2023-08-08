import styled from 'styled-components'

import { DocumentData } from 'firebase/firestore'
import Link from 'next/link'

const ClassItemStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-green);
  color: white;
  font-weight: 900;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

interface IClassItemProps {
  href: string
  classItem: DocumentData
}

export default function ClassItem({ href, classItem }: IClassItemProps) {
  return (
    <Link href={href}>
      <ClassItemStyle>
        <div className="content-name">
          { classItem.name }
        </div>
      </ClassItemStyle>
    </Link>
  )
}