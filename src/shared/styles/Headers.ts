import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../../styles/theme/colors";

export const headerStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: colors.white,
      position: 'fixed',
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    searchIcon: {
      color: colors.black,
    },
    settingsIcon: {
      color: colors.yellow,
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
    hamburgerIcon: {
      color: colors.white,
    },
    buttonLogin: {
      color: colors.black,
      marginLeft: '20px'
    },
    logout: {
      display: 'flex'
    },
    appTitle: {
      display: 'flex',
      alignItems: 'center',
      borderRight: '1px solid rgba(255,255,255,.3)',
      paddingRight: '20px'
    }
  })
)
