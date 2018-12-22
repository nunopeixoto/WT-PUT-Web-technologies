import Api from '@/services/Api'

export default {
  create (library) {
    return Api().post('library', library)
  }
}
