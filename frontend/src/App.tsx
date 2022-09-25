import React from 'react'
import { Container } from 'react-bootstrap'
import Title from './components/Title'
import Login from './components/Login'
import Game from './components/Game'
import Message from './components/Message'
import Button from './components/Button'
import { useGameActions, useShowReplayValue } from './state/game/hooks'
import { useIsLoggedInValue } from './state/user/hooks'
import { useWebsocket } from './state/websocket/hooks'

const App: React.FC = () => {
  const isLoggedIn = useIsLoggedInValue()
  const showReplay = useShowReplayValue()
  const websocket = useWebsocket()
  const { resetGame } = useGameActions()
  const playAgainHandler = (): void => resetGame(websocket)

  return (
      <Container>
          <Title />
          {!isLoggedIn ? <Login /> : <Game />}
          <Message />
          {showReplay && <Button center={true} onClick={playAgainHandler}>Play again?</Button>}
      </Container>
  )
}

export default App
