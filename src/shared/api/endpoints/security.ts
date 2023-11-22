import { requests } from '../baseRequest'

enum APIEndpoints {
  revoke = 'revoke-token',
}

function Security() {
  const revokeToken = async () => await requests.post(APIEndpoints.revoke, {})

  return { revokeToken }
}

export default Security
