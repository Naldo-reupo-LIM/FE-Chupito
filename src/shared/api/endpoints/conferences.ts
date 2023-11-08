import { requests } from '../../../api/baseRequest'
import { Conference } from './../../entities'

enum ConferenceAPIEndpoints {
  getAll = 'events',
}

function ConferenceAPI() {
  const getAll = async (): Promise<Conference[]> => {
    const { data: myData } = await requests.get(ConferenceAPIEndpoints.getAll)
    const { data: eventData } = myData
    const conferences: Conference[] = eventData.map(
      (event: Conference) => event
    )
    return conferences
  }

  return {
    getAll,
  }
}

export default ConferenceAPI
