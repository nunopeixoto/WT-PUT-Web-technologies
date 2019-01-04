module.exports = (sequelize, DataTypes) => {
    const ExternalUser = sequelize.define('ExternalUser', {
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      }
    })
  
    return ExternalUser
  }