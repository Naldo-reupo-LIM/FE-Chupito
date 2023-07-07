import { requests } from '../../../api/baseRequest'
import { Conference } from './../../entities'
import config from '../../../environment/environment'

function ConferenceAPI() {
  const getAll = async (): Promise<Conference[]> => {
    const { data: myData } = await requests.get(config.eventCollectionName)
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
