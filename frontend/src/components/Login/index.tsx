import React from 'react'
import { Buttons, Input } from './style'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useMessageActions } from '../../state/message/hooks'
import { useWebsocketEvents } from '../../state/websocket/hooks'

const Login: React.FC = () => {
  const websocket = useWebsocketEvents()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { setMessage } = useMessageActions()
  if (websocket == null) return null
  const handleLogin = (): void => {
    if (username === '') return setMessage('Username cannot be left blank!')
    if (password === '') return setMessage('Password cannot be left blank!')
    websocket.emit('login', { username, password })
  }

  const handleSignUp = (): void => {
    if (username === '') return setMessage('Username cannot be left blank!')
    if (password === '') return setMessage('Password cannot be left blank!')
    websocket.emit('signup', { username, password })
  }
  return (
        <Form>
            <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username: " />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: " />
            <Buttons className={'text-center'}>
              <Button center={true} onClick={handleLogin}>Login</Button>
              <Button center={true} onClick={handleSignUp}>Create Account</Button>
            </Buttons>
        </Form >
  )
}
export default Login
