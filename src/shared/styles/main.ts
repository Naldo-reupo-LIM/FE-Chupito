import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../../styles/theme/colors";

export const mainStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      boxShadow: 'none',
    },
    innerContainer: {
      margin: '5em',
      [theme.breakpoints.down('sm')]: {
        margin: '5em 1em'
      },

      overflow: 'auto',
      backgroundColor: colors.white,
    },
  })
)
