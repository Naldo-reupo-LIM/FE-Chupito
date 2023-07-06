import baseRequest from './baseRequest'

export default class Users extends baseRequest {
  constructor() {
    super()
    this.methodAll = 'users'
    this.method = 'user'
  }

  getAll = async (filters) => {
    const response = await this.get(this.methodAll)
    return response.data.data
  }

  getUserById = async (id) => {
    //TODO: Add endpoint user by id
  }
  getById = async (id) => {
    const response = await this.get(`${this.method}/${id}`)
    return response.data.data
  }

  add = (user) => {
    return this.post(this.method, user)
  }

  update = (user) => {
    return this.put(`${this.method}/${user.id}`, user)
  }

  toggleEnabled = (userId) => {
    return this.delete(`${this.method}/${userId}`)
  }

  changePassword = (user) => {
    return this.post(`${this.method}/${user.id}/change-password`, user)
  }
}
