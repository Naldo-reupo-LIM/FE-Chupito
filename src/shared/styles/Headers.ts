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
      color: colors.gray,
      position: 'absolute',
      top: '0',
      right: '1em',
      fontSize: 'xx-small',
    },
    userEmail: {
      color: colors.black,
      marginTop:'15px',
      paddingRight: '13.5px',
      fontFamily:'Exo',
      fontWeight: 'bold'
    },
    buttonLogin: {
      color: colors.white,
      backgroundColor: colors.mainBlue,
      fontSize: 'small',
    },

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logout: {
      display: 'flex',
      alignItems: 'center',
      marginLeft:'auto'
    },
  })
)
