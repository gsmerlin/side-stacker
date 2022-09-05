import React from 'react'
import { useMessageValue } from '../../state/message'
import { Text } from './style'

const Message: React.FC = () => {
  const message = useMessageValue()
  return <Text className={'text-center'}>{message}</Text>
}
export default Message
