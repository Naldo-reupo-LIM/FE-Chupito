import { useState, useContext, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import { createStyles, Fab, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// import { withMessage } from '../../hocs/Snackbar'

import UserContext from '../../shared/contexts/UserContext'

import EventsView from '../../components/EventsView/EventsView'
import NavigationWrapper from '../../components/Navigation/NavigationWrapper'
// import Loading from '../../components/Loading'

// import PreviewEvent from '../../components/PreviewEvent/PreviewEvent'

// import database from '../../database/database'
// import DataService from '../../database/dataService'

import { HeadquarterAPI, ConferenceAPI } from '../../shared/api'

import { Conference, Headquarter } from '../../shared/entities'

import { sortAscending } from '../../tools/sorting'

const useStyles = makeStyles(() =>
  createStyles({
    addButton: {},
  })
)

export default function EventsPage(): JSX.Element {
  const [allHeadquarters, setAllHeadquarters] = useState<Headquarter[]>([])
  const [events, setEvents] = useState<Conference[]>([])
  const [loadingHeadquarters, setLoadingHeadquarters] = useState(false)
  const [loading, setLoading] = useState(true)

  // const [selectedHeadquarter, setSelectedHeadquarter] = useState('-1')

  const apiHeadquarters = HeadquarterAPI()
  const apiConferences = ConferenceAPI()

  const { user } = useContext(UserContext)
  //const history = useHistory()
  const classes = useStyles()

  const fetchHeadquarters = () => {
    setLoadingHeadquarters(true)
    apiHeadquarters
      .getAll()
      .then((headquarters) => {
        setAllHeadquarters(headquarters)
      })
      .catch((error) => {
        console.log('Error retrieving all headquarters')
        console.error(error)
      })
      .finally(() => {
        setLoadingHeadquarters(false)
      })
  }

  const sortByDate = (events: Conference[]) => events.sort(sortAscending)

  const fetchEvents = () => {
    setLoading(true)

    apiConferences
      .getAll()
      .then((events) => {
        // let newSelectedEvent = null

        // if (selectedEvent) {
        //   const index = events.findIndex((event) => {
        //     return event.id === selectedEvent.id
        //   })

        //   newSelectedEvent = index > 0 ? events[index] : null
        // }
        setEvents(sortByDate(events))
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchHeadquarters()
    fetchEvents()
    /* eslint-disable */
  }, [])

  /* eslint-enable */
  // const handleHeadquarterChanged = (selectedHeadquarter: string) => {
  //   // this.props.userContext.selectHeadquarter(selectedHeadquarter)
  //   setSelectedHeadquarter(selectedHeadquarter)
  //   fetchEvents()
  // }

  // const handleEnterClicked = (event: Conference) => {
  //   history.push(`/play-event/${event.id}`)
  // }

  if (loading) {
    return <>Loading events</>
  }

  return (
    <>
      {!loading && (
        <EventsView
          events={events}
          allHeadquarters={allHeadquarters}
          loadingEvents={loading}
          loadingHeadquarters={loadingHeadquarters}
          isAdmin={user?.isAdmin || false}
          //onSelectedEvent={handleEnterClicked}
        />
      )}

      <NavigationWrapper path="/event/add">
        <Fab className={classes.addButton} color="primary">
          <AddIcon />
        </Fab>
      </NavigationWrapper>
    </>
  )
}

// class EventsPage extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       allHeadquarters: [],
//       filter: null,
//       events: null,
//       selectedYear: null,
//       selectedHeadquarter: null,
//       selectedEvent: null,
//       sortBy: null,
//       loading: false,
//       error: null,
//       loadingHeadquarters: true,
//     }

//     this.api = new Events()
//     this.apiConferences = ConferenceAPI()
//     this.apiHeadquarters = HeadquarterAPI()
//     this.db = new DataService(database, 'attendees')
//   }

//   fetchHeadquarters = () => {
//     this.apiHeadquarters
//       .getAll()
//       .then((headquarters) => {
//         this.setState({
//           allHeadquarters: headquarters,
//         })
//       })
//       .catch((error) => {
//         console.log('Error retrieving all headquarters')
//         console.error(error)
//       })
//       .finally(() => {
//         this.setState({
//           loadingHeadquarters: false,
//         })
//       })
//   }

//   componentDidMount() {
//     this.fetchHeadquarters()
//     this.fetchEvents()
//   }

//   fetchEvents = () => {
//     // const { selectedYear, selectedHeadquarter, selectedEvent } = this.state
//     const { showLoading, hideMessage, userContext } = this.props

//     // if (!selectedYear || !selectedHeadquarter) {
//     //   return
//     // }

//     console.log('user info:', userContext.user)

//     showLoading()

//     // this.api.getAll(selectedYear, selectedHeadquarter, userContext.user.isAdmin)
//     this.apiConferences.getAll()
//       .then((events) => {
//         // let newSelectedEvent = null

//         // if (selectedEvent) {
//         //   const index = events.findIndex((event) => {
//         //     return event.id === selectedEvent.id
//         //   })

//         //   newSelectedEvent = index > 0 ? events[index] : null
//         // }

//         this.setState(
//           {
//             events: this.sortByDate(events),
//             // selectedEvent: newSelectedEvent,
//             loading: false,
//             error: null,
//           },
//           () => {
//             hideMessage()
//           }
//         )
//       })
//       .catch((error) => {
//         this.setState({ loading: false })
//         hideMessage()
//         console.error(error)
//       })
//   }

//   handleSelectedEvent = (event) => {
//     this.setState({ selectedEvent: event })
//   }
//   // TODO: This function should be moved to a specific component for preview event
//   handleOpenClicked = (id) => {
//     this.setState({ isLoading: true })

//     this.api
//       .open(id)
//       .then(() => {
//         this.setState(
//           {
//             isLoading: false,
//           },
//           () => {
//             this.fetchEvents()
//           }
//         )
//       })
//       .catch((error) => {
//         console.error(error)
//         this.setState({ isLoading: false })
//       })
//   }
//   // TODO: This function should be moved to a specific component for preview event
//   handlePauseClicked = (id) => {
//     this.setState({ isLoading: true })

//     this.api
//       .pause(id)
//       .then(() => {
//         this.setState(
//           {
//             isLoading: false,
//           },
//           () => {
//             this.fetchEvents()
//           }
//         )
//       })
//       .catch((error) => {
//         console.error(error)
//         this.setState({ isLoading: false })
//       })
//   }
//   // TODO: This function should be moved to a specific component for preview event
//   handleCloseClicked = (id) => {
//     this.setState({ isLoading: true })

//     this.api
//       .close(id)
//       .then(() => {
//         this.setState(
//           {
//             isLoading: false,
//           },
//           () => {
//             this.fetchEvents()
//           }
//         )
//       })
//       .catch((error) => {
//         console.error(error)
//         this.setState({ isLoading: false })
//       })
//   }
//   // TODO: This function should be moved to a specific component for preview event
//   handleEnterClicked = (id) => {
//     const { history } = this.props
//     this.setState({ selectedEvent: null })
//     history.push(`/play-event/${id}`)
//   }

//   handlePreviewClosed = () => {
//     this.setState({ selectedEvent: null })
//   }

//   handleSynchronizeClicked = (idEvent) => {
//     const { showMessage, hideMessage } = this.props

//     showMessage('Uploading attendees')

//     this.setState({ isLoading: true })
//     this.db
//       .getByKey('idEvent', idEvent)
//       .toArray()
//       .then((attendees) => {
//         this.api
//           .addAttendees(idEvent, attendees)
//           .then(() => {
//             attendees.forEach((attendee) => {
//               this.db
//                 .delete(attendee.id)
//                 .then(() => {
//                   this.setState(
//                     {
//                       isLoading: false,
//                       activeStep: 2,
//                     },
//                     () => {
//                       hideMessage()
//                     }
//                   )
//                 })
//                 .catch((error) => {
//                   console.error(
//                     'Error while deleting attendee from IndexedDb',
//                     error
//                   )
//                   this.setState(
//                     {
//                       isLoading: false,
//                     },
//                     () => {
//                       hideMessage()
//                     }
//                   )
//                 })
//             })
//           })
//           .catch((error) => {
//             console.error('Error while uploading attendee to server', error)
//             this.setState(
//               {
//                 isLoading: false,
//               },
//               () => {
//                 hideMessage()
//               }
//             )
//           })
//       })
//       .catch((error) => {
//         console.error('Error while reading attendees from IndexedDb', error)
//         this.setState(
//           {
//             isLoading: false,
//           },
//           () => {
//             hideMessage()
//           }
//         )
//       })
//   }

//   renderContent = () => {
//     const { loading, events } = this.state

//     if (loading) {
//       return <Loading isLoading={loading} />
//     }

//     return (
//       <React.Fragment>
//         <Grid container>
//           <EventList
//             events={events}
//             onOpen={this.handleOpenClicked}
//             onPause={this.handlePauseClicked}
//             onClose={this.handleCloseClicked}
//             onSelected={this.handleSelectedEvent}
//           />
//         </Grid>
//       </React.Fragment>
//     )
//   }

//   // TODO: This function should be converted to a specific component
//   renderPreviewEvent = () => {
//     const { selectedEvent } = this.state
//     const { userContext } = this.props
//     const { role } = userContext.user

//     if (role === 'Marketing') {
//       return null
//     }

//     if (!selectedEvent) {
//       return null
//     }

//     return (
//       <PreviewEvent
//         event={selectedEvent}
//         onOpen={this.handleOpenClicked}
//         onPause={this.handlePauseClicked}
//         onClose={this.handleCloseClicked}
//         onEnter={this.handleEnterClicked}
//         onSynchronize={this.handleSynchronizeClicked}
//         onPreviewClose={this.handlePreviewClosed}
//       />
//     )
//   }

//   render() {
//     const { classes } = this.props
//     return (
//       <FullLayout title="Special Spider App">
//         <h1 className={classes.title}>Events</h1>
//         {this.renderContent()}
//         {/* <h1 className={classes.title}>Accounts</h1> */}
//         {this.renderAddButton()}
//         {/*this.renderPreviewEvent()*/}
//       </FullLayout>
//     )
//   }
// }

// // EventsPage.contextType = ActionsContext

// export default withMessage(
//   withUserContext(withRouter(withStyles(styles)(EventsPage)))
// )
