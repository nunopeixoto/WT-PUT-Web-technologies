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
  },
  getUserLibrarys (userId) {
    return Api().get(`/library/getUserLibrarys/${userId}`)
  },
  getLibraryByName (name) {
    return Api().get(`/library/getLibrary/${name}`)
  },
  getLibraryById (id) {
    return Api().get(`/library/getLibraryById/${id}`)
  }
}
