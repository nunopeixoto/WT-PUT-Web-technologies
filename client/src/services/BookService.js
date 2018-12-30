import Api from '@/services/Api'

export default {
  createBook (book) {
    return Api().post('books/newbook', book)
  },
  findBook (search) {
    return Api().get(`books/search/${search}`)
  },
  search (search) {
    return Api().get('/books/getBooks', {
      params: {
        search: search
      }
    })
  },
  getBookById (id) {
    return Api().get(`books/getBook/${id}`)
  }
}
