import styled from 'styled-components'

import {  DayKorean } from "@/types/types"

import { convertTimeToHHMM, convertTimeToMMDD } from '@/lib/utils/date'

interface ScheduleItemProps {
  key: string
  schedule: any
}

const ScheduleItemStyle = styled.div`
  margin-bottom: 12px;
  background-color: #eee;
  border-radius: 12px;
  padding: 24px;

  .schedule-title-container {
    margin-bottom: 12px;

    .schedule-title {
      font-size: 1.5rem;
    }

    .schedule-color {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }

  .schedule-time-container {
    margin-bottom: 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .schedule-time {
      gap: 6px;
    }
  }

  .schedule-repeat-container {
    margin-top: 12px;
    gap: 12px;

    .schedule-repeat-time-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .schedule-repeat-content {
      gap: 6px;
    }
  }
`
/*
  단건 수업인 경우 시작 시간, 종료 시간 어떻게 표현할지
  반복 수업인 경우 반복 시작, 반복 종료일 옆에 요일 표시해야 함
*/
export default function ScheduleItem(props: ScheduleItemProps) {
  const { title, start, end, bgColor, isRepeat, repeatRule } = props.schedule
  
  return (
    <ScheduleItemStyle>
      <div className="schedule-title-container d-flex justify-content-between">
        <div className='schedule-title text-bold'>
          { title }
        </div>
        <div className='schedule-color' style={{ backgroundColor: bgColor }} />
      </div>
      <div className='schedule-content'>
        <div className="schedule-time-container">
          <div className="schedule-time d-flex flex-column">
            <div className='schedule-time-title text-bold-700'>
              수업 시작 시간
            </div>
            <div>
              { convertTimeToHHMM(start) }
            </div>
          </div>
          <div className="schedule-time d-flex flex-column">
            <div className='schedule-time-title text-bold-700'>
              수업 종료 시간
            </div>
            <div>
              { convertTimeToHHMM(end) }
            </div>
          </div>
        </div>
        <div>
          {
            isRepeat && (
              repeatRule.map((rule: any, idx: number) => (
                <div key={idx} className='schedule-repeat-container d-flex flex-column'>
                  <div className='schedule-repeat-day text-bold-700'>
                    매주 { DayKorean[rule.repeatDay as keyof typeof DayKorean] }요일
                  </div>
                  <div className='schedule-repeat-time-container'>
                    <div className='schedule-repeat-content d-flex flex-column'>
                      <div className="schedule-repeat-title text-bold-700">
                        반복 시작
                      </div>
                      <div>
                        { convertTimeToMMDD(rule.repeatStart) }
                      </div>
                    </div>
                    <div className="schedule-repeat-content d-flex flex-column">
                      <div className="schedule-repeat-title text-bold-700">
                        반복 종료
                      </div>
                      <div>
                        { convertTimeToMMDD(rule.repeatEnd) }
                      </div>
                    </div>
                  </div>
                </div>
              )
              )
            )
          }
        </div>
      </div>
    </ScheduleItemStyle>
  )
}