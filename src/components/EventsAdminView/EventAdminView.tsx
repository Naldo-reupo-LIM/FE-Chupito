import { useState } from 'react';
import { Grid, createStyles, makeStyles } from '@material-ui/core'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Moment from 'moment'

import FullLayout from '../../hocs/FullLayout'
import Headquarters from '../Headquarters/Headquarters';
import DashboardFilters from '../Dashboard/DashboardFilters';
import { Conference, ConferenceFilters, Headquarter } from '../../shared/entities';
import { sortAscending, sortDescending } from '../../tools/sorting';

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

export interface EventsAdminViewProps {
  events: Conference[]
  allHeadquarters: Headquarter[]
  loadingEvents: boolean
  loadingHeadquarters: boolean
  selectedHeadquarter?: string
}

export default function EventAdminView({
  events,
  allHeadquarters,
  loadingEvents,
  loadingHeadquarters,
  selectedHeadquarter,
}: EventsAdminViewProps): JSX.Element {
  const [filteredEvents, setFilteredEvents] = useState<Conference[]>(events)
  const classes = useStyles()
  //TODO: Create generic utility(used in components multiple)
  const getDatePart = (date: string) => {
    const dateObject = Moment(date, 'YYYY-MM-DD')
    return dateObject.format('D MMM YYYY')
  }

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
                          <Button variant="contained">
                            edit
                          </Button>

                          <Button variant="outlined">
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
        </FullLayout>
      )}
    </>
  )
}
