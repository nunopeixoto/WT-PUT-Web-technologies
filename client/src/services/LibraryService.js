import Api from '@/services/Api'

export default {
  create (library) {
    return Api().post('library', library)
  },
  invite (params) {
    return Api().post('/library/invite', params)
  },
  becomeLibraryGuest (email, libraryId) {
    return Api().get(`/library/invite/${email}/${libraryId}`)
  }
}
