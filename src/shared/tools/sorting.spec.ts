import { Conference } from '../entities/conference'

import { sortDescending, sortAscending } from './sorting'

describe('sorting arrays', () => {
  describe('get essential validation', () => {
    it('should get a recent date', () => {
      const firstConference: Conference = {
        eventDate: '2023-05-12T22:10:22.222',
        id: 'UI01',
        name: 'Event 01',
        status: 'created',
      }
      const secondConference: Conference = {
        eventDate: '2023-06-12T22:10:22.222',
        id: 'UI02',
        name: 'Event 02',
        status: 'created',
      }
      // Meeting the criteria: 1 is affirmative
      expect(sortDescending(firstConference, secondConference)).toBe(1)
      // Meeting the criteria: 1 is negative
      expect(sortDescending(secondConference, firstConference)).toBe(-1)
    })
  })

  it('should by descending', () => {
    const allEvents: Conference[] = [
      {
        eventDate: '2023-09-12T22:10:22.222',
        id: 'UI03',
        name: 'Event 03',
        status: 'created',
      },
      {
        eventDate: '2023-05-12T22:10:22.222',
        id: 'UI01',
        name: 'Event 01',
        status: 'created',
      },
      {
        eventDate: '2023-06-12T22:10:22.222',
        id: 'UI02',
        name: 'Event 02',
        status: 'created',
      },
    ]
    const sortedByDescending = allEvents.sort(sortDescending)
    expect(sortedByDescending[0].id).toBe('UI03')
    expect(sortedByDescending[2].id).toBe('UI01')
  })

  it('should by ascending', () => {
    const allEvents: Conference[] = [
      {
        eventDate: '2023-09-12T22:10:22.222',
        id: 'UI03',
        name: 'Event 03',
        status: 'created',
      },
      {
        eventDate: '2023-05-12T22:10:22.222',
        id: 'UI01',
        name: 'Event 01',
        status: 'created',
      },
      {
        eventDate: '2023-06-12T22:10:22.222',
        id: 'UI02',
        name: 'Event 02',
        status: 'created',
      },
    ]
    const sortedByDescending = allEvents.sort(sortAscending)
    expect(sortedByDescending[0].id).toBe('UI01')
    expect(sortedByDescending[1].id).toBe('UI02')
    expect(sortedByDescending[2].id).toBe('UI03')
  })
})
