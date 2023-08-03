import styled from 'styled-components'

const BadgeStyle = styled.span`
  padding: 6px 8px 4px;
  border-radius: 5px;
  background-color: var(--primary-green);
  color: white;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  height: 26px;
`

interface BadgeProps {
  text: string
}

export default function Badge({ text }: BadgeProps) {
  return (
    <BadgeStyle>
      <span>
        { text }
      </span>
    </BadgeStyle>
  )
}