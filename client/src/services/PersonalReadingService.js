import Api from '@/services/Api'

export default {
  createPersonalReading (personalReading) {
    return Api().post('personalReading/newPersonalReading', personalReading)
  },
  getPersonalReadingByLibraryUser (UserId, LibraryId) {
    return Api().get(`/personalReading/getPersonalReading/${UserId}/${LibraryId}`)
  },
  updateReading (personalReadingId, reading, date) {
    return Api().post(`/personalReading/updateReading/${personalReadingId}/${reading}/${date}`)
  }
}
