import ConferenceAPI from './conferences'

const mockResult = {
  data: {
    data: [
      {
        _id: '01',
        name: 'LinuxCon',
        eventDate: '2021-12-28',
        status: 'created',
      },
      {
        _id: '02',
        name: 'KubernetesCon',
        eventDate: '2022-10-08',
        status: 'created',
      },
    ],
  },
}

const mockGet = jest.fn()
jest.mock('../baseRequest', () => ({
  requests: {
    get: () => mockGet(),
  },
}))

describe('events api call', () => {
  it('should get all', async () => {
    mockGet.mockResolvedValue(mockResult)
    const events = ConferenceAPI()
    const result = await events.getAll()

    expect(result).toEqual(mockResult.data.data)
  })
})
