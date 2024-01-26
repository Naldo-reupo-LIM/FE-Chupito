import { useState } from 'react'
import { AppBar, Button, Typography, Toolbar } from '@material-ui/core'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { ExitToApp } from '@material-ui/icons'

import { headerStyles } from '../../shared/styles/Headers'

import logo from '../../assets/chupito-logo.svg'

export interface AppBarMobileProps {
  isAuthenticated: boolean
  username: string
  onLogin: () => void
  onLogout: () => void
  version?: string
}

export default function AppBarMobile({
  isAuthenticated,
  username,
  onLogin,
  onLogout,
  version = '',
}: AppBarMobileProps): JSX.Element {
  const classes = headerStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSubmitButton = () => {
    handleClose()
    onLogout()
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img src={logo} alt="logo" width="100" height="20" />
          </div>
          <div className={classes.logout}>
            {isAuthenticated ? (
              <>
                <Typography className={classes.userEmail} >
                  {username}
                </Typography>
                <Button
                  variant="contained"
                  onClick={onLogout}
                  className={classes.buttonLogin}
                >
                  <ExitToApp fontSize='small' /> Logout
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

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleSubmitButton}>
          <ListItemIcon>
            <ExitToApp fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div data-testid="appbarmobile" />
    </>
  )
}
