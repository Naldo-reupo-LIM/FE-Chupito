import { requests } from '../baseRequest'

enum UsersAPIEndpoints {
  getAll = 'users',
}

function UsersAPI() {

  const getAll = async () => {
    const response = await requests.get(UsersAPIEndpoints.getAll)
    return response.data.data
  }

  return {
    getAll,
  }
}

export default UsersAPI
