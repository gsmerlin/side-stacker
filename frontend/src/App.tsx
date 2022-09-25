import React from 'react'
import { Container } from 'react-bootstrap'
import Title from './components/Title'
import Login from './components/Login'
import Game from './components/Game'
import { useIsLoggedInValue } from './state/user/hooks'

const App: React.FC = () => {
  const isLoggedIn = useIsLoggedInValue()

  return (
      <Container>
          <Title />
          {!isLoggedIn ? <Login /> : <Game />}
      </Container>
  )
}

export default App
