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
      right: 10,
      fontSize: 'xx-small',
    },
    userEmail: {
      color: colors.black,
      marginTop:15,
      paddingRight: 13,
      fontFamily:'Exo',
      fontWeight: 'bold',
      fontSize: 10,
    },
    userEmailweb: {
      color: colors.black,
      marginTop:15,
      paddingRight: 13,
      fontFamily:'Exo',
      fontWeight: 'bold',
      fontSize: 14,
    },
    buttonLogin: {
      color: colors.white,
      backgroundColor: colors.mainBlue,
      fontSize: 10,
      width: 70,
    },
    buttonWeb: {
      color: colors.white,
      backgroundColor: colors.mainBlue,
      fontSize: 12,
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
