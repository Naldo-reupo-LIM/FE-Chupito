import { useState } from 'react';
import { Grid, createStyles, makeStyles } from '@material-ui/core'
import { Box, Button, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Moment from 'moment'
import { useHistory } from 'react-router-dom';

import FullLayout from '../../hocs/FullLayout'
import Headquarters from '../Headquarters/Headquarters';
import DashboardFilters from '../Dashboard/DashboardFilters';
import { Conference, ConferenceFilters } from '../../shared/entities';
import { sortAscending, sortDescending } from '../../tools/sorting';
import EventsApi from '../../api/events'
import { EventsAdminViewProps } from '../../shared/entities/props/eventsAdminViewProps';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: '0',
      marginBottom: '0.5em',
    },
    headquarterFilter: {
      marginBottom: '1em',
    },
    centeredContent: {
      justifyContent: 'center',
    },
    noResults: {
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingTop: '3em',
    },
    add: {},
  })
)

export default function EventAdminView({
  events,
  allHeadquarters,
  loadingEvents,
  loadingHeadquarters,
  selectedHeadquarter,
  updateEvents
}: EventsAdminViewProps): JSX.Element {
  const [filteredEvents, setFilteredEvents] = useState<Conference[]>(events)
  const classes = useStyles()
  let [idEvent, setId] = useState<string | undefined>('');
  let [modalTitle, setTitle] = useState<string>('');
  let [buttonSave, setButton] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (id: string | undefined ) => {
    setOpen(true)
    setId(id)
    setTitle('Delete event?')
  }

  const handleClose = () => {
    setOpen(false)
    setButton(true)
    handleChangeFilters({year: '', sortBy: ''})
  }

  //TODO: Create generic utility(used in components multiple)
  const getDatePart = (date: string) => (Moment(date).format('D MMM YYYY'))

  //TODO: Create generic utility(used in components multiple)
  const handleChangeFilters = (filters: ConferenceFilters) => {
    if (filters.sortBy) {
      const sortedAllEvents = filters.sortBy === 'newest' ? Array.from(events).sort(sortDescending) : Array.from(events).sort(sortAscending)

      setFilteredEvents(sortedAllEvents)
    } else {
      setFilteredEvents(events)
    }
  }
  
  //TODO: Create generic utility(used in components multiple)
  const handleHeadquarterChanged = (selectedHeadquarter: string) => {
    let filteredByHeadquarter: Conference[] = events

    if (selectedHeadquarter !== '-1') {
      filteredByHeadquarter = filteredByHeadquarter.filter(
        ({ headquarter,  id}: Conference) =>
        headquarter && id === selectedHeadquarter
      )
    }

    setFilteredEvents(filteredByHeadquarter)
  }

  const history = useHistory()

  const handleLinkEditEvent = (id: string | undefined ) => (history.push(`/event/edit/${id}`))

  const removeEvent = async () => {
    const api = new EventsApi()
    try {
      const data = await api.delete(idEvent)

      if (data.status === 200) {
        setTitle('Successfully deleted!')
        updateEvents(idEvent)
      } else {
        setTitle('Failed delete')
      }
    } catch (error) {
      setTitle('Failed delete')
      console.error(error);
    }

    setButton(false)
  }

  if (loadingEvents) {
    return <>Loading...</>
  }

  return (
    <>
      {!loadingEvents && (
        <FullLayout title="Special Spider App">
          <h1>Events</h1>

          <Grid
            container
            justifyContent="center"
            className={classes.headquarterFilter}
          >

            {!loadingEvents ? (
              <Headquarters
                onChangeHeadquarter={handleHeadquarterChanged}
                allHeadquarters={allHeadquarters}
                selectedHeadquarter={selectedHeadquarter}
                loading={loadingHeadquarters}
              />
            ) : null}

            <DashboardFilters onChangeFilters={handleChangeFilters} />
          </Grid>

          <Grid container justifyContent="center">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">

                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center"># subscriptions</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredEvents.map((row) => (
                    <TableRow
                      key={row.id}
                    >
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="center">{getDatePart(row.eventDate)}</TableCell>
                      <TableCell align="center">15</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <Stack spacing={2} direction="row" justifyContent={'center'}>
                          <Button variant="contained" onClick={() => handleLinkEditEvent(row._id)}>
                            edit
                          </Button>

                          <Button variant="outlined" onClick={() => handleOpen(row._id)}>
                            remove
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {modalTitle}
              </Typography>

              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              
              {buttonSave ? (<Button variant="contained" color="primary" onClick={removeEvent}>Save</Button>) :('')}
            </Box>
          </Modal>
        </FullLayout>
      )}
    </>
  )
}
