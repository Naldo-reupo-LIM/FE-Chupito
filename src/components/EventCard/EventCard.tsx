import { useHistory } from 'react-router-dom'
import {
  Card,
  CardMedia,
  Grid,
  Button,
  Typography,
  Avatar,
  Link,
  Fab,
  CardContent,
  CardActionArea,
} from '@material-ui/core'

import ConferenceStatusSection from './ConferenceStatusSection'
import { Conference } from '../../shared/entities'

import { eventCardStyles } from './EventCardStyle'

import eventImage from '../../assets/programmingImg.png'

export interface EventCardProps {
  event: Conference
}

export default function EventCard({ event }: EventCardProps): JSX.Element {
  const classes = eventCardStyles()

  const getDateParts = (date: string) => {
    const dateObject = new Date(date)
    const year = dateObject.getFullYear()
    const month = dateObject.toLocaleString('default', { month: 'short' })
    const day = dateObject.getDate()

    return { year, month, day }
  }
  const dateParts = getDateParts(event.eventDate)
  const history = useHistory()

  const handleLinkMoreInfo = () => {
    // TODO: history should be moved to a page
    history.push(`/event-info/${event._id}`)
  }

  const url = event.images?.[0]?.url || eventImage

  return (
    <Grid>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Event image"
            image={url}
            className={classes.cardImage}
          />
          <CardContent className={classes.cardContent}>
            <Grid container direction="column" className={classes.columns}>
              <Grid item>
                <Typography variant="h5" className={classes.day}>
                  {dateParts.day}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.month}>
                  {dateParts.month}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.year}>
                  {dateParts.year}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="column" className={classes.mainColumn}>
              <Grid item>
                <Typography variant="subtitle2" className={classes.eventTitle}>
                  {event.name}{' '}
                </Typography>
              </Grid>
              <Grid item>
                <Link className={classes.link} onClick={handleLinkMoreInfo}>
                  {'+more info '}
                </Link>
              </Grid>
              <Grid>
                <div className={classes.subscribersSection}>
                  <Avatar
                    className={classes.subscribedAvatar}
                    src={'/avatar.png'}
                  ></Avatar>
                  <Fab className={classes.subscribedAddIcon}>
                    <Typography className={classes.subscribersNumber}>
                      {'+15'}
                    </Typography>
                  </Fab>
                  <div className={classes.joinedTextBox}>
                    <Typography className={classes.joinedText}>
                      {'Joined'}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container direction="column" className={classes.columns}>
              <Grid item>
                <ConferenceStatusSection status={event.status} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  disabled={event.subscribed}
                  onClick={handleLinkMoreInfo}
                >
                  {event.subscribed ? 'Subscribed' : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
