const Sequelize = require('sequelize');

module.exports = class Exchange extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        sno : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
            autoIncrement : true,
            primaryKey: true,
        },
        curUnit : {
          type: Sequelize.STRING(50),
          allowNull : true,
        },
        curNm : {
            type: Sequelize.STRING(50),
            allowNull : true,
        },
        ttb : {
            type: Sequelize.STRING(50),
            allowNull : true,
        },
        tts : {
            type: Sequelize.STRING(50),
            allowNull : true,
        },
        dealBars : {
            type: Sequelize.STRING(50),
            allowNull : true,
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
        modelName: 'Exchange',
        tableName: 'exchange',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
    }
  };