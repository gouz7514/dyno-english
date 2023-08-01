import { useRef } from "react"

import styled from "styled-components"

import { Month } from '@/types/types'

interface Props {
  month: Month
  onClickToggle: (ref: React.RefObject<HTMLDivElement>) => void
}

const CurriculumMonthStyle = styled.div`
  margin-bottom: 12px;

  .class-curriculum {
    .class-curriculum-month {
      background-color: #eee;
      padding: 6px 12px;
      border-radius: 12px;
      display: flex;
      gap: 12px;

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
        cursor: pointer;
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

export default function CurriculumMonth({ month, onClickToggle }: Props) {
  const curriculumRef = useRef<HTMLDivElement>(null)

  return (
    <CurriculumMonthStyle>
      <div className='class-curriculum'>
        <div className='class-curriculum-month' ref={curriculumRef}>
          <div className="class-curriculum-month-title">
            Month { parseInt(month.id) + 1 }
          </div>
          <div className="class-curriculum-month-toggle" onClick={() => onClickToggle(curriculumRef)} />
        </div>
        <table className='class-curriculum-table'>
          <tbody>
            {
              Object.entries(month.weeks.week).map(([key, value]) => (
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