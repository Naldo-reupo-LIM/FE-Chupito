import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  FormGroup,
  TextField,
  Button,
  CardMedia,
  makeStyles,
  createStyles,
} from '@material-ui/core'

import NoneLayout from '../../hocs/NoneLayout'
import { validateEmail } from '../../tools'
import { colors } from '../../styles/theme/colors'
import { useAuth } from '../../shared/hooks/useAuth'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'absolute',
      top: '30%',
      left: '35%',
      width: '30%',
      minHeight: '35%',
      maxHeight: '35%',
      [theme.breakpoints.down('sm')]: {
        top: 0,
        left: 0,
        width: '100%',
      },
      [theme.breakpoints.only('md')]: {
        top: '25%',
        left: '25%',
        width: '50%',
        minHeight: '45%',
      },
      [theme.breakpoints.between(1280, 1439)]: {
        top: '25%',
        left: '25%',
        width: '50%',
        minHeight: '30%',
        maxHeight: '60%',
      },
      [theme.breakpoints.only('lg')]: {
        top: '25%',
        left: '25%',
        width: '50%',
        minHeight: '50%',
        maxHeight: '80%',
      },
      [theme.breakpoints.up('lg')]: {
        top: '30%',
        left: '30%',
        width: '40%',
        minHeight: '50%',
        maxHeight: '80%',
      },
    },
    form: {
      minHeight: '100%',
      justifyContent: 'center',
      paddingBottom: '2em',
      textAlign: 'center',
    },
    title: {
      marginBottom: '4em',
    },
    input: {
      marginLeft: '2em',
      marginRight: '2em',
      marginBottom: '2em',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '8em',
        marginRight: '8em',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: '2em',
        marginRight: '2em',
      },
    },
    button: {
      margin: theme.spacing(2),
      marginLeft: '2em',
      marginRight: '2em',
    },
    loginLogo: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '100%',
      height: '4em',
      backgroundColor: colors.transparentBlack,
      backgroundSize: '12em auto',
      padding: '1em 0',
      marginBottom: '1.5em',
    },
  })
)

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

  const classes = useStyles()
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
