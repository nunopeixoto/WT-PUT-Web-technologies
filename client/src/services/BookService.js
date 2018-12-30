import Api from '@/services/Api'

export default {
  createBook (book) {
    return Api().post('books/newbook', book)
  },
  findBook (search) {
    return Api().get(`books/search/${search}`)
  },
  search (bookName) {
    return Api().get('/books/getBooks', {
      params: {
        search: bookName
      }
    })
  },
  searchApi (bookName) {
    return Api().get(`/books/search/${bookName}`)
  },
  getBookById (id) {
    return Api().get(`books/getBook/${id}`)
  }

}
