import { render, screen } from '@testing-library/react'
import EventDetails, { EventDetailsProps } from './EventDetails'

const renderComponent = (props: EventDetailsProps) =>
  render(<EventDetails {...props} />)

const mockEventInfoProps = {
  name: 'Events',
  id: '029r72856736573',
  eventDate: '',
}

describe('event view component', () => {
  it('should render all elements', () => {
    const props: EventDetailsProps = {
      eventDetails: mockEventInfoProps,
      isSubscribed: true,
      subscribedValidationHandler: jest.fn(),
    }
    renderComponent(props)

    const eventName = screen.getByLabelText(/title/i)
    const btnRegister = screen.getByRole('button', { name: /Subscribed/i })
    const imgList = screen.getByTestId(/image-list-container/i)

    expect(eventName).toBeInTheDocument()
    expect(btnRegister).toBeInTheDocument()
    expect(imgList).toBeInTheDocument()
  })
})
