import { useRef } from "react"

import styled from "styled-components"

import { Month } from '@/types/types'

interface Props {
  month: Month
  idx: number
}

const CurriculumMonthStyle = styled.div`
  margin-bottom: 12px;

  .class-curriculum {
    border-radius: 12px;
    background-color: white;

    .class-curriculum-month {
      display: flex;
      gap: 12px;
      background-color: #d9d9d9;
      padding: 6px 12px;
      border-radius: 12px;
      cursor: pointer;

      .class-curriculum-month-title {
        font-size: 20px;
        font-weight: bold;
      }

      .class-curriculum-month-toggle {
        margin-left: auto;
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
        background-image: url('/icon/icon-arrow-down.svg');
      }

      &.show {
        .class-curriculum-month-toggle {
          background-image: url('/icon/icon-arrow-up.svg');
        }

        + .class-curriculum-table {
          display: table;
        }
      }
    }

    .class-curriculum-table {
      border-collapse: separate;
      border-spacing: 6px 12px;
      display: none;

      .class-curriculum-week {
        width: 80px;
        font-weight: bold;
      }
    }
  }
`

export default function CurriculumMonth({ month, idx }: Props) {
  const curriculumRef = useRef<HTMLDivElement>(null)

  const onClickToggle = (ref: React.RefObject<HTMLDivElement>) => {
    const element = ref.current

    if (element) {
      element.classList.toggle('show')
    }
  }

  return (
    <CurriculumMonthStyle>
      <div className='class-curriculum'>
        <div className='class-curriculum-month' ref={curriculumRef} onClick={() => onClickToggle(curriculumRef)}>
          <div className="class-curriculum-month-title">
            Month { idx + 1 }
          </div>
          <div className="class-curriculum-month-toggle"/>
        </div>
        <table className='class-curriculum-table'>
          <tbody>
            {
              Object.entries(month.days).map(([key, value]) => (
                <tr key={key}>
                  <td className='class-curriculum-week'>
                    Day { parseInt(key) + 1 }
                  </td>
                  <td>
                    { value.content }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </CurriculumMonthStyle>
  )
}