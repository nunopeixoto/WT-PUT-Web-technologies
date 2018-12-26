module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      title: {
        type: DataTypes.STRING,
      },
      subtitle: {
        type: DataTypes.STRING,
      },
      publishDate: {
        type: DataTypes.DATE,
      },
      nrPages: {
        type: DataTypes.INTEGER
      },
      authors: {
        type: DataTypes.STRING
      },
      publisher: {
        type: DataTypes.STRING
      },
      language: {
        type: DataTypes.STRING
      },
      thumbnailUrl: {
        type: DataTypes.STRING
      }
    })
  
    return Book
  }