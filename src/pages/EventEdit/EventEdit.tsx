import EventEditView from '../../components/EventEditView/EventEditView'

//TODO: Get info from database (not provided)
import { mockTags } from '../../mocks/tags'
//TODO: Get info from database (not provided)
import { mockHeadquarters } from '../../mocks/headquarter'


export default function EventEditPage(): JSX.Element {
  return (
    <EventEditView
      headquarters={mockHeadquarters}
      tags={mockTags}
      isLoading={false}
      validation={{
        name: { error: false, message: '' },
        date: { error: false, message: '' },
      }}
    />
  )
}
