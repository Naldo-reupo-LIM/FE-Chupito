import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import UserIcon from '@material-ui/icons/AccountCircle'
import { colors } from '../../styles/theme/colors'
import { AppBarWebProps } from '../../types/types'

const useStyles = makeStyles(() =>
  createStyles({
    toolbarWeb: {
      justifyContent: 'space-between',
    },
    hamburgerIcon: {
      color: colors.white,
    },
    userWebIcon: {
      color: colors.white,
      justifyContent: 'end',
    },
    appTitle: {},
    version: {
      color: colors.transparentWhite,
      position: 'absolute',
      top: '0',
      right: '1em',
      fontSize: 'xx-small',
    },
  })
)

export default function AppBarWeb({
  title,
  version,
}: AppBarWebProps): JSX.Element {
  const classes = useStyles()

  // TODO: Add Login function

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbarWeb}>
          <IconButton aria-label="Menu">
            <MenuIcon className={classes.hamburgerIcon} />
          </IconButton>
          <Typography className={classes.appTitle} variant="h5">
            {title}
          </Typography>
          <IconButton edge="end">
            <UserIcon className={classes.userWebIcon} />
          </IconButton>
          <label className={classes.version}>v{version}</label>
        </Toolbar>
      </AppBar>
    </>
  )
}
