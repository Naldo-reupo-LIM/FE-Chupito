import { createStyles, makeStyles } from '@material-ui/core'
import { colors } from "../../styles/theme/colors";

export const mainStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      boxShadow: 'none',
      backgroundColor: colors.transparentBlue,
    },
    innerContainer: {
      margin: '4em 5em',
      [theme.breakpoints.down('sm')]: {
        margin: '3.5em 2em',
      },

      overflow: 'auto',
      backgroundColor: colors.transparentBlue,
    },
  })
)
