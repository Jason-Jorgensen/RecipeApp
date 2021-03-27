module.exports = function(sequelize, DataTypes) {
    const Favorite = sequelize.define("Favorite", {
      // The email cannot be null, and must be a proper email before creation
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // The password cannot be null
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },

    });
    return Favorite
}