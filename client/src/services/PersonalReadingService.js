import Api from '@/services/Api'

export default {
  createPersonalReading (personalReading) {
    return Api().post('personalReading/newPersonalReading', personalReading)
  }
}
