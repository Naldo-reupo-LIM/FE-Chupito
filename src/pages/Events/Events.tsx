import { useState, useContext, useEffect } from 'react'

import UserContext from '../../shared/contexts/UserContext'
import EventsView from '../../components/EventsView/EventsView'
import { HeadquartersAPI, ConferenceAPI } from '../../shared/api'
import { Conference, Headquarter } from '../../shared/entities'
import { sortAscending } from '../../shared/tools/sorting'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import Events from '../../shared/api/endpoints/events'

export default function EventsPage(): JSX.Element {
  const [allHeadquarters, setAllHeadquarters] = useState<Headquarter[]>([])
  const [events, setEvents] = useState<Conference[]>([])
  const [loadingHeadquarters, setLoadingHeadquarters] = useState(false)
  const [loading, setLoading] = useState(true)

  const apiHeadquarters = HeadquartersAPI()
  const apiConferences = ConferenceAPI()
  const apiEvents = Events()

  const { user } = useContext(UserContext)
  const { state } = useContext(AuthContext)

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
  const fetchEventsAuth = async () => {
    setLoading(true)
    try {
      const events = await apiEvents.getAllEventsAuth()
      setEvents(sortByDate(events))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHeadquarters()
    if (state.isAuth) {
      fetchEventsAuth()
    } else {
      fetchEvents()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuth])

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
        />
      )}
    </>
  )
}
