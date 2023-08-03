import baseRequest from './baseRequest'

export default class Events extends baseRequest {
  constructor() {
    super()

    this.method = 'event'
    this.methodAll = 'events'
    this.userMethod = 'users'
  }

  getAll = async (year, headquarterId, showAll) => {
    const response = await this.get(
      `${this.methodAll}/${year}/${headquarterId}/${showAll}`
    )
    return response.data.data
  }

  getAllEventsAuth = async () => {
    const { userMethod, methodAll } = this
    const { data } = await this.get(`${userMethod}/${methodAll}`)
    return data.data
  }

  getAllWithAttendees = async (year) => {
    const response = await this.get(`${this.methodAll}/${year}/with-attendees`)
    return response.data.data
  }

  getById = async (id) => {
    const response = await this.get(`${this.methodAll}/${id}`)
    return response.data.data
  }
  verifyUserEventSubscribed = async (id) => {
    const { userMethod, method } = this
    const { data } = await this.get(`${userMethod}/${method}/${id}`)
    return data.data
  }

  add = async (event) => (await this.post(this.methodAll, event))

  update = (event) => {
    return this.put(`${this.method}/${event.id}`, event)
  }

  updateImages = (id, images) => {
    return this.put(`${this.method}/${id}/images`, { images: images })
  }

  deleteImage = (id, idImage) => {
    return this.delete(`${this.method}/${id}/${idImage}`)
  }

  open = (id) => {
    return this.put(`${this.method}/${id}/open`)
  }

  pause = (id) => {
    return this.put(`${this.method}/${id}/pause`)
  }

  close = (id) => {
    return this.put(`${this.method}/${id}/close`)
  }

  addAttendees = (id, attendees) => {
    return this.put(`${this.methodAll}/${id}/attendees`, {
      attendees: attendees,
    })
  }
}
