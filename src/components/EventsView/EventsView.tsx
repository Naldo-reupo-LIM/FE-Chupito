import { useState } from 'react'
import { makeStyles, createStyles, Grid, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import FullLayout from '../../hocs/FullLayout'
import EventList from '../EventList/EventList'
import Headquarters from '../Headquarters/Headquarters'
import DashboardFilters from '../Dashboard/DashboardFilters'
import NavigationWrapper from '../Navigation/NavigationWrapper'

import {
  Conference,
  Headquarter,
  ConferenceFilters,
} from '../../shared/entities'

import { sortAscending, sortDescending } from '../../tools/sorting'

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

export interface EventsViewProps {
  events: Conference[]
  allHeadquarters: Headquarter[]
  loadingEvents: boolean
  loadingHeadquarters: boolean
  isAdmin: boolean
  selectedHeadquarter?: string
}

export default function EventsView({
  events,
  allHeadquarters,
  loadingEvents,
  loadingHeadquarters,
  isAdmin,
  selectedHeadquarter = '-1',
}: EventsViewProps): JSX.Element {
  const [allEvents] = useState<Conference[]>(events)
  const [filteredEvents, setFilteredEvents] = useState<Conference[]>(events)
  const classes = useStyles()
  const theme = useTheme()
  const matchesDesktopDisplay = useMediaQuery(theme.breakpoints.up('sm'))

  const handleChangeFilters = (filters: ConferenceFilters) => {
    if (filters.sortBy) {
      const sortedAllEvents =
        filters.sortBy === 'newest'
          ? JSON.parse(JSON.stringify(allEvents)).sort(sortDescending)
          : JSON.parse(JSON.stringify(allEvents)).sort(sortAscending)
      setFilteredEvents(sortedAllEvents)
    }
  }

  const handleHeadquarterChanged = (selectedHeadquarter: string) => {
    let filteredByHeadquarter: Conference[] = JSON.parse(
      JSON.stringify(allEvents)
    )

    if (selectedHeadquarter !== '-1') {
      filteredByHeadquarter = filteredByHeadquarter.filter(
        (element: Conference) =>
          element.headquarter && element.headquarter.id === selectedHeadquarter
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
          {matchesDesktopDisplay ? (
            <h1 className={classes.title}>Events</h1>
          ) : null}
          <Grid
            container
            justifyContent="center"
            className={classes.headquarterFilter}
          >
            {loadingEvents && <>Loading Headquarters...</>}
            {!loadingEvents && matchesDesktopDisplay ? (
              <Headquarters
                onChangeHeadquarter={handleHeadquarterChanged}
                allHeadquarters={allHeadquarters}
                selectedHeadquarter={selectedHeadquarter}
                loading={loadingHeadquarters}
              />
            ) : null}
            {matchesDesktopDisplay ? (
              <DashboardFilters onChangeFilters={handleChangeFilters} />
            ) : null}
          </Grid>
          <Grid container>
            <EventList events={filteredEvents} />
          </Grid>
          {isAdmin && (
            <NavigationWrapper path="/event/add">
              <Fab className={classes.add} color="primary">
                <AddIcon />
              </Fab>
            </NavigationWrapper>
          )}
        </FullLayout>
      )}
    </>
  )
}
