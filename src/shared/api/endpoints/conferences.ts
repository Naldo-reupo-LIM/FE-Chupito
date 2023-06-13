import { requests } from '../../../api/baseRequest'

import { Conference } from './../../entities'

function ConferenceAPI() {
  const getAll = async (): Promise<Conference[]> => {
    const { data: myData } = await requests.get(`events`)
    console.log(myData)

    const conferences: Conference[] = myData.data.map(
      (event: any) => event as Conference
    )
    return conferences
  }

  return {
    getAll,
  }
}

export default ConferenceAPI
