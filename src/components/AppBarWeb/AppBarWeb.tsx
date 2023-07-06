import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'

import { colors } from '../../styles/theme/colors'
import { useAuth } from '../../hook/useAuth'

export interface AppBarWebProps {
  title: string
  version: string
}

const useStyles = makeStyles(() =>
  createStyles({
    toolbarWeb: {
      justifyContent: 'space-between',
    },
    hamburgerIcon: {
      color: colors.white,
    },
    buttonLogin: {
      color: colors.white,
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

  const { state } = useAuth()

  const history = useHistory()
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
          {state.isAuth ? (
            <Typography variant="h6">USERNAME</Typography>
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
