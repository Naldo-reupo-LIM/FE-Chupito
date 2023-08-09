import { render } from '@testing-library/react'
import EventEditPage from './EventEdit'
import EventEditView, { EventEditViewProps } from '../../components/EventEditView/EventEditView'

const renderComponent = (props: EventEditViewProps) =>
  render(<EventEditView {...props} />)

const props: EventEditViewProps = {
headquarters: [
    { id: '64c3f59244d9afa500ea1422', name: 'Piura' },
    { id: '64c3f59244d9afa500ea1423', name: 'Lima' },
],
tags: [
    { id: 'Architecture', name: 'Architecture' },
    { id: 'Design', name: 'Design' },
],
isLoading: false,
validation: { name: { error: false }, date: { error: false } },
}

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react'),
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '64cc04d273db4bafb6f93af0',
  }),
  useRouteMatch: () => ({ url: '/event/edit/64cc04d273db4bafb6f93af0' }),

  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Event Info Page', () => {
  it('should render component', () => {
    render(<EventEditPage />)
    renderComponent(props)
  })
})
