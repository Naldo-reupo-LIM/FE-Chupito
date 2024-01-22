import { createStyles, makeStyles } from "@material-ui/core";
import { colors } from "../../shared/themes/colors";

export const eventInfoStyles = makeStyles((theme) =>
  createStyles({
    titleContainer: {
      background: colors.white,
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: theme.spacing(4),
    },
    eventTitleRow: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      color: colors.darkGray,
    },
    eventDateRow: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(2),
      alignItems: 'center',

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'column'
      },
    },
    date: {
      fontSize: '1em',
      fontWeight: 400,
      color: colors.darkGray,
      paddingBottom: theme.spacing(2),
      marginLeft: '1em',
    },
    button: {
      borderColor: colors.blue,
      marginLeft: '1em',
      color: colors.blue,
    },
    body: {
      background: colors.white,
      padding: theme.spacing(4),
    },
    description: {
      marginLeft: '1em',
    },
    subscribersSection: {
      display: 'flex',
      marginTop: theme.spacing(1),
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
    imagesContainer: {
      width: '100%',
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
    },
  })
)
