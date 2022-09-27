import React from 'react'
import { Text } from '../Text'
import { useTimerValue } from '../../state/timer/hooks'

const Timer: React.FC = () => {
  const timer = useTimerValue()
  return (<Text>{timer}</Text>)
}

export default Timer
