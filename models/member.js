const { TurnedIn } = require('@material-ui/icons');
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        memNo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,

        },
        isAdmin: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
          },
        password: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        cellPhone: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        isMemberType: {
            type: Sequelize.STRING(200),
            allowNull: true,
          },
        is: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      }, {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
      db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
  };