import {
  Typography,
  Grid,
  Button,
  Avatar,
  Fab,
  Chip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Stack, ImageList, ImageListItem } from '@mui/material';
import { imageItems, titleChips, getDatePart } from '../../shared/tools';
import { EventInfoPageProps } from '../../pages/EventInfo/EventInfo';
import { eventInfoStyles } from '../../pages/EventInfo/EventInfoStyle';

export interface EventDetailsProps {
  eventDetails: EventInfoPageProps,
  isSubscribed: boolean,
  subscribedValidationHandler: () => void
}


const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails, isSubscribed, subscribedValidationHandler }) => {
  const { name, eventDate } = eventDetails;
  const classes = eventInfoStyles()
  return (
    <>
      <Grid className={classes.titleContainer}>
        <Grid xs={12} sm={7} className={classes.eventTitleRow}>
          <Typography variant="h4" component="div" aria-label='title' >
            {name}
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} className={classes.eventDateRow}>
          <Typography variant="h5" align="center" className={classes.date}>
            {getDatePart(eventDate)}
          </Typography>
          <Button
            variant="outlined"
            className={classes.button}
            disabled={isSubscribed}
            onClick={subscribedValidationHandler}
            data-testid="register-button"
          >
            {isSubscribed ? 'Subscribed' : 'Register'}
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.body}>
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
          {titleChips.map((item) => (
            <Chip
              label={item}
              variant="outlined"
              color={'secondary'}
            />
          ))
          }
        </Stack>
        <ImageList
          className={classes.imagesContainer}
          rowHeight="auto"
          cols={4}
          data-testid="image-list-container"
        >
          {imageItems.map(({img, title}) => (
            <ImageListItem key={title}>
              <img
                src={img}
                srcSet={img}
                alt={title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  )
}

export default EventDetails;
