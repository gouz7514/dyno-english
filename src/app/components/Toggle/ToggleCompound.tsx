import {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
  useContext,
  ReactNode,
  MouseEvent
} from 'react'

import Switch from './Switch'

interface ToggleContextType {
  on: boolean
  toggle: () => void
}

interface ToggleProps {
  onToggle: (on: boolean) => void;
  children: ReactNode
  testimonialAvailable: boolean
}

interface OnOffProps {
  children: ReactNode;
}

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLInputElement>) => void
}

const ToggleContext = createContext({})

function useEffectAfterMount(cb: () => void, dependencies: any[]) {
  const justMounted = useRef(true)
  useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

export default function Toggle(props: ToggleProps) {
  const [on, setOn] = useState(props.testimonialAvailable || false)
  const toggle = useCallback(() => setOn((on) => !on), [])

  useEffect(() => {
    setOn(props.testimonialAvailable || false)
  }, [props.testimonialAvailable])

  useEffectAfterMount(() => {
    props.onToggle(on)
  }
  , [on])

  const value = useMemo(() => ({ on, toggle }), [on])

  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  )
}

function On() {
  const { on } = useContext(ToggleContext) as ToggleContextType;
  return on ? <></> : null
}

function Off() {
  const { on } = useContext(ToggleContext) as ToggleContextType
  return on ? null : <></>
}

function Button(props: ButtonProps) {
  const { on, toggle } = useContext(ToggleContext) as ToggleContextType
  return <Switch on={on} onClick={toggle} {...props} />
}

Toggle.On = On
Toggle.Off = Off
Toggle.Button = Button