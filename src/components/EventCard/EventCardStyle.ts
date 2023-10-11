import { createStyles, makeStyles } from '@material-ui/core'
import { colors } from '../../shared/themes/colors'

export const eventCardStyles = makeStyles(() =>
  createStyles({
    contentSubscribe: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    card: {
      width: '100%',
      height: '21em',
      overflow: 'hidden',
      backgroundColor: colors.transparentYellow,
    },
    cardGridItem: {
      padding: '0.3em',
    },
    image: {
      width: '90%',
      objectFit: 'cover',
      borderRadius: '0.2em',
      marginRight: '1em',
      marginLeft: '1em',
    },
    date: {
      padding: '0.5em 1em 0em 1em',
    },
    day: {
      color: colors.black,
      fontFamily: 'Exo',
      margin: 0,
    },
    top: {
      display: 'flex',
      alignItems: 'center',
      width: '94%',
      padding: '0.7em',
      flexWrap: 'wrap',
      backgroundColor: colors.black,
      bottom: '20em',
      justifyContent: 'space-between',
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'start',
      overflow: 'hidden',
    },
    title: {
      color: colors.white,
      fontFamily: 'Exo',
      margin: 0,
      marginRight: '1em',
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
    },
    eventStatus: {
      justifyContent: 'right',
    },
    userActionsSection: {
      display: 'grid',
    },
    button: {
      color: colors.white,
      backgroundColor: colors.yellow,
    },
    link: {
      color: colors.blue,
      marginTop: '5px',
    },
    subscribersSection: {
      display: 'flex',
      alignItems: 'center',
    },
    subscribedUserIcon: {
      backgroundColor: colors.white,
      left: '0.8em',
    },
    text: {
      color: colors.black,
      marginLeft: '10px',
    },
  })
)
