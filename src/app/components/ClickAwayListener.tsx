import { useEffect, useRef } from 'react'

interface ClickAwayListenerProps {
  onClickAway: () => void
  children: React.ReactNode
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  onClickAway,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      onClickAway()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}

export default ClickAwayListener
