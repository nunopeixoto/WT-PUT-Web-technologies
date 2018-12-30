const {
    sequelize,
    User,
    Library,
    Book,
    PersonalReading,
    LibraryInvitations,
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const librarys = require('./librarys.json')
const books = require ('./books.json')
const personalreadings = require ('./personalreadings.json')
const libraryinvitations = require('./libraryinvitations.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
        librarys.map(library => {
        Library.create(library)
      })
    )

    await Promise.all(
      books.map(book => {
      Book.create(book)
    })
  )

  await Promise.all(
    personalreadings.map(personalreading => {
    PersonalReading.create(personalreading)
  })
)

    await Promise.all(
      libraryinvitations.map(libraryinvitation => {
        LibraryInvitations.create(libraryinvitation)
    })
  )
  })