import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../themes/colors";

export const loginStyle = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'absolute',
      top: '30%',
      left: '30%',
      width: '40%',
      minHeight: '35%',
      maxHeight: '35%',
      [theme.breakpoints.down('sm')]: {
        top: '20%',
        left: 0,
        width: '100%',
      },
      [theme.breakpoints.only('md')]: {
        top: '25%',
        left: '25%',
        width: '50%',
        minHeight: '45%',
      }
    },
    form: {
      minHeight: '100%',
      paddingBottom: '2em',

      [theme.breakpoints.down('sm')]: {
        width: '95%',
        margin: '0 auto',
        paddingBottom: '1em'
      },
    },
    input: {
      marginLeft: '4em',
      marginRight: '4em',
      marginBottom: '2em',

      [theme.breakpoints.down('sm')]: {
        marginLeft: '2em',
        marginRight: '2em',
      },
    },
    button: {
      width: '100px',
      margin: 'auto',
    },
    loginLogo: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '100%',
      height: '4em',
      backgroundColor: colors.transparentBlack,
      backgroundSize: '12em auto',
      padding: '1em 0',
      marginBottom: '1.5em',
    },
  })
)
