import styled from 'styled-components'
import theme from '../../theme'
import { Form } from 'react-bootstrap'

export const Input = styled(Form.Control)`
  margin-bottom: 2.5%;
  ::placeholder {
    color: ${theme.colors.blue_1};
  }
`

export const Buttons = styled.div`
  button {
    margin-right: 5%;
    font-size: 25px
  }  
`
