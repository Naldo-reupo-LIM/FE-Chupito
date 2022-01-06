import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, withStyles, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import FullLayout from '../../hocs/FullLayout'
import { withMessage } from '../../hocs/Snackbar'
import { withUserContext } from '../../hocs/UserContext'

import DashboardFilters from '../../components/Dashboard/DashboardFilters'
import EventList from '../../components/EventList/EventList'
import Headquarters from '../../components/Headquarters/Headquarters'
import Loading from '../../components/Loading'
import NavigationWrapper from '../../components/Navigation/NavigationWrapper'
import PreviewEvent from '../../components/PreviewEvent/PreviewEvent'

import { sortDescending, sortAscending } from '../../tools'

import database from '../../database/database'
import DataService from '../../database/dataService'

import Events from '../../api/events'

import { HeadquarterAPI, ConferenceAPI } from '../../shared/api'

import { styles } from '../../styles/Dashboard'

class EventsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allHeadquarters: [],
      filter: null,
      events: null,
      selectedYear: null,
      selectedHeadquarter: null,
      selectedEvent: null,
      sortBy: null,
      loading: false,
      error: null,
      loadingHeadquarters: true,
    }

    this.api = new Events()
    this.apiConferences = ConferenceAPI()
    this.apiHeadquarters = HeadquarterAPI()
    this.db = new DataService(database, 'attendees')
  }

  fetchHeadquarters = () => {
    this.apiHeadquarters
      .getAll()
      .then((headquarters) => {
        this.setState({
          allHeadquarters: headquarters,
        })
      })
      .catch((error) => {
        console.log('Error retrieving all headquarters')
        console.error(error)
      })
      .finally(() => {
        this.setState({
          loadingHeadquarters: false,
        })
      })
  }

  componentDidMount() {
    this.fetchHeadquarters()
    this.fetchEvents()
  }

  fetchEvents = () => {
    // const { selectedYear, selectedHeadquarter, selectedEvent } = this.state
    const { showLoading, hideMessage, userContext } = this.props

    // if (!selectedYear || !selectedHeadquarter) {
    //   return
    // }

    console.log('user info:', userContext.user)

    showLoading()

    // this.api.getAll(selectedYear, selectedHeadquarter, userContext.user.isAdmin)
    this.apiConferences.getAll()
      .then((events) => {
        // let newSelectedEvent = null

        // if (selectedEvent) {
        //   const index = events.findIndex((event) => {
        //     return event.id === selectedEvent.id
        //   })

        //   newSelectedEvent = index > 0 ? events[index] : null
        // }

        this.setState(
          {
            events: this.sortByDate(events),
            // selectedEvent: newSelectedEvent,
            loading: false,
            error: null,
          },
          () => {
            hideMessage()
          }
        )
      })
      .catch((error) => {
        this.setState({ loading: false })
        hideMessage()
        console.error(error)
      })
  }

  sortByDate = (events) => {
    const { sortBy } = this.state

    if (!events) {
      return
    }

    if (sortBy === 'newest') {
      return events.sort(sortDescending)
    }

    return events.sort(sortAscending)
  }

  handleHeadquarterChanged = (selectedHeadquarter) => {
    this.props.userContext.selectHeadquarter(selectedHeadquarter)
    this.setState({ selectedHeadquarter: selectedHeadquarter }, () => {
      this.fetchEvents()
    })
  }

  handleFiltersChanged = (filters) => {
    this.setState(
      { sortBy: filters.sortBy, selectedYear: filters.year },
      () => {
        this.fetchEvents()
      }
    )
  }

  handleSelectedEvent = (event) => {
    this.setState({ selectedEvent: event })
  }
  // TODO: This function should be moved to a specific component for preview event
  handleOpenClicked = (id) => {
    this.setState({ isLoading: true })

    this.api
      .open(id)
      .then(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.fetchEvents()
          }
        )
      })
      .catch((error) => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }
  // TODO: This function should be moved to a specific component for preview event
  handlePauseClicked = (id) => {
    this.setState({ isLoading: true })

    this.api
      .pause(id)
      .then(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.fetchEvents()
          }
        )
      })
      .catch((error) => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }
  // TODO: This function should be moved to a specific component for preview event
  handleCloseClicked = (id) => {
    this.setState({ isLoading: true })

    this.api
      .close(id)
      .then(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            this.fetchEvents()
          }
        )
      })
      .catch((error) => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }
  // TODO: This function should be moved to a specific component for preview event
  handleEnterClicked = (id) => {
    const { history } = this.props
    this.setState({ selectedEvent: null })
    history.push(`/play-event/${id}`)
  }

  handlePreviewClosed = () => {
    this.setState({ selectedEvent: null })
  }

  handleSynchronizeClicked = (idEvent) => {
    const { showMessage, hideMessage } = this.props

    showMessage('Uploading attendees')

    this.setState({ isLoading: true })
    this.db
      .getByKey('idEvent', idEvent)
      .toArray()
      .then((attendees) => {
        this.api
          .addAttendees(idEvent, attendees)
          .then(() => {
            attendees.forEach((attendee) => {
              this.db
                .delete(attendee.id)
                .then(() => {
                  this.setState(
                    {
                      isLoading: false,
                      activeStep: 2,
                    },
                    () => {
                      hideMessage()
                    }
                  )
                })
                .catch((error) => {
                  console.error(
                    'Error while deleting attendee from IndexedDb',
                    error
                  )
                  this.setState(
                    {
                      isLoading: false,
                    },
                    () => {
                      hideMessage()
                    }
                  )
                })
            })
          })
          .catch((error) => {
            console.error('Error while uploading attendee to server', error)
            this.setState(
              {
                isLoading: false,
              },
              () => {
                hideMessage()
              }
            )
          })
      })
      .catch((error) => {
        console.error('Error while reading attendees from IndexedDb', error)
        this.setState(
          {
            isLoading: false,
          },
          () => {
            hideMessage()
          }
        )
      })
  }

  renderFilters = () => {
    const { allHeadquarters, loadingHeadquarters } = this.state
    const { classes } = this.props

    return (
      <Grid container justify="center" className={classes.headquarterFilter}>
        <Headquarters
          changeHeadquarter={this.handleHeadquarterChanged}
          allHeadquarters={allHeadquarters}
          loadingHeadquarters={loadingHeadquarters}
        />
        <DashboardFilters changeFilters={this.handleFiltersChanged} />
      </Grid>
    )
  }

  renderContent = () => {
    const { loading, events } = this.state

    if (loading) {
      return <Loading isLoading={loading} />
    }

    return (
      <React.Fragment>
        {this.renderFilters()}
        <Grid container>
          <EventList
            events={events}
            onOpen={this.handleOpenClicked}
            onPause={this.handlePauseClicked}
            onClose={this.handleCloseClicked}
            onSelected={this.handleSelectedEvent}
          />
        </Grid>
      </React.Fragment>
    )
  }

  renderAddButton = () => {
    const { classes, userContext } = this.props
    const { isAdmin } = userContext.user

    if (!isAdmin) {
      return null
    }

    return (
      <NavigationWrapper path="/event/add">
        <Fab className={classes.add} color="primary">
          <AddIcon />
        </Fab>
      </NavigationWrapper>
    )
  }
  // TODO: This function should be converted to a specific component
  renderPreviewEvent = () => {
    const { selectedEvent } = this.state
    const { userContext } = this.props
    const { role } = userContext.user

    if (role === 'Marketing') {
      return null
    }

    if (!selectedEvent) {
      return null
    }

    return (
      <PreviewEvent
        event={selectedEvent}
        onOpen={this.handleOpenClicked}
        onPause={this.handlePauseClicked}
        onClose={this.handleCloseClicked}
        onEnter={this.handleEnterClicked}
        onSynchronize={this.handleSynchronizeClicked}
        onPreviewClose={this.handlePreviewClosed}
      />
    )
  }

  render() {
    const { classes } = this.props
    return (
      <FullLayout title="Special Spider App">
        <h1 className={classes.title}>Events</h1>
        {this.renderContent()}
        <h1 className={classes.title}>Accounts</h1>
        {this.renderAddButton()}
        {/*this.renderPreviewEvent()*/}
      </FullLayout>
    )
  }
}

// EventsPage.contextType = ActionsContext

export default withMessage(
  withUserContext(withRouter(withStyles(styles)(EventsPage)))
)
