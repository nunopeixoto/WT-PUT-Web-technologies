module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    iduser: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })
  
  // Library.associate = function(models){
  //   Library.belongsTo(models.User)
  // }

  return Library
}