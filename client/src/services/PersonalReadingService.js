import Api from '@/services/Api'

export default {
  createPersonalReading (personalReading) {
    return Api().post('personalReading/newPersonalReading', personalReading)
  },
  getPersonalReadingByLibraryUser (UserId, LibraryId) {
    return Api().get(`/personalReading/getPersonalReading/${UserId}/${LibraryId}`)
  },
  getPersonalReadingById (UserId) {
    return Api().get(`/personalReading/getPersonalReadingById/${UserId}`)
  },
  updateReading (personalReadingId, reading, date) {
    return Api().post(`/personalReading/updateReading/${personalReadingId}/${reading}/${date}`)
  },
  updateComment (personalReadingId, comment) {
    return Api().post(`/personalReading/updateComment/${personalReadingId}/${comment}`)
  },
  findLastFinishedPersonalReading (userId) {
    return Api().get(`/personalReading/findLastFinishedPersonalReading/${userId}`)
  },
  findCurrentlyReadingPersonalReading (userId) {
    return Api().get(`/personalReading/findCurrentlyReadingPersonalReading/${userId}`)
  },
  findBooksReadFromLibraries (userId) {
    return Api().get(`/personalReading/findBooksReadFromLibraries/${userId}`)
  },
  findAverages (userId) {
    return Api().get(`/personalReading/findAverages/${userId}`)
  }
}
