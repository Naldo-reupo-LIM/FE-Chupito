import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import UserIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'

import { colors } from '../../styles/theme/colors'

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
  })
)
export default function AppBarMobile({ version }: AppBarMobileProps) {
  const classes = useStyles()

  // TODO: Add handlers for search and settings icons
  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton aria-label="Menu">
            <SearchIcon className={classes.searchIcon} />
          </IconButton>
          <IconButton>
            <UserIcon className={classes.userIcon} />
          </IconButton>
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