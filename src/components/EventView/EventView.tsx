import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

import EventTypes from '../EventTypes/EventTypes'
import SelectWithLoading from '../DropDown/SelectWithLoading'
import TextFieldWithValidation from '../TextField/TextFieldWithValidation'
import FormButtons from '../FormButtons/FormButtons'

import { ConferenceDataValidation, Headquarter } from '../../shared/entities'
import EventsApi from '../../api/events'
import { Tag } from '../../shared/entities/tag'
import { eventStyle } from '../../shared/styles/eventsAdmin'

export interface EventViewProps {
  headquarters: Headquarter[]
  tags: Tag[]
  headquarter: string
  eventType: string
  eventName:string
  eventDate: string
  eventDescription: string
  address: string
  phoneNumber: string
  eventTag: string
  validation: ConferenceDataValidation
  isLoading: boolean
  onChangeEventName: () => void
  onChangeEventDate: () => void
  onChangeAddress: () => void
  onChangePhoneNumber: () => void
}

export default function EventView({
  headquarters,
  headquarter,
  tags,
  eventType,
  eventName,
  eventDate,
  eventTag,
  eventDescription,
  address,
  phoneNumber,
  validation,
  isLoading,
}: EventViewProps): JSX.Element {

  const getValues = (setValue: Dispatch<SetStateAction<string>>, event:ChangeEvent<HTMLInputElement>) => {
    return setValue(event.target.value)
  }

  const getValuesSelect = (setValue: Dispatch<SetStateAction<string>>, event:  ChangeEvent<{name?: string | undefined; value: unknown;}>) => {
    return setValue(event.target.value as string)
  }

  const classes = eventStyle()
  const history = useHistory()

  const [getName, setEventName] = useState<string>(eventName)
  const [getType, setSelectedEventType] = useState<string>(eventType)
  const [getDescription, setEventDescription] = useState<string>(eventDescription)
  const [getDate, setEventDate] = useState<string>(eventDate)
  const [getAddress, setAddress] = useState<string>(address)
  const [getphone, setPhoneNumber] = useState<string>(phoneNumber)
  const [getTag, setEventTag] = useState<string>(eventTag)
  const [getHeadquarter, setEventHeadquarter] = useState<string>(headquarter)

  const updateEventType = (selectedEventType: string) => {
    setSelectedEventType(selectedEventType)
  }

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => getValues(setEventName, event)
  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => getValues(setEventDescription, event)
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => getValues(setEventDate, event)
  const onChangeAdress = (event: ChangeEvent<HTMLInputElement>) => getValues(setAddress, event)
  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => getValues(setPhoneNumber, event)
  const onChangeTag = (event:ChangeEvent<{ name?: string | undefined; value: unknown; }>) => getValuesSelect(setEventTag, event)
  const handleHeadquarterChanged = (event:ChangeEvent<{ name?: string | undefined; value: unknown; }>) => getValuesSelect(setEventHeadquarter, event)

  const handleCancelButton = () => {
    history.push('/events/list')
  }

  const handleSubmitButton = async () => {
    const api = new EventsApi()
    try {
      await api.add(
        {
          "name": getName,
          "eventDate": getDate,
          "headquarter": getHeadquarter,
          "address": getAddress,
          "type": getType,
          "description": getDescription,
          "tags": getTag,
          "phoneNumber": getphone 
        }
      ).then(() => handleCancelButton())
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box component="form" autoComplete="off">
      <Grid container className={classes.container} xs={12} sm={6}>
        <h1>Add event</h1>

        <Grid>
          <TextFieldWithValidation
            id="eventName"
            className={classes.textField}
            required={true}
            label="Title"
            value={getName}
            error={validation.name.error}
            helperText={validation.name.message}
            onChange={onChangeName}
          />
        </Grid>

        <Grid>
          <TextFieldWithValidation
            id="eventDescription"
            className={classes.textField}
            required={true}
            label="Description"
            value={getDescription}
            error={validation.name.error}
            helperText={validation.name.message}
            onChange={onChangeDescription}
          />
        </Grid>

        <Grid>
          <TextFieldWithValidation
            id="eventDate"
            className={classes.textField}
            required={true}
            label="Date"
            value={getDate}
            error={validation.date.error}
            helperText={validation.date.message}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeDate}
          />
        </Grid>

        <Grid>
          <SelectWithLoading
            attributeValue={getHeadquarter}
            attributeRequired={true}
            attributeOptions={headquarters}
            attributeName="headquarter"
            attributeLabel="HQ"
            error={false}
            errorMessage=""
            onChange={handleHeadquarterChanged}
            isLoading={isLoading}
          />
        </Grid>

        <Grid>
          <TextField
            id="eventAddress"
            name="address"
            className={classes.textField}
            label="Address"
            value={getAddress}
            margin="dense"
            onChange={onChangeAdress}
          />
        </Grid>

        <Grid>
          <TextField
            name="phoneNumber"
            className={classes.textField}
            label="Phone"
            value={getphone}
            margin="dense"
            onChange={onChangePhoneNumber}
          />
        </Grid>

        <Grid>
          <SelectWithLoading
            attributeValue={getTag}
            attributeRequired={true}
            attributeOptions={tags}
            attributeName="tag"
            attributeLabel="Tag"
            error={false}
            errorMessage=""
            onChange={onChangeTag}
            isLoading={isLoading}
          />
        </Grid>

        <Grid>
          <EventTypes
            selectedEventType={getType}
            onUpdateEventType={updateEventType}
          />
        </Grid>

        <Grid className={classes.contentButton}>
          <FormButtons
            disableMainButton={false}
            onCancel={handleCancelButton}
            onSubmit={handleSubmitButton}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
