import React from 'react'
import Board from './Board'
import { useGameActions, useInGameValue, useShowReplayValue } from '../../state/game/hooks'
import { useMessageActions } from '../../state/message/hooks'
import { useUserValue } from '../../state/user/hooks'
import { useWebsocket } from '../../state/websocket/hooks'
import { Events, Messages } from '../../enums'
import { Container } from 'react-bootstrap'
import Message from '../Message'
import Button from '../Button'
import Profile from '../Profile'
import Timer from '../Timer'

const Game: React.FC = () => {
  const { username } = useUserValue()
  const inGame = useInGameValue()
  const { setMessage } = useMessageActions()
  const websocket = useWebsocket()
  const showReplay = useShowReplayValue()
  const { resetGame } = useGameActions()
  const playAgainHandler = (): void => resetGame(websocket)
  React.useEffect(() => {
    if (!inGame) {
      setMessage(Messages.Waiting)
      if (websocket != null && username !== '') { websocket.emit(Events.FindGame, username) }
    }
  }, [username])
  if (websocket == null) return null

  return (
      <Container className='text-center'>
        <Profile />
        <Board />
        <Timer />
        <Message />
        {showReplay && <Button center={true} onClick={playAgainHandler}>Play again?</Button>}
      </Container>
  )
}

export default Game
