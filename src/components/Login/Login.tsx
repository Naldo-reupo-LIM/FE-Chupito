import React, { useState } from 'react'

import { Paper, TextField, Button, InputAdornment } from '@material-ui/core'
import Container from '@mui/material/Container'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import GoogleButton from 'react-google-button'

import { validateEmail } from '../../tools'

import { loginStyle } from '../../shared/styles/login'
import chupitoLogo from '../../assets/chupito-logo.svg'

export interface LoginProps {
  onLogin: (userName: string, password: string) => void
  loading: boolean
  googleOnLogin: (userName: string) => void
}

export default function Login({
  onLogin,
  googleOnLogin,
}: LoginProps): JSX.Element {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [disableLogin, setDisableLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const hasText = !!userName

  const classes = loginStyle()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleUserChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setUserName(text)

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
  const handleGoogleLoginClicked = () => {
    googleOnLogin(userName)
  }

  return (
    <Container className={`${classes.input} ${hasText ? 'hasText' : ''}`}>
      <div className={classes.logoContainer}>
        <img src={chupitoLogo} alt="Chupito logo" />
      </div>
      <div className={classes.loginBoxContainer}>
        <Paper elevation={3} className={classes.formContainer}>
          <TextField
            className={classes.input}
            id="userName"
            name="userName"
            label="Email"
            placeholder="abc@email.com"
            value={userName}
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleUserChanged}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon className={classes.icons} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            className={classes.input}
            label="Password"
            placeholder="password"
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            variant="outlined"
            fullWidth
            onChange={handlePasswordChanged}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className={classes.icons} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={togglePasswordVisibility}
                      className={classes.icons}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={togglePasswordVisibility}
                      className={classes.icons}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValidLoginData()}
            onClick={handleLoginClicked}
            data-testid={'login-button'}
          >
            Login
          </Button>
          <span>or</span>
          <div className={classes.googleButtonContainer}>
            <GoogleButton onClick={handleGoogleLoginClicked} />
          </div>
        </Paper>
      </div>
    </Container>
  )
}
