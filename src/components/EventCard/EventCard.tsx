import Moment from 'moment'
import {
  Card,
  CardActions,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Button,
  Link,
  Typography,
  Avatar,
  Fab,
  Box,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import ConferenceStatusSection from './ConferenceStatusSection'
import { Conference } from '../../shared/entities'
import { colors } from '../../styles/theme/colors'
import eventImage from '../../assets/programmingImg.png'

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: '100%',
      height: '20em',
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
      paddingTop: '0.5em',
      paddingLeft: '1em',
      paddingRight: '1em',
    },
    day: {
      color: colors.orange,
      fontFamily: 'Exo',
      margin: 0,
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: '0.7em',
      backgroundColor: colors.black,
      bottom: '20em',
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'start',
      overflow: 'hidden',
    },
    title: {
      color: colors.white,
      fontFamily: 'Exo',
      whiteSpace: 'nowrap',
      margin: 0,
      marginRight: '1em',
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
    },
    eventStatus: {
      display: 'flex',
      justifyContent: 'right',
    },
    userActionsSection: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '1em',
      marginLeft: '1em',
    },
    button: {
      display: 'flex',
      position: 'relative',
      color: colors.white,
      backgroundColor: colors.yellow,
      marginLeft: '15em',
    },
    link: {
      position: 'relative',
      left: '6.4em',
      color: colors.blue,
    },
    subscribersSection: {
      display: 'flex',
    },
    subscribedUserIcon: {
      color: colors.black,
      backgroundColor: colors.white,
      left: '0.8em',
      bottom: '3.2em',
      position: 'relative',
    },
    subscribedUsersNumber: {
      bottom: '4.5em',
      position: 'relative',
    },
    text: {
      color: colors.black,
      left: '0.5em',
      bottom: '3.5em',
      position: 'relative',
    },
  })
)

export interface EventCardProps {
  event: Conference
}

export default function EventCard({ event }: EventCardProps): JSX.Element {
  const classes = useStyles()

  const getDatePart = (date: string) => {
    const dateObject = Moment(date, 'YYYY-MM-DD')
    return dateObject.format('D MMM YYYY')
  }

  const url =
    event.images && event.images.length > 0 ? event.images[0].url : eventImage

  return (
    <Grid className={classes.cardGridItem} item xs={12} sm={5} md={4} lg={3}>
      <Card className={classes.card}>
        <Box className={classes.top}>
          <Box className={classes.titleSection}>
            <Typography variant="h5" className={classes.title}>
              {event.name}
            </Typography>
          </Box>
          <Box className={classes.eventStatus}>
            <ConferenceStatusSection status={event.status} />
          </Box>
        </Box>
        <Box className={classes.date}>
          <Typography variant="h6" className={classes.day}>
            {getDatePart(event.eventDate)}
          </Typography>
        </Box>

        <CardMedia
          className={classes.image}
          component="img"
          image={url}
          height={150}
          title={event.name}
        />
        <CardActions className={classes.userActionsSection}>
          <Button variant="contained" className={classes.button}>
            {'Register'}
          </Button>
          <Link underline="always" className={classes.link} href="#">
            {'+more info '}
          </Link>
        </CardActions>
        <div className={classes.subscribersSection}>
          <Avatar
            className={classes.subscribedUserIcon}
            src={'/avatar.png'}
          ></Avatar>
          <Fab size="small" className={classes.subscribedUsersNumber}>
            <AddIcon />
            {+15}
          </Fab>
          <div className={classes.text}>
            <Typography>{'Joined'}</Typography>
          </div>
        </div>
      </Card>
    </Grid>
  )
}
