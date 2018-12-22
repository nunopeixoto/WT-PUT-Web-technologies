const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const LibraryController = require('./controllers/LibraryController')


module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.get('/getAllUsers',
  AuthenticationController.getAllUsers)

  app.post('/login',
    AuthenticationController.login)
  app.get('/confirmation/:token', 
    AuthenticationController.validate)

  app.post('/library',
    LibraryController.create)
  app.get('/getAll',
    LibraryController.getAll)
    
}
