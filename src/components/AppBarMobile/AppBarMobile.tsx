import {
  AppBar,
  Button,
  Typography,
  Toolbar,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { headerStyles } from '../../shared/styles/Headers'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { MouseEvent, useContext, useState } from 'react'
import { logout } from '../../utils/logout'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { ExitToApp } from '@material-ui/icons'

export interface AppBarMobileProps {
  version: string
}

export default function AppBarMobile({ version }: AppBarMobileProps) {
  const classes = headerStyles()
  const history = useHistory()
  const { state } = useAuth()
  const { setLoginData, getUserInfo } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); 

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmitButton = async () => {
    handleClose()
    logout(history, setLoginData, getUserInfo)
  }

  // TODO: Add handlers for search and settings icons
  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>

          <div>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
            </IconButton>
            
            {state.isAuth ? (
              <Typography className={classes.userEmail} variant="caption">
                {state.username}
              </Typography>
            ) : (
              <Button variant="contained" onClick={() => history.push('/login')}>
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
      {/* TODO: Replace Drawer for handlers */}
    </>
  )
}
