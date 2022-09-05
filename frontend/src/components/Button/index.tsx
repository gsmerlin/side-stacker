import { Button as StyledButton } from './style'
import React from 'react'
import { Col } from 'react-bootstrap'

interface ButtonProps {
  center: boolean
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ center, onClick, disabled = false, children }) => (
    <Col style={{ display: 'inline' }} className={ center ? 'text-center' : ''}>
        <StyledButton disabled={disabled} onClick={onClick}>
            {children}
        </StyledButton>
    </Col>
)

export default Button
