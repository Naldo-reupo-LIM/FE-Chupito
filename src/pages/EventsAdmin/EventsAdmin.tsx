import { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { Fab } from "@material-ui/core";

import EventAdminView from "../../components/EventsAdminView/EventAdminView";
import { Conference, Headquarter } from "../../shared/entities";
import { ConferenceAPI, HeadquarterAPI } from "../../shared/api";
import { sortAscending } from "../../tools/sorting";

export default function EventsAdminPage(): JSX.Element {
  const [allHeadquarters, setAllHeadquarters] = useState<Headquarter[]>([])
  const [events, setEvents] = useState<Conference[]>([])
  const [loadingHeadquarters, setLoadingHeadquarters] = useState(false)
  const [loading, setLoading] = useState(true)

  const apiHeadquarters = HeadquarterAPI()
  const apiConferences = ConferenceAPI()

  const fetchHeadquarters =  async () => {
    try {      
      setAllHeadquarters(await apiHeadquarters.getAll())
      setLoadingHeadquarters(false)
    } catch (err) {
      console.error(err)
    }
  }

  const sortByDate = (events: Conference[]) => events.sort(sortAscending)

  const fetchEvents =  async () => {
    setEvents(sortByDate(await apiConferences.getAll()))
    setLoading(false)
  }

  const history = useHistory()

  const handleLinkAddEvent = () => {
    history.push(`/event/add`)
  }

  useEffect(() => {
    fetchHeadquarters()
    fetchEvents()
  }, [])
  
  return (
    <>
      <div>
        <EventAdminView 
          events={events}
          allHeadquarters={allHeadquarters}
          loadingEvents={loading}
          loadingHeadquarters={loadingHeadquarters}
        />

        <Fab color="primary" onClick={handleLinkAddEvent} data-testid="add-event">
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
