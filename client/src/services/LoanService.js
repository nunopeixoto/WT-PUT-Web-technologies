import Api from '@/services/Api'

export default {
  addLoan (loan) {
    return Api().post('loan/create', loan)
  },
  getLoansByUserId (UserId) {
    return Api().get(`loan/getLoansByUserId/${UserId}`)
  }
}
