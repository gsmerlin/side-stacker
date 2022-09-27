import React from 'react'
import { useMessageValue } from '../../state/message/hooks'
import { Text } from '../Text'

const Message: React.FC = () => {
  const message = useMessageValue()
  return <Text className={'text-center'}>{message}</Text>
}
export default Message
