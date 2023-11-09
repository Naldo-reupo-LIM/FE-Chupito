import { render, screen } from '@testing-library/react'
import axios from 'axios';

import EventView, { EventViewProps } from './EventView'
import EventsApi from '../../shared/api/endpoints/events'

const api = new EventsApi()

const renderComponent = (props: EventViewProps) =>
  render(<EventView {...props} />)

const mockOnChange = jest.fn()

const props: EventViewProps = {
  headquarters: [
    { _id: '64c3f59244d9afa500ea1422', name: 'Piura' },
    { _id: '64c3f59244d9afa500ea1423', name: 'Lima' },
  ],
  tags: [
    { _id: 'Architecture', name: 'Architecture' },
    { _id: 'Design', name: 'Design' },
  ],
  headquarter: 'piura',
  eventType: 'Sales',
  eventTag: 'Design',
  eventDescription: 'Test',
  eventName: 'Test',
  eventDate: '2023-03-15T17:00:00.000',
  address: '121 Main Street',
  phoneNumber: '3100000000',
  isLoading: false,
  validation: { name: { error: false }, date: { error: false } },
  onChangeEventName: mockOnChange,
  onChangeEventDate: mockOnChange,
  onChangeAddress: mockOnChange,
  onChangePhoneNumber: mockOnChange,
}

const service = {
  name: "Pink day",
  date: "2023-03-15T17:00:00.000",
  headquarter: "64b979b96d50f43aaefa1a50",
  address: "121 Main Street",
  type: "Sales",
  description: "Dress up green!",
  tags: "Devops",
  phoneNumber: "" 
};

const mockedAxios = axios as jest.Mocked<typeof axios>;
axios.post = jest.fn();
mockedAxios.post.mockResolvedValueOnce(service);

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
  })

  it('create event', async () => {
    expect(axios.post).not.toHaveBeenCalled();
    await api.add(service)
    expect(axios.post).toHaveBeenCalled(); 
  })
})
