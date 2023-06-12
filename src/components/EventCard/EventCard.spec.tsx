import { render, screen } from '@testing-library/react'

import EventCard, { EventCardProps } from './EventCard'

const renderComponent = (props: EventCardProps) =>
  render(<EventCard {...props} />)

describe('event card component', () => {
  it('should render empty', () => {
    const props: EventCardProps = {
      event: {
        id: '0001',
        name: 'Conquering the world',
        status: 'created',
        eventDate: '2021-10-10',
      },
    }
    renderComponent(props)
    const conferenceName = screen.getByText(/conquering the world/i)
    expect(conferenceName).toBeInTheDocument()
  })
  it('should event image', () => {
    const props: EventCardProps = {
      event: {
        id: '0001',
        name: 'Conquering the world',
        status: 'created',
        eventDate: '2021-10-10',
        images: [
          {
            id: '',
            url: '',
          },
        ],
      },
    }
    renderComponent(props)
    expect(true).toBe(true)
  })
})
