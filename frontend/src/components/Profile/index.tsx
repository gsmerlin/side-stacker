import React from 'react'
import { Card } from './style'
import { useUserValue } from '../../state/user/hooks'
import moment from 'moment'

const Profile: React.FC = () => {
  const { username, joined, gamesPlayed, gamesWon } = useUserValue()
  return (<Card>
        <Card.Header>
            <Card.Title>{username}</Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Text>Joined: {moment(joined).format('MMM, Do. YYYY')}</Card.Text>
            <Card.Text>Games played: {gamesPlayed}</Card.Text>
            <Card.Text>Games won: {gamesWon}</Card.Text>
        </Card.Body>
    </Card>)
}

export default Profile
