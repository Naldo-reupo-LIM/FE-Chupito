import EventView from '../../components/EventView/EventView'

 //TODO: Get info from database (not provided)
import { mockTags } from '../../mocks/tags'
//TODO: Get info from database (not provided)
import { mockHeadquarters } from '../../mocks/headquarter'

export default function EventPage(): JSX.Element {
  const onChangeEventName = () => {}
  const onChangeEventDate = () => {}
  const onChangeAddress = () => {}
  const onChangePhoneNumber = () => {}

  return (
    <EventView
      eventType=""
      eventName=""
      eventDate=""
      address=""
      phoneNumber=""
      eventDescription=""
      eventTag=""
      headquarters={mockHeadquarters}
      headquarter=""
      tags={mockTags}
      isLoading={false}
      validation={{
        name: { error: false, message: '' },
        date: { error: false, message: '' },
      }}
      onChangeEventName={onChangeEventName}
      onChangeEventDate={onChangeEventDate}
      onChangeAddress={onChangeAddress}
      onChangePhoneNumber={onChangePhoneNumber}
    />
  )
}
