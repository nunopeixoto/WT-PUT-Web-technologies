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
  }
}
