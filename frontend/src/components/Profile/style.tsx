import { Card as BSCard } from 'react-bootstrap'
import styled from 'styled-components'
import theme from '../../theme'

export const Card = styled(BSCard)`
  background-color: ${theme.colors.blue_2};
  color: ${theme.colors.red_1};
  padding: 2px;
  margin-bottom: 15px;
  border-radius: 15px;
  .card-header {
    margin-bottom: 5px;
  }
  .card-header, .card-body {
    background-color: ${theme.colors.blue_1};
    border-radius: 15px;
  }
  
  .card-title {
    -webkit-text-stroke: .6px black;
    font-size: 25px;
  }
  .card-text {
    -webkit-text-stroke: .4px black;
    font-size: 18px;
  }
`
