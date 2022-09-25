import React from 'react'
import { Text } from './style'
import { useMessageValue } from '../../state/message/hooks'

const Message: React.FC = () => {
  const message = useMessageValue()
  return <Text className={'text-center'}>{message}</Text>
}
export default Message
