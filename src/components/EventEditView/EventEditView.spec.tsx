import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'
import EventsApi from '../../api/events'
import EventEditView from './EventEditView'
import { EventEditViewProps } from '../../shared/entities/props/eventEditViewProps'

const api = new EventsApi()

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

const service = {
  name: 'Pink day',
  date: '2023-03-15T17:00:00.000',
  headquarter: '64b979b96d50f43aaefa1a50',
  address: '121 Main Street',
  type: 'Sales',
  description: 'Dress up green!',
  tags: 'Devops',
  phoneNumber: '',
}

const mockedAxios = axios as jest.Mocked<typeof axios>
axios.post = jest.fn()
mockedAxios.post.mockResolvedValueOnce(service)

const mockHistoryPush = jest.fn()

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
}))

describe('event view component', () => {
  it('should render all elements', () => {
    renderComponent(props)

    const eventName = screen.getByText(/title/i)
    const eventDate = screen.getByText(/date/i)
    const headquarter = screen.getByText(/HQ/i)
    const address = screen.getByText(/address/i)
    const type = screen.getByText(/address/i)
    const tags = screen.getByText(/event type/i)
    const description = screen.getByText(/description/i)
    const phoneNumber = screen.getByText(/phone/i)
    const salesEventType = screen.getByRole('radio', { name: /Recruiting/i })

    expect(eventName).toBeInTheDocument()
    expect(eventDate).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(headquarter).toBeInTheDocument()
    expect(type).toBeInTheDocument()
    expect(tags).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(phoneNumber).toBeInTheDocument()
    expect(salesEventType).toBeInTheDocument()
    expect(true).toBe(true)
  })

  it('Edit event', async () => {
    expect(axios.post).not.toHaveBeenCalled()
    await api.add(service)
    expect(axios.post).toHaveBeenCalled()
  })

  it('Redirects to correct URL on click', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <EventEditView {...props} />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('redirect'))
    expect(mockHistoryPush).toHaveBeenCalledWith('/events/list')
  })
})
