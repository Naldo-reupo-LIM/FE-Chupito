import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/useAuth';
import EventsApi from '../../shared/api/endpoints/events';
import EventDetails from '../../components/EventDetails/EventDetails';

export interface EventInfoPageProps {
  name: string
  id: string
  eventDate: string
  status: string
  description: string
  tags: string
  type: string
}

export default function EventInfoPage(): JSX.Element {
  const history = useHistory()
  const { id } = useParams<{ id: string }>() as { id: string }
  const [isSubscribed, setIsSubscribed] = useState(false)

  const [eventDetails, setEventDetails] = useState<EventInfoPageProps>({
    id: '',
    name: '',
    eventDate: '',
    status: '',
    description: '',
    tags: '',
    type: '',
  })
  const { state: { isAuth } } = useAuth()

  const subscribedValidationHandler = () => {
    history.push(`${isAuth ? `/event-info/${id}` : `/login?eventId=${id}`}`)
  }

  const goBack = () => window.history.back();

  const fetchEventAndSubscriptionDetails = async (eventId: string) => {
    try {
      const [eventResponse, subscriptionResponse] = await Promise.all([
        EventsApi().getById(eventId),
        EventsApi().verifyUserEventSubscribed(eventId)
      ]);
      const isSubscribed = subscriptionResponse.attendanceConfirmed;

      setEventDetails(eventResponse);
      setIsSubscribed(isSubscribed);
    } catch (error) {
      console.error("Error fetching event or subscription data:", error);
    }
  }

  useEffect(() => {
    if (id || isAuth) {
      fetchEventAndSubscriptionDetails(id)
    }
  }, [id, isAuth])

  return (
    <EventDetails
      eventDetails={eventDetails}
      isSubscribed={isSubscribed}
      subscribedValidationHandler={subscribedValidationHandler}
      goBack= {goBack}
    />
  )
}
