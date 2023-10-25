import styled from 'styled-components'

interface CalloutProps {
  title: string
  children: React.ReactNode
}

const CalloutStyle = styled.div`
  border-radius: 8px;
  background-color: #eee;
  padding: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;

  .callout-title {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.1em;
  }
`

export default function Callout({ title, children }: CalloutProps) {
  return (
    <CalloutStyle>
      <div className='callout-title'>
        💡 { title }
      </div>
      { children }
    </CalloutStyle>
  )
}