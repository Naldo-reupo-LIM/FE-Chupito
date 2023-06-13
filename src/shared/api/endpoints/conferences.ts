import { requests } from '../../../api/baseRequest'

import { Conference } from './../../entities'

function ConferenceAPI() {
  const getAll = async (): Promise<Conference[]> => {
    const { data: myData } = await requests.get(`events`)

    const { data: eventData } = myData
    const conferences: Conference[] = eventData.map(
      (event: any) => event as Conference
    )
    return conferences
  }

  return {
    getAll,
  }
}

export default ConferenceAPI
