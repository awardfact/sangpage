const { TurnedIn } = require('@material-ui/icons');
const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        boardNo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
            unique : true,
            autoIncrement : true,
            primaryKey: true,
        },
        boardName : {
          type: Sequelize.STRING(50),
          allowNull : true,

        },
        boaardTitle: {
          type: Sequelize.STRING(300),
          allowNull: true,

        },
        boardContent: {
           type: Sequelize.TEXT,
            allowNull: true,
          },
        uploadFile: {
            type: Sequelize.STRING(300),
          allowNull: true,
        },
        isNoMember: {
          type: Sequelize.INTEGER ,
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
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,

        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
  
          },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Board',
        tableName: 'board',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
        db.Board.belongsTo(db.Member, { foreignKey: 'memNo', targetKey: 'memNo'  , onDelete : 'CASCADE'  });
        db.Board.hasMany(db.Memo, { foreignKey: 'boardNo', targetKey: 'boardNo'   , onDelete : 'CASCADE'  });
    }
  };