const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const LibraryController = require('./controllers/LibraryController')
const LibraryInvitationsController = require('./controllers/LibraryInvitationsController')
const BookController = require('./controllers/BookController')
const PersonalReadingController = require('./controllers/PersonalReadingController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/enhancedregister',
    AuthenticationControllerPolicy.register,
    AuthenticationController.enhancedregister)
  app.get('/getAllUsers',
  AuthenticationController.getAllUsers)

  app.post('/login',
    AuthenticationController.login)
  app.get('/confirmation/:token', 
    AuthenticationController.validate)

  app.post('/library',
    LibraryController.create)
  app.get('/library/getAll',
    LibraryController.getAll)
  app.post('/library/invite',
    LibraryController.invite)
  app.get('/library/invite/:email/:libraryId', 
    LibraryController.userAcepted)
  

  app.get('/getAllLibraryInvitations',
  LibraryInvitationsController.getAllLibraryInvitations)

  app.get('/books/getAllBooks',
  BookController.getAllBooks)
  app.post('/books/newbook',
  BookController.newBook)

  app.get('/personalReading/getAllPersonalReading',
  PersonalReadingController.getAllPersonalReading)
  app.post('/personalReading/newPersonalReading',
  PersonalReadingController.newPersonalReading)
  
}
