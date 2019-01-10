import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  enhancedregister (credentials) {
    return Api().post('enhancedregister', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  getUserByEmailOrUsername (query) {
    return Api().get(`getUserByEmailOrUsername/${query}`)
  },
  getUserById (UserId) {
    return Api().get(`getUserById/${UserId}`)
  }
}
