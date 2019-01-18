const {LibraryInvitations} = require('../models')


module.exports = {
  async getAllLibraryInvitations(req, res) {
    try {
      const libraryInvitations = await LibraryInvitations.findAll()
      res.send(libraryInvitations)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing library invitations'
      })
    }
  },
  async getAllLibraryInvitationsByLibraryId (req, res) {
    try {
      const libraryInvitations = await LibraryInvitations.findAll({
        where: {
          LibraryId: req.params.LibraryId
        }
      })
      res.send(libraryInvitations)
    } catch (err) {
      res.status(400).send({
        error: 'Error listing library invitations'
      })
    }
  },
  async removeUserFromLibrary (req, res) {
    try {
      await LibraryInvitations.destroy({
        where: {
          LibraryId: req.params.LibraryId,
          UserId: req.params.UserId
        }
      })
      res.send({
        message: 'User deleted from library.'
      })
    } catch (err) {
      res.status(400).send({
        error: 'Error listing library invitations'
      })
    }
  }
}
