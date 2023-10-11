import { createStyles, makeStyles } from '@material-ui/core'
import { colors } from '../../styles/theme/colors'

export const headerStyles = makeStyles(() =>
  createStyles({
    header: {
      position: 'fixed',
    },
    toolbar: {
      justifyContent: 'space-between',
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
    buttonLogin: {
      color: colors.black,
      marginLeft: '20px',
    },
    logout: {
      display: 'flex',
    },
    appTitle: {
      display: 'flex',
      alignItems: 'center',
      borderRight: '1px solid rgba(255,255,255,.3)',
      paddingRight: '20px',
    },
  })
)
