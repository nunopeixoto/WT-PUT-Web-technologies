import Api from '@/services/Api'

export default {
  createBook (book) {
    return Api().post('books/newbook', book)
  }
}
