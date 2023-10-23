import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'

import { useAuth } from '../../shared/hooks/useAuth'
import { headerStyles } from '../../shared/styles/Headers'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { logout } from '../../utils/logout'
import chupitoLogo from '../../assets/chupito-logo.svg'

export interface AppBarWebProps {
  version: string
}

export default function AppBarWeb({ version }: AppBarWebProps): JSX.Element {
  const classes = headerStyles()
  const history = useHistory()
  const { state } = useAuth()
  const { setLoginData, getUserInfo } = useContext(AuthContext)

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img
              src={chupitoLogo}
              alt="Chupito logo"
              width="180"
              height="40"
              style={{ marginLeft: '30px' }}
            />
          </div>
          <div className={classes.logout}>
            {state.isAuth ? (
              <>
                <Typography className={classes.userEmail} variant="h6">
                  {state.username || state.email}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => logout(history, setLoginData, getUserInfo)}
                  className={classes.buttonLogin}
                >
                  <ExitToApp /> Logout
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => history.push('/login')}
                className={classes.buttonLogin}
              >
                LOGIN
              </Button>
            )}
          </div>

          <label className={classes.version}>v{version}</label>
        </Toolbar>
      </AppBar>
    </>
  )
}
