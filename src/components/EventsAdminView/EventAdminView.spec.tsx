import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventAdminView from './EventAdminView'
import { Conference, Headquarter } from '../../shared/entities'
import { EventsAdminViewProps } from '../../shared/entities/props/eventsAdminViewProps'

const renderComponent = (props: EventsAdminViewProps) =>
  render(<EventAdminView {...props} />)

const mockHeadquarter01: Headquarter = {
  id: '0001',
  name: 'Piura',
}

const mockHeadquarter02: Headquarter = {
  id: '0002',
  name: 'Lima',
}

const mockEvent01: Conference = {
  id: '0001',
  eventDate: '2023-01-19',
  name: 'Event 01',
  status: 'active',
  year: 2023,
  headquarter: mockHeadquarter01,
}

const mockEvent02: Conference = {
  id: '0002',
  eventDate: '2023-04-19',
  name: 'Event 02',
  status: 'created',
  year: 2023,
}

const mockEvent03: Conference = {
  id: '0003',
  eventDate: '2023-08-19',
  name: 'Event 03',
  status: 'created',
  year: 2023,
  headquarter: mockHeadquarter02,
}

jest.mock('axios')
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

describe('event table list component', () => {
  it('should render a table with 2 elements', () => {
    const props: EventsAdminViewProps = {
      events: [
        {
          id: '64bed5f1cf2066a1af25c54e',
          address: '121 Main Street',
          eventDate: '2023-06-15T17:00:00.000',
          name: 'Development Day',
          status: 'created',
          year: 2023,
        },
        {
          id: '64bed5f1cf2066a1af25c54f',
          address: '122 Main Street',
          eventDate: '2023-03-15T17:00:00.000',
          name: 'Storm',
          status: 'created',
          year: 2023,
        },
      ],
      allHeadquarters: [],
      loadingEvents: false,
      loadingHeadquarters: false,
      selectedHeadquarter: '',
      updateEvents: jest.fn(),
      updateStatusEvents: jest.fn((mockEvent01) => mockEvent01),
    }

    renderComponent(props)

    const nameTitle = screen.getByText(/Name/i)
    const subscriptionsTitle = screen.getByText(/# subscriptions/i)
    const statusTitle = screen.getByText(/Status/i)
    const actionsTitle = screen.getByText(/Actions/i)

    expect(nameTitle).toBeInTheDocument()
    expect(subscriptionsTitle).toBeInTheDocument()
    expect(statusTitle).toBeInTheDocument()
    expect(actionsTitle).toBeInTheDocument()

    expect(screen.getByText(/Development Day/i)).toBeInTheDocument()
    expect(screen.getByText(/Storm/i)).toBeInTheDocument()
  })

  it('should render 3 events and filtered by headquarter ', async () => {
    const mockEvents: Conference[] = [mockEvent01, mockEvent02, mockEvent03]
    const mockHeadquarters: Headquarter[] = [
      mockHeadquarter01,
      mockHeadquarter02,
    ]
    const props: EventsAdminViewProps = {
      events: mockEvents,
      allHeadquarters: mockHeadquarters,
      loadingEvents: false,
      loadingHeadquarters: false,
      updateEvents: jest.fn(),
      updateStatusEvents: jest.fn((mockEvent01) => mockEvent01),
    }
    renderComponent(props)
    const eventsTitle = screen.getByText(/events/i)

    const eventElement01 = screen.getByText(/event 01/i)
    const eventElement02 = screen.getByText(/event 02/i)
    const eventElement03 = screen.getByText(/event 03/i)

    expect(eventsTitle).toBeInTheDocument()

    expect(eventElement01).toBeInTheDocument()
    expect(eventElement02).toBeInTheDocument()
    expect(eventElement03).toBeInTheDocument()

    const dropdownLabel = /choose a headquarter/i
    const headquarterDropdown = await screen.findByLabelText(dropdownLabel)

    expect(headquarterDropdown).toBeInTheDocument()

    userEvent.click(headquarterDropdown)

    const listbox = await screen.findByRole('listbox')

    userEvent.click(within(listbox).getByText(/piura/i))

    expect(await screen.findByText(/piura/i)).toBeInTheDocument()

    expect(screen.queryByText(/event 02/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/event 03/i)).not.toBeInTheDocument()
  })
})
