import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  FormGroup,
  TextField,
  Button,
  CardMedia
} from '@material-ui/core'

import NoneLayout from '../../hocs/NoneLayout'
import { validateEmail } from '../../tools'
import { useAuth } from '../../shared/hooks/useAuth'
import { loginStyle } from '../../shared/styles/login'

export interface LoginProps {
  onLogin: (userName: string, password: string) => void
  loading: boolean
}

export default function Login({ onLogin, loading }: LoginProps): JSX.Element {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [disableLogin, setDisableLogin] = useState(true)

  const params = new URLSearchParams(window.location.search)
  const eventId = params.get('eventId')

  const classes = loginStyle()
  const history = useHistory()
  const user = useAuth()

  const handleUserChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    verifyCredentials()
  }

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    verifyCredentials()
  }

  const verifyCredentials = () => {
    if (userName && userName !== '' && password && password !== '') {
      setDisableLogin(false)
    }
  }

  const isValidLoginData = () => {
    return !disableLogin && validateEmail(userName) && password.length > 3
  }

  const handleLoginClicked = () => {
    onLogin(userName, password)
  }

  const handleRedirect = useCallback(() => {
    const userState = user.state
    let shouldRedirectTo = '/login'
    if (userState.username) {
      shouldRedirectTo = userState.isAdmin ? '/events/list' : '/'
    } else if (eventId) {
      shouldRedirectTo = `/event-info/${eventId}`
    }
    history.push(shouldRedirectTo)
  }, [eventId, history, user.state])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  return (
    <NoneLayout>
      <div className={classes.container}>
        <Paper className={classes.form}>
          <CardMedia
            className={classes.loginLogo}
            src="https://carerite.greysignal.com/img/links/poc.png"
          ></CardMedia>
          <FormGroup>
            <TextField
              className={classes.input}
              id="userName"
              name="userName"
              label="Email"
              value={userName}
              margin="dense"
              variant="outlined"
              autoComplete="off"
              InputLabelProps={{ shrink: true }}
              onChange={handleUserChanged}
            />
          </FormGroup>
          <FormGroup>
            <TextField
              className={classes.input}
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              margin="dense"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handlePasswordChanged}
            />
          </FormGroup>
          <FormGroup>
            <Button
              className={classes.button}
              disabled={loading || !isValidLoginData()}
              type="submit"
              variant="contained"
              onClick={handleLoginClicked}
              data-testid={'login-button'}
            >
              Log In
            </Button>
          </FormGroup>
        </Paper>
      </div>
    </NoneLayout>
  )
}
