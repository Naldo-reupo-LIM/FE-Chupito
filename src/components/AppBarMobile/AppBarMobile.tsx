import { useContext, useState } from 'react'
import { AppBar, Button, Typography, Toolbar } from '@material-ui/core'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../shared/hooks/useAuth'
import { headerStyles } from '../../shared/styles/Headers'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { Authentication } from '../../shared/api/'
import logo from '../../assets/chupito-logo.svg'

export interface AppBarMobileProps {
  version: string
}

export default function AppBarMobile({ version }: AppBarMobileProps) {
  const classes = headerStyles()
  const history = useHistory()
  const { state } = useAuth()
  const { setLoginData } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSubmitButton = async () => {
    handleClose()
    await Authentication().logout()
    setLoginData({ isAuth: false, userUid: '', email: '' })
    history.push('/')
  }

  const handleLogout = async () => {
    await Authentication().logout()
    setLoginData({ isAuth: false, userUid: '', email: '' })
    history.push('/')
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img src={logo} alt="logo" width="180" height="40" />
          </div>
          <div className={classes.logout}>
            {state.isAuth ? (
              <>
                <Typography className={classes.userEmail} variant="h5">
                  {state.username || state.email}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleLogout()}
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

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleSubmitButton}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div data-testid='appbarmobile'/>
    </>
  )
}
