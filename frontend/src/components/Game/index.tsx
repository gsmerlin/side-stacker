import React from 'react'
import Board from './Board'
import { useInGameValue } from '../../state/game/hooks'
import { useMessageActions } from '../../state/message/hooks'
import { useUserValue } from '../../state/user/hooks'
import { useWebsocketEvents } from '../../state/websocket/hooks'
import { Events, Messages } from '../../enums'

const Game: React.FC = () => {
  const username = useUserValue()
  const inGame = useInGameValue()
  const { setMessage } = useMessageActions()
  const websocket = useWebsocketEvents()
  React.useEffect(() => {
    console.log({ username })
    if (!inGame) {
      setMessage(Messages.Waiting)
      if (websocket != null && username !== '') { websocket.emit(Events.FindGame, username) }
    }
  }, [username])
  if (websocket == null) return null
  return (
      <Board />
  )
}

export default Game
