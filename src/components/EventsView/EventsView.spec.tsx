import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useMediaQuery from '@mui/material/useMediaQuery'

import { Conference, Headquarter } from '../../shared/entities'
import EventsView, { EventsViewProps } from './EventsView'

const renderComponent = (props: EventsViewProps) =>
  render(<EventsView {...props} />)

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
  status: 'created',
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

describe('events view component', () => {
  describe('with loaded data', () => {
    it('should render all elements without data', () => {
      const mockEvents: Conference[] = []
      const mockHeadquarters: Headquarter[] = []
      const props: EventsViewProps = {
        events: mockEvents,
        allHeadquarters: mockHeadquarters,
        loadingEvents: false,
        loadingHeadquarters: false,
        isAdmin: false,
      }
      renderComponent(props)
      const eventsTitle = screen.getByText(/events/i)
      const headquarterTitle = screen.getByLabelText(/choose a headquarter/i)

      expect(eventsTitle).toBeInTheDocument()
      expect(headquarterTitle).toBeInTheDocument()
    })

    it('should render 3 events', () => {
      const mockEvents: Conference[] = [mockEvent01, mockEvent02, mockEvent03]
      const mockHeadquarters: Headquarter[] = []
      const props: EventsViewProps = {
        events: mockEvents,
        allHeadquarters: mockHeadquarters,
        loadingEvents: false,
        loadingHeadquarters: false,
        isAdmin: false,
      }
      renderComponent(props)
      const eventsTitle = screen.getByText(/events/i)
      const headquarterTitle = screen.getByLabelText(/choose a headquarter/i)

      const eventElement01 = screen.getByText(/event 01/i)
      const eventElement02 = screen.getByText(/event 02/i)
      const eventElement03 = screen.getByText(/event 03/i)

      expect(eventsTitle).toBeInTheDocument()
      expect(headquarterTitle).toBeInTheDocument()

      expect(eventElement01).toBeInTheDocument()
      expect(eventElement02).toBeInTheDocument()
      expect(eventElement03).toBeInTheDocument()
    })

    it('should render 3 events and sorted by: ', async () => {
      const mockEvents: Conference[] = [mockEvent01, mockEvent02, mockEvent03]
      const mockHeadquarters: Headquarter[] = []
      const props: EventsViewProps = {
        events: mockEvents,
        allHeadquarters: mockHeadquarters,
        loadingEvents: false,
        loadingHeadquarters: false,
        isAdmin: false,
      }
      renderComponent(props)
      const eventsTitle = screen.getByText(/events/i)
      const headquarterTitle = screen.getByLabelText(/choose a headquarter/i)

      const eventElement01 = screen.getByText(/event 01/i)
      const eventElement02 = screen.getByText(/event 02/i)
      const eventElement03 = screen.getByText(/event 03/i)

      expect(eventsTitle).toBeInTheDocument()
      expect(headquarterTitle).toBeInTheDocument()

      expect(eventElement01).toBeInTheDocument()
      expect(eventElement02).toBeInTheDocument()
      expect(eventElement03).toBeInTheDocument()

      const dropdownLabel = /sorter/i
      const filterByYearElement = screen.getByRole('button', {
        name: dropdownLabel,
      })

      expect(filterByYearElement).toBeInTheDocument()

      userEvent.click(filterByYearElement)
    })

    it('should render 3 events and filtered by headquarter ', async () => {
      const mockEvents: Conference[] = [mockEvent01, mockEvent02, mockEvent03]
      const mockHeadquarters: Headquarter[] = [
        mockHeadquarter01,
        mockHeadquarter02,
      ]
      const props: EventsViewProps = {
        events: mockEvents,
        allHeadquarters: mockHeadquarters,
        loadingEvents: false,
        loadingHeadquarters: false,
        isAdmin: false,
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
    it('should render title  when device is WEB', () => {
      jest.mock('@mui/material/useMediaQuery', () =>
        jest.fn().mockImplementation((query) => {
          return true
        })
      )
      const mockEvents: Conference[] = [mockEvent01, mockEvent02, mockEvent03]
      const mockHeadquarters: Headquarter[] = []
      const props: EventsViewProps = {
        events: mockEvents,
        allHeadquarters: mockHeadquarters,
        loadingEvents: false,
        loadingHeadquarters: false,
        isAdmin: false,
      }

      renderComponent(props)
      const webEventsViewVersion = screen.getByText(/events/i)
      expect(webEventsViewVersion).toBeInTheDocument()
    })
  })
})
