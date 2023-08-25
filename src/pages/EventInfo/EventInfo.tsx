import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Moment from 'moment'
import {
  Typography,
  Grid,
  Button,
  Avatar,
  Fab,
  Chip,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Stack from '@mui/material/Stack'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import { useAuth } from '../../shared/hooks/useAuth'
import eventImage from '../../assets/programmingImg.png'
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.jpg'
import EventsApi from '../../api/events'
import { eventInfoStyles } from './EventInfoStyle'

const imageItems = [
  {
    img: eventImage,
    title: 'Event',
  },
  {
    img: image1,
    title: 'Technology',
  },
  {
    img: image2,
    title: 'Coding',
  },
  {
    img: image3,
    title: 'Virtual',
  },
]

export interface EventInfoPageProps {
  name: string
  id: string
  eventDate: string
}

export default function EventInfoPage(): JSX.Element {
  const classes = eventInfoStyles()
  const history = useHistory()
  const { id } = useParams<{ id: string }>() as { id: string }
  const [isSubscribed, setIsSubscribed] = useState(false)

  const [eventDetails, setEventDetails] = useState<EventInfoPageProps>({
    name: '',
    id: '',
    eventDate: '',
  })
  const {
    state: { isAuth },
  } = useAuth()

  const getDatePart = (date: string) => {
    const dateObject = Moment(date, 'YYYY-MM-DD')
    return dateObject.format('D MMM YYYY')
  }
  const subscribedValidationHandler = () => {
    history.push(`${isAuth ? '/event-info' : `/login?eventId=${id}`}`)
  }

  const fetchEventById = async (eventId: string) => {
    const api = new EventsApi()
    try {
      const response = await api.getById(eventId)
      const { id, name, eventDate } = response
      setEventDetails({ id, name, eventDate })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchVerifySubscription = async (id: string) => {
    try {
      const api = new EventsApi()
      const response = await api.verifyUserEventSubscribed(id)
      setIsSubscribed(response.attendanceConfirmed)
    } catch (err) {
      setIsSubscribed(false)
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchEventById(id)
    }
    if (isAuth) {
      fetchVerifySubscription(id)
    }
  }, [id, isAuth])

  return (
    <>
      <Grid className={classes.titleContainer}>
        <Grid xs={12} sm={7} className={classes.eventTitleRow}>
          <Typography variant="h4" component="div">
            {eventDetails?.name}
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} className={classes.eventDateRow}>
          <Typography variant="h5" align="center" className={classes.date}>
            {getDatePart(eventDetails?.eventDate)}
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            disabled={isSubscribed}
            onClick={subscribedValidationHandler}
            data-testid="register-button"
          >
            {' '}
            {isSubscribed ? 'Subscribed' : 'Register'}
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.body}>
        <Grid>
          <Typography
            variant="body1"
            className={classes.description}
          ></Typography>
        </Grid>
        <Grid className={classes.subscribersSection}>
          <Avatar
            className={classes.subscribedUserIcon}
            src={'/avatar.png'}
          ></Avatar>
          <Fab size="small">
            <AddIcon />
            {+15}
          </Fab>
          <Grid className={classes.text}>
            <Typography align="center" variant="body1">
              {'Joined'}
            </Typography>
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" className={classes.tagsContainer}>
          <Chip
            label="Technology"
            variant="outlined"
            className={classes.tagPrimary}
          />
          <Chip
            label="React"
            variant="outlined"
            className={classes.tagSecondary}
          />
          <Chip
            label="Front-end"
            variant="outlined"
            className={classes.tagOptional}
          />
        </Stack>
        <ImageList
          className={classes.imagesContainer}
          rowHeight="auto"
          cols={4}
          data-testid="image-list-container"
        >
          {imageItems.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=50&h=50&fit=crop&auto=format`}
                srcSet={`${item.img}?w=50&h=50&fit=crop&auto=format&dpr=4 4x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  )
}
