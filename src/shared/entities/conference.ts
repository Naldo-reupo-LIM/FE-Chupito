import { ImageMediaType } from './media'
import { Headquarter } from './headquarter'

export type ConferenceStatus = 'created' | 'opened' | 'paused' | 'closed'

export interface Conference {
  id: string
  name: string
  eventDate: string
  status: ConferenceStatus
  address?: string
  year?: number
  images?: ImageMediaType[]
  headquarter?: Headquarter
  _id?: string
  subscribed?: boolean
}

export interface ConferenceFilters {
  year: string
  sortBy: string
}

export interface DataValidation {
  error: boolean
  message?: string
}

export interface ConferenceDataValidation {
  name: DataValidation
  date: DataValidation
}
