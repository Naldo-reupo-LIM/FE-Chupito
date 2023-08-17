import { useState, useContext, useEffect } from 'react'

import UserContext from '../../shared/contexts/UserContext'
import EventsView from '../../components/EventsView/EventsView'
import { HeadquarterAPI, ConferenceAPI } from '../../shared/api'
import { Conference, Headquarter } from '../../shared/entities'
import { sortAscending } from '../../tools/sorting'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import Events from '../../api/events'

export default function EventsPage(): JSX.Element {
  const [allHeadquarters, setAllHeadquarters] = useState<Headquarter[]>([])
  const [events, setEvents] = useState<Conference[]>([])
  const [loadingHeadquarters, setLoadingHeadquarters] = useState(false)
  const [loading, setLoading] = useState(true)

  const apiHeadquarters = HeadquarterAPI()
  const apiConferences = ConferenceAPI()
  const apiEvents = new Events()

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
