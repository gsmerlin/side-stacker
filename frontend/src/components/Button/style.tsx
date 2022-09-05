import styled from 'styled-components'
import { Button as BSButton } from 'react-bootstrap'
import theme from '../../theme'

export const Button = styled(BSButton)`
  -webkit-text-stroke: 0.6px black;
  font-size: 20px;
  background-color: ${theme.colors.blue_2};
  color: ${theme.colors.red_1};
  border-color: ${theme.colors.blue_3};
  :hover, :focus {
    background-color: ${theme.colors.blue_3};
    color: ${theme.colors.red_2};
  }
  :disabled {
    border-color: ${theme.colors.blue_3};
    background-color: ${theme.colors.blue_1};
    color: ${theme.colors.red_1};
    pointer-events: none;
    opacity: 80%
  }
`
