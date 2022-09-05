import React from 'react'
import { useMessageActions } from '../../state/message'
import { useInGameValue } from '../../state/game'
import { useWebsocketEvents } from '../../state/websocket'
import { useUserValue } from '../../state/user'
import Board from './Board'

const Game: React.FC = () => {
  const username = useUserValue()
  const inGame = useInGameValue()
  const { setMessage } = useMessageActions()
  const websocket = useWebsocketEvents()
  React.useEffect(() => {
    console.log({ username })
    if (!inGame) {
      setMessage('Waiting for opponent...')
      if (websocket != null && username !== '') { websocket.emit('find game', username) }
    }
  }, [username])
  if (websocket == null) return null
  return (
      <Board />
  )
}

export default Game
