import { View } from 'react-big-calendar'

import styled from 'styled-components'

type ToolbarProps = {
  view: View
  label: string
  setCalendarView: (view: View) => void
  onNavigate?: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void
}

const CalendarContainer = styled.div`
  .rbc-toolbar {
    display: flex;
    flex-direction: column;
    padding: 0 12px;

    .rbc-toolbar-label {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .rbc-btn-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    
    button {
      &.active,
      &:hover {
        background-color: var(--primary-green);
        color: #fff;
      }
    }
  }
`

export default function Toolbar({ view, label, setCalendarView, onNavigate }: ToolbarProps) {
  return (
    <CalendarContainer>
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">
          {label}
        </span>
        <div className="rbc-btn-container">
          <span className="rbc-btn-group">
            <button
              type="button"
              className="rbc-btn rbc-btn-primary"
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate('PREV')
                }
              }}
            >
              이전
            </button>
            <button
              type="button"
              className="rbc-btn rbc-btn-primary"
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate('TODAY')
                }
              }}
            >
              오늘
            </button>
            <button
              type="button"
              className="rbc-btn rbc-btn-primary"
              onClick={(e) => {
                if (onNavigate) {
                  onNavigate('NEXT')
                }
              }}
            >
              다음
            </button>
          </span>
          <span className="rbc-btn-group">
            <button
              type="button"
              className={`rbc-btn rbc-btn-primary ${view === 'month' ? 'active' : ''}`}
              onClick={(e) => {
                setCalendarView('month')
              }}
            >
              월
            </button>
            <button
              type="button"
              className={`rbc-btn rbc-btn-primary ${view === 'week' ? 'active' : ''}`}
              onClick={(e) => {
                setCalendarView('week')
              }}
            >
              주
            </button>
          </span>
        </div>
      </div>
    </CalendarContainer>
  )
}