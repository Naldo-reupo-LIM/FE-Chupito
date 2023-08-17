import { Conference, ConferenceStatus } from '../conference'
import { Headquarter } from '../headquarter'

export interface EventsAdminViewProps {
  events: Conference[]
  allHeadquarters: Headquarter[]
  loadingEvents: boolean
  loadingHeadquarters: boolean
  selectedHeadquarter?: string
  updateEvents: (id: string | undefined) => void
  updateStatusEvents: (id: string | undefined, status: ConferenceStatus) => void
}
