'use client'

import styled from 'styled-components'

const DividerContainer = styled.div`
  border: 1px solid #eeeeee;
  width: 100%;
  margin: 24px auto;

  &.short {
    width: 25%;
  }
`

interface DividerProps {
  short?: boolean
}

export default function Divider({ short = false }: DividerProps) {
  return (
    <DividerContainer className={ `${short ? 'short' : ''}` } />
  )
}