import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../shared/hooks/useAuth'
import { ExitToApp } from '@material-ui/icons'
import { headerStyles } from '../../shared/styles/Headers'
import { useContext } from 'react'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { logout } from '../../utils/logout'

export interface AppBarWebProps {
  title: string
  version: string
}

export default function AppBarWeb({
  title,
  version,
}: AppBarWebProps): JSX.Element {
  const classes = headerStyles()
  const { setLoginData, getUserInfo } = useContext(AuthContext)
  const history = useHistory()
  const { state } = useAuth()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">
            {title}
          </Typography>
          {state.isAuth ? (
            <div className={classes.logout}>
              <Typography className={classes.appTitle} variant="h6">{state.username}</Typography>
              <Button
                variant="contained"
                onClick={()=> logout(history, setLoginData, getUserInfo)}
                className={classes.buttonLogin}
              >
               <ExitToApp /> Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={() => history.push('/login')}
              className={classes.buttonLogin}
            >
              Login
            </Button>
          )}

          <label className={classes.version}>v{version}</label>
        </Toolbar>
      </AppBar>
    </>
  )
}
