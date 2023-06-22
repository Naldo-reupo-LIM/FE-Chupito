import axios from 'axios'

export default class baseRequest {
  constructor() {
    this.basePath = process.env.REACT_APP_BASE_PATH
    const storage = window.localStorage
    const storageData = storage.getItem('token')

    if (storageData) {
      const token = JSON.parse(storage.getItem('token'))

      axios.defaults.headers.common['Authorization'] = token
    }
  }

  get = (method, params, config) => {
    if (!config) {
      return axios.get(this.getUrl(method), { params: params })
    }

    return axios.get(
      this.getUrl(method),
      {
        params: params,
      },
      config
    )
  }

  getFile = (method, params) => {
    if (!params) {
      return axios.get(this.getUrl(method), { responseType: 'blob' })
    }

    return axios.get(
      this.getUrl(method),
      {
        params: params,
      },
      { responseType: 'blob' }
    )
  }

  post = (method, data, config) => {
    if (!config) {
      return axios.post(this.getUrl(method), data)
    }

    return axios.post(this.getUrl(method), data, config)
  }

  put = (method, data) => {
    return axios.put(this.getUrl(method), data)
  }

  delete = (method, params) => {
    return axios.delete(this.getUrl(method), { params: params })
  }

  getUrl = (method) => {
    return `${this.basePath}${method}`
  }
}

export const requests = new baseRequest()
