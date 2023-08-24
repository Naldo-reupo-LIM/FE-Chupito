import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth'
import { mobileStyles } from '../../shared/styles/header'

export interface AppBarMobileProps {
  version: string
}

export default function AppBarMobile({ version }: AppBarMobileProps) {
  const classes = mobileStyles()
  const { state } = useAuth()

  const history = useHistory()

  // TODO: Add handlers for search and settings icons
  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton aria-label="Menu">
            <SearchIcon className={classes.searchIcon} />
          </IconButton>

          <div>
            <IconButton>
              <SettingsIcon className={classes.settingsIcon} />
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
      {/* TODO: Replace Drawer for handlers */}
    </>
  )
}
