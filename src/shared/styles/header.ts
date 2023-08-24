import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../../styles/theme/colors";

export const mobileStyles = makeStyles(() =>
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
  })
)
