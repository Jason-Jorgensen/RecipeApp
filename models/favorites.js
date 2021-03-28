const { Sequelize } = require("./index.js");
const user = require("./user.js");

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
    

    Favorite.associate = (models) => {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Favorite.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          model:user,
          key:"id",
        },
      });
    };

    // key: {
    //   type: Sequelize.INTEGER,
    //   refrences: {
    //     model:user,
    //     key:"id",
    //   }
    // },
    return Favorite
}