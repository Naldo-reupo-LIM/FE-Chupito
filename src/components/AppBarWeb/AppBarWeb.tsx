import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'

import { headerStyles } from '../../shared/styles/Headers'

import logo from '../../assets/chupito-logo.svg'

export interface AppBarWebProps {
  isAuthenticated: boolean
  username: string
  onLogin: () => void
  onLogout: () => void
  version?: string
}

export default function AppBarWeb({
  isAuthenticated,
  username,
  onLogin,
  onLogout,
  version = '',
}: AppBarWebProps): JSX.Element {
  const classes = headerStyles()

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img
              src={logo}
              alt="logo"
              width="180"
              height="40"
              style={{ marginLeft: '30px' }}
            />
          </div>
          <div className={classes.logout}>
            {isAuthenticated ? (
              <>
                <Typography className={classes.userEmail} variant="h6">
                  {username}
                </Typography>
                <Button
                  variant="contained"
                  onClick={onLogout}
                  className={classes.buttonLogin}
                >
                  <ExitToApp /> Logout
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={onLogin}
                className={classes.buttonLogin}
              >
                LOGIN
              </Button>
            )}
          </div>

          <label className={classes.version}>v{version}</label>
        </Toolbar>
      </AppBar>
      <div data-testid="appbarweb" />
    </>
  )
}
