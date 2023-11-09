import { useEffect, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import EventTypes from '../EventTypes/EventTypes'
import SelectWithLoading from '../DropDown/SelectWithLoading'
import TextFieldWithValidation from '../TextField/TextFieldWithValidation'
import FormButtons from '../FormButtons/FormButtons'
import EventsApi from '../../shared/api/endpoints/events'
import {
  EventEditViewProps,
  InputLabelProps,
} from '../../shared/entities/props/eventEditViewProps'
import { eventStyle } from '../../shared/styles/eventsAdmin'

export default function EventEditView({
  headquarters,
  tags,
  validation,
  isLoading,
}: EventEditViewProps): JSX.Element {
  const [getData, setData] = useState<{ [key: string]: string }>({})
  const classes = eventStyle()
  const history = useHistory()
  const { id } = useParams<string>()

  const fetchEventById = async (eventId: string | undefined) => {
    const api = new EventsApi()
    try {
      const {
        name,
        description,
        eventDate,
        address,
        phoneNumber,
        tags,
        headquarter,
        type,
      } = await api.getById(eventId)

      setData({
        name,
        description,
        eventDate,
        address,
        phoneNumber,
        tags,
        headquarter,
        type,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const redirectButton = () => {
    history.push('/events/list')
  }

  const handleSubmitButton = async () => {
    const api = new EventsApi()
    try {
      delete getData.tags
      const data = await api.update(id, getData)

      if (data.status) redirectButton()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEventById(id)
  }, [id])

  //TODO: ccomponent table refactor(create), use in add event and edit event
  return (
    <Box component="form" autoComplete="off">
      <Grid container className={classes.container} sm={6}>
        <h1>Edit event</h1>

        <Grid>
          <TextFieldWithValidation
            id="eventName"
            className={classes.textField}
            required={true}
            label="Title"
            value={getData.name}
            error={validation.name.error}
            helperText={validation.name.message}
            onChange={(e) => setData({ ...getData, name: e.target.value })}
            InputLabelProps={InputLabelProps}
          />
        </Grid>

        <Grid>
          <TextFieldWithValidation
            id="eventDescription"
            className={classes.textField}
            required={true}
            label="Description"
            value={getData.description}
            error={validation.name.error}
            helperText={validation.name.message}
            onChange={(e) =>
              setData({ ...getData, description: e.target.value })
            }
            InputLabelProps={InputLabelProps}
          />
        </Grid>

        <Grid>
          <TextFieldWithValidation
            id="eventDate"
            className={classes.textField}
            required={true}
            label="Date"
            value={getData.eventDate}
            error={validation.date.error}
            helperText={validation.date.message}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setData({ ...getData, eventDate: e.target.value })}
          />
        </Grid>

        <Grid>
          <SelectWithLoading
            attributeValue={getData.headquarter ? getData.headquarter : ''}
            attributeRequired={true}
            attributeOptions={headquarters}
            attributeName="headquarter"
            attributeLabel="HQ"
            onChange={(e) =>
              setData({ ...getData, headquarter: e.target.value as string })
            }
            isLoading={isLoading}
          />
        </Grid>

        <Grid>
          <TextField
            id="eventAddress"
            name="address"
            className={classes.textField}
            label="Address"
            value={getData.address}
            margin="dense"
            onChange={(e) => setData({ ...getData, address: e.target.value })}
            InputLabelProps={InputLabelProps}
          />
        </Grid>

        <Grid>
          <TextField
            name="phoneNumber"
            className={classes.textField}
            label="Phone"
            value={getData.phoneNumber}
            margin="dense"
            onChange={(e) =>
              setData({ ...getData, phoneNumber: e.target.value })
            }
            InputLabelProps={InputLabelProps}
          />
        </Grid>

        <Grid className={classes.disabled}>
          <SelectWithLoading
            attributeValue={getData.tags ? getData.tags : ''}
            attributeRequired={true}
            attributeOptions={tags}
            attributeName="tag"
            attributeLabel="Tag"
            onChange={(e) =>
              setData({ ...getData, tags: e.target.value as string })
            }
            isLoading={isLoading}
          />
        </Grid>

        <Grid>
          <EventTypes
            selectedEventType={getData.type}
            onUpdateEventType={(e) => setData({ ...getData, type: e })}
          />
        </Grid>

        <Grid className={classes.contentButton}>
          <FormButtons
            roleSave="edit"
            roleCancel="redirect"
            disableMainButton={false}
            onCancel={redirectButton}
            onSubmit={handleSubmitButton}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
