import ConferenceAPI from './conferences'
import { requests } from '../../../api/baseRequest'

const mockResult = {
  data: [
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
  ],
}
jest.mock('../../../api/baseRequest', () => ({
  requests: {
    get: () => jest.fn().mockResolvedValue(mockResult),
  },
}))

describe('events api call', () => {
  it('should get all', async () => {
    const events = ConferenceAPI()
    const result = await events.getAll()
    expect(requests.get).toHaveBeenCalledWith('events')
    expect(result).toBe(mockResult.data)
  })
})
