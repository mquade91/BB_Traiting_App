module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      displayname: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {});

  user.associate = function(models) {
    user.hasMany(models.message, { as: 'messages', foreignKey: 'authorId' });
    user.hasMany(models.interest, { as: 'interest', foreignKey: 'userId' });
  };

  return user;
};