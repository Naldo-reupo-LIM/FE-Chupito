import ConferenceAPI from './conferences'
import { requests } from '../../../api/baseRequest'

const mockResult = {
  data: {
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
  },
}

describe('events api call', () => {
  it('should get all', async () => {
    const events = ConferenceAPI()
    requests.get = jest.fn().mockResolvedValue(mockResult)
    const result = await events.getAll()
    expect(requests.get).toHaveBeenCalledWith('events')
    expect(result).toEqual(mockResult.data.data)
  })
})
