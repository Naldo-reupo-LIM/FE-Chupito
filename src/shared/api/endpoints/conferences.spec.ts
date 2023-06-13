import { Conference } from '../../entities'

import ConferenceAPI from './conferences'

/* const mockFn = jest.fn()
jest.mock('./base', () => ({
  getAppCollections: () => mockFn(),
})) */
const mockFn = jest.fn()
jest.mock('../../../api/baseRequest', () => ({
  requests: () => mockFn(),
}))

describe('events api call', () => {
  it('should get all', async () => {
    const mockResult: Conference[] = [
      {
        id: '01',
        name: 'LinuxCon',
        eventDate: '2021-12-28',
        status: 'created',
      },
      {
        id: '02',
        name: 'KubernetesCon',
        eventDate: '2022-10-08',
        status: 'created',
      },
    ]
    mockFn.mockResolvedValue(mockResult)

    const events = ConferenceAPI()
    const result = await events.getAll()
    expect(result.length).toBe(mockResult.length)
  })
})
