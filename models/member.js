const { TurnedIn } = require('@material-ui/icons');
const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        memNo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
            autoIncrement : true,
            primaryKey: true,
        },
        memId : {
          type: Sequelize.STRING(50),
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
          type: Sequelize.ENUM('page', 'kakao'),
            allowNull: true,
          },
        gender: {
          type: Sequelize.ENUM('male', 'female'),
            allowNull: true,
        },
        birthday: {
          type: Sequelize.STRING(30),
          allowNull: false,
   
        },
        grade: {
          type: Sequelize.ENUM('준회원', '정회원' , '운영자'),
          allowNull: false,
   
        },
        isDelete: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,

        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Member',
        tableName: 'member',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
      db.Member.hasMany(db.Board, { foreignKey: 'memNo', targetKey: 'memNo'  , onDelete : 'CASCADE'   });
    }
  };