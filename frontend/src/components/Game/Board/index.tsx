import { Col, Container, Figure, Row } from 'react-bootstrap'
import React from 'react'
import X from '../../../assets/x.png'
import O from '../../../assets/o.png'
import Blank from '../../../assets/blank.png'
import Button from '../../Button/'
import { useBoardValue, useInGameValue, useTurnValue } from '../../../state/game/hooks'
import { useWebsocket } from '../../../state/websocket/hooks'
import { Events } from '../../../enums'

const getColImg = (col): string => {
  if (col.toLowerCase() === 'x') return X
  if (col.toLowerCase() === 'o') return O
  return Blank
}

const Board: React.FC = () => {
  const board = useBoardValue()
  const websocket = useWebsocket()
  const inGame = useInGameValue()
  const turn = useTurnValue()
  if (websocket == null) return null
  const buttonHandler = (row, side): void => {
    websocket.emit(Events.Move, { row, side })
  }
  return <Container>
        {board.map((row, rowIndex) => (
            <Row className="align-items-center" key={`${row.join('')}+${rowIndex}`}>
              <Button center={false} disabled={!inGame || !turn} onClick={() => buttonHandler(rowIndex, 'L')}>{rowIndex + 1}</Button>
              {row.map((col, index) => (
                  <Col className="align-items-center" key={`${col}+${index}+${row.join('')}`}>
                    <Figure.Image height={50} width={50} style={{ marginBottom: 'unset' }} src={getColImg(col)}/>
                  </Col>
              ))}
              <Button center={false} disabled={!inGame || !turn} onClick={() => buttonHandler(rowIndex, 'R')}>{rowIndex + 1}</Button>
            </Row>
        ))}
    </Container>
}

export default Board
