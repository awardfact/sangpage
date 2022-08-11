const { TurnedIn } = require('@material-ui/icons');
const Sequelize = require('sequelize');

module.exports = class Test extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        sno : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
            autoIncrement : true,
            primaryKey: true,
        },
        ip : {
          type: Sequelize.STRING(50),
          allowNull : true,
          unique : true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
          },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,

        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
  
          },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Test',
        tableName: 'test',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
    }
  };