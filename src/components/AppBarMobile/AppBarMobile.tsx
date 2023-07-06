import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import { useHistory } from 'react-router-dom'

import { colors } from '../../styles/theme/colors'
import { useAuth } from '../../hook/useAuth'

export interface AppBarMobileProps {
  version: string
}

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: 'transparent',
      boxShadow: '0px 0px 0px 60px',
      position: 'sticky',
      display: 'flex',
    },
    toolbar: {
      justifyContent: 'space-evenly',
      position: 'fixed',
      marginBottom: '1em',
    },
    searchIcon: {
      color: colors.black,
    },
    userIcon: {
      color: colors.black,
      marginRight: '4em',
      marginLeft: '4em',
    },
    settingsIcon: {
      color: colors.yellow,
      marginLeft: '1em',
    },
    version: {
      color: colors.transparentWhite,
      position: 'absolute',
      top: '0',
      right: '1em',
      fontSize: 'xx-small',
    },
    userEmail: {
      color: colors.black,
    },
  })
)
export default function AppBarMobile({ version }: AppBarMobileProps) {
  const classes = useStyles()
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
          {state.isAuth ? (
            <Typography className={classes.userEmail} variant="caption">
              username
            </Typography>
          ) : (
            <Button variant="contained" onClick={() => history.push('/login')}>
              LOGIN
            </Button>
          )}

          <IconButton>
            <SettingsIcon className={classes.settingsIcon} />
          </IconButton>
          <label className={classes.version}>v{version}</label>
        </Toolbar>
      </AppBar>
      {/* TODO: Replace Drawer for handlers */}
    </>
  )
}
