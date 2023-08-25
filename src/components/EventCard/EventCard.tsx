import Moment from 'moment'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  Button,
  Typography,
  Avatar,
  Link,
  Fab,
  Box,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import ConferenceStatusSection from './ConferenceStatusSection'
import { Conference } from '../../shared/entities'
import eventImage from '../../assets/programmingImg.png'
import { eventCardStyles } from './EventCardStyle'

export interface EventCardProps {
  event: Conference
}

export default function EventCard({ event }: EventCardProps): JSX.Element {
  const classes = eventCardStyles()

  const getDatePart = (date: string) => {
    const dateObject = Moment(date, 'YYYY-MM-DD')
    return dateObject.format('D MMM YYYY')
  }
  const history = useHistory()

  const handleLinkMoreInfo = () => {
    history.push(`/event-info/${event._id}`)
  }

  const url = event.images?.[0]?.url || eventImage

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

        <div className={classes.contentSubscribe}>
          <div className={classes.subscribersSection}>
            <Avatar
              className={classes.subscribedUserIcon}
              src={'/avatar.png'}
            ></Avatar>
            <Fab size="small">
              <AddIcon />
              {+15}
            </Fab>
            <div className={classes.text}>
              <Typography>{'Joined'}</Typography>
            </div>
          </div>

          <CardActions className={classes.userActionsSection}>
            <Button
              variant="contained"
              className={classes.button}
              disabled={event.subscribed}
            >
              {event.subscribed ? 'Subscribed' : 'Register'}
            </Button>
            <Link
              underline="always"
              className={classes.link}
              onClick={handleLinkMoreInfo}
            >
              {'+more info '}
            </Link>
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}
