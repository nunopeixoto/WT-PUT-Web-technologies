module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })
  
  Library.associate = function (models) {
    Library.belongsTo(models.User)
  }

  return Library
}