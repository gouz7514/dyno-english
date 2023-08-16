import styled from 'styled-components'

const SelectStyle = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 0 8px;
  appearance: none;
  background-image: url('/icon/icon-arrow-down.webp');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px 12px;
  margin-bottom: 12px;
`

type SelectProps = {
  value: any
  onChange: (e: any) => void
  children: React.ReactNode
}

export default function DynoSelect({ value, onChange, children }: SelectProps) {
  return (
    <SelectStyle value={value} onChange={onChange}>
      {children}
    </SelectStyle>
  )
}