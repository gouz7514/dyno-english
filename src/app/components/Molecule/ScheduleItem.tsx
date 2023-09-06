import styled from 'styled-components'

import ImageButton from '@/app/components/Atom/Button/ImageButton'

import {  DayKorean } from "@/types/types"

import { convertTimeToHHMM, convertTimeToMMDD } from '@/lib/utils/date'

interface ScheduleItemProps {
  key: string
  schedule: any,
  onClickDelete: (e: any) => void
}

const ScheduleItemStyle = styled.div`
  margin-bottom: 12px;
  background-color: #eee;
  border-radius: 12px;
  padding: 24px;

  .schedule-header {
    margin-bottom: 12px;

    .schedule-title-container {
      gap: 12px;
    }

    .schedule-title {
      font-size: 1.5rem;
    }

    .schedule-color {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }

  .schedule-time-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .schedule-time {
      gap: 6px;
    }
  }

  .schedule-repeat {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  .schedule-repeat-container {
    margin-top: 12px;
    gap: 6px;

    .schedule-repeat-time-container {
      display: flex;
      gap: 12px;
    }

    .schedule-repeat-content {
      gap: 6px;
    }
  }
`

export default function ScheduleItem({ schedule, onClickDelete }: ScheduleItemProps) {
  const { title, start, end, bgColor, isRepeat, repeatRule } = schedule
  
  return (
    <ScheduleItemStyle>
      <div className="schedule-header d-flex justify-content-between">
        <div className="schedule-title-container d-flex">
          <div className='schedule-color' style={{ backgroundColor: bgColor }} />
          <div className='schedule-title text-bold'>
            { title }
          </div>
        </div>
        <ImageButton role='delete' onClick={onClickDelete} />
      </div>
      <div className='schedule-content'>
        <div className="schedule-time-container">
          <div className="schedule-time d-flex flex-column">
            <div className='schedule-time-title text-bold-700'>
              수업 시작 시간
            </div>
            <div>
              { isRepeat ? convertTimeToHHMM(start) : convertTimeToMMDD(start) + ' ' + convertTimeToHHMM(start) }
            </div>
          </div>
          <div className="schedule-time d-flex flex-column">
            <div className='schedule-time-title text-bold-700'>
              수업 종료 시간
            </div>
            <div>
              { isRepeat ? convertTimeToHHMM(end) : convertTimeToMMDD(end) + ' ' + convertTimeToHHMM(end) }
            </div>
          </div>
        </div>
        {
          isRepeat && (
            <div className='schedule-repeat'>
              {
                  repeatRule.map((rule: any, idx: number) => (
                    <div key={idx} className='schedule-repeat-container d-flex flex-column'>
                      <div className='schedule-repeat-day text-bold-700'>
                        매주 { DayKorean[rule.repeatDay as keyof typeof DayKorean] }요일
                      </div>
                      <div className='schedule-repeat-time-container'>
                        <div className='schedule-repeat-content d-flex flex-column'>
                          <span>
                            { convertTimeToMMDD(rule.repeatStart) }
                          </span>
                        </div>
                        ~
                        <div className="schedule-repeat-content d-flex flex-column">
                          <span>
                            { convertTimeToMMDD(rule.repeatEnd) }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              }
            </div>
          )
        }
      </div>
    </ScheduleItemStyle>
  )
}