import { Conference } from "../conference"
import { Headquarter } from "../headquarter"

export interface EventsAdminViewProps {
  events: Conference[]
  allHeadquarters: Headquarter[]
  loadingEvents: boolean
  loadingHeadquarters: boolean
  selectedHeadquarter?: string
  updateEvents:(id: string | undefined) => void
}
