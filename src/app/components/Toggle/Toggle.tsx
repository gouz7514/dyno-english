import { useState, useEffect } from 'react'
import Switch from './Switch'

interface ToggleProps {
  defaultChecked: boolean
  onChange?: (isChecked: boolean) => void
}

export default function Toggle({ defaultChecked = false, onChange }: ToggleProps) {
  const [isChecked, setIsOn] = useState(defaultChecked || false)

  useEffect(() => {
    setIsOn(defaultChecked || false)
  }, [defaultChecked])

  const handleChange = () => {
    const newCheckedValue = !isChecked
    setIsOn(newCheckedValue)

    if (onChange) {
      onChange(newCheckedValue)
    }
  }

  return (
    <div className="toggle-container">
      <Switch
        on={isChecked}
        onClick={handleChange}
      />
    </div>
  )
}