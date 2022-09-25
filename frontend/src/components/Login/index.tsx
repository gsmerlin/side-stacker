import React from 'react'
import { Buttons, Input } from './style'
import { Form } from 'react-bootstrap'
import Button from '../Button'
import { useMessageActions } from '../../state/message/hooks'
import { useWebsocket } from '../../state/websocket/hooks'
import { Events, Messages } from '../../enums'
import Message from '../Message'

const Login: React.FC = () => {
  const websocket = useWebsocket()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { setMessage } = useMessageActions()
  if (websocket == null) return null
  const handleButton = (event: Events.Login | Events.Signup): void => {
    if (username === '') return setMessage(Messages.BlankUser)
    if (password === '') return setMessage(Messages.BlankPassword)
    websocket.emit(event, { username, password })
  }
  return (
        <Form>
            <Input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username: " />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password: " />
            <Buttons className={'text-center'}>
              <Button center={true} onClick={() => handleButton(Events.Login)}>Login</Button>
              <Button center={true} onClick={() => handleButton(Events.Signup)}>Create Account</Button>
            </Buttons>
            <Message />
        </Form >
  )
}
export default Login
