const { TurnedIn } = require('@material-ui/icons');
const Sequelize = require('sequelize');

module.exports = class Memo extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        memoNo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
            autoIncrement : true,
            primaryKey: true,
        },
        boardNo : {
          type: Sequelize.INTEGER,
          allowNull : true,

        },
        content: {
          type: Sequelize.STRING(300),
          allowNull: false,

        },
        isNoMember: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        writerNm: {
        type: Sequelize.STRING(100),
        allowNull: true,
        },
        password: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        memNo: {
          type: Sequelize.INTEGER ,
          allowNull: true,
        },
        parentMemoNo: {
            type: Sequelize.INTEGER ,
          allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
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
        modelName: 'Memo',
        tableName: 'memo',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
        db.Memo.belongsTo(db.Board, { foreignKey: 'boardNo', targetKey: 'boardNo' , onDelete : 'CASCADE' });
    }
  };