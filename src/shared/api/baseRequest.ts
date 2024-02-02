import axios from 'axios'
import getEnvVariables from '../environment/environment'

const baseRequest = () => {
    const { baseApiPath } = getEnvVariables()
    
    const storage = window.localStorage
    const storageData = storage.getItem('token')

    if (storageData) {
      try {
        const token = JSON.parse(storage.getItem('token') || '')
        axios.defaults.headers.common['Authorization'] = token
      } catch (error) {
        console.error('Error parsing token:', error)
      }
    }
  

  const get = (method: string, params: any = null) => {
    return axios.get(getUrl(method), { params: params })
  }

  const getFile = (method: string, params: any) => {
    if (!params) {
      return axios.get(getUrl(method), { responseType: 'blob' })
    }

    return axios.get(
      getUrl(method),
      {
        ...params,
        responseType: 'blob'
      },
    )
  }

  const post = (method: string, data: any, config?: any) => {
    if (!config) {
      return axios.post(getUrl(method), data)
    }

    return axios.post(getUrl(method), data, config)
  }

  const put = (method: string, data: any= null) => {
    return axios.put(getUrl(method), data)
  }

  const deleteEvent = (method: string, params: any) => {
    return axios.delete(getUrl(method), { params: params })
  }

  const deleteEndpoint = (method: string) => {
    return axios.delete(getUrl(method))
  }

  const getUrl = (method: string) => {
    return `${baseApiPath}${method}`
  }

  return { get, getFile, post, put, deleteEvent, deleteEndpoint }
}

export const requests = baseRequest()
