import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../../shared/themes/colors";

export const eventInfoStyles = makeStyles((theme) =>
  createStyles({
    titleContainer: {
      background: colors.transparentYellow,
      display: 'flex',
      flexWrap: 'wrap',
    },
    eventTitleRow: {
      padding: theme.spacing(2),
    },
    eventDateRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(1),
      alignItems: 'center',

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'column'
      },
    },
    date: {
      fontSize: '1.2em',
    },
    button: {
      backgroundColor: colors.yellow,
      marginLeft: '1em',
    },
    body: {
      background: colors.white,
    },
    description: {
      marginLeft: '1em',
    },
    subscribersSection: {
      display: 'flex',
      marginTop: theme.spacing(4),
    },
    subscribedUserIcon: {
      color: colors.black,
      backgroundColor: colors.white,
      left: '0.8em',
    },
    text: {
      color: colors.black,
      marginTop: '0.5em',
      marginBottom: '2em',
      marginLeft: '0.5em',
    },
    tagsContainer: { 
      marginLeft: '1em',
    },
    tagPrimary: {
      backgroundColor: colors.dark,
      color: colors.white,
    },
    tagSecondary: {
      backgroundColor: colors.blue,
      color: colors.white,
    },
    tagOptional: {
      backgroundColor: colors.lightOrange,
    },
    imagesContainer: {
      width: '100%',
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
    },
  })
)
