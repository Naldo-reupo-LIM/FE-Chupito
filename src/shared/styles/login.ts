import { createStyles, makeStyles } from '@material-ui/core'
import { colors } from '../themes/colors'

export const loginStyle = makeStyles((theme) =>
  createStyles({
    container: {
      marginBottom: '250px',
      [theme.breakpoints.up('md')]: {
        marginLeft: '50px',
        marginRight: '50px',
        marginBottom: '50px',
      },
    },
    loginBoxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      marginBottom: '15px',
      marginTop: '15px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'gray',
          borderRadius: '12px',
          height: '60px',
        },
      },
      '&.hasText .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: '20px',
        marginTop: '20px',
      },
    },
    icons: {
      color: colors.gray,
    },
    button: {
      marginTop: '14px',
      backgroundColor: colors.mainBlue,
      color: colors.white,
      fontFamily: 'Exo',
      borderRadius: '8px',
      '&.MuiButton-root.Mui-disabled': {
        backgroundColor: colors.disabledButton,
      },
      [theme.breakpoints.up('md')]: {
        height: '90px',
      },
    },

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '150px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      padding: '20px 30px',
      marginBottom: '200px',
      [theme.breakpoints.up('md')]: {
        width: '650px',
        height: '250px',
        padding: '150px 80px',
      },
    },
  })
)
