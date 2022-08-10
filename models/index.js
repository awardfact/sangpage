const Sequelize = require('sequelize');


const Member = require('./member');
const Board = require('./board');
const Memo = require('./memo');

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.user, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.Member = Member;
db.Board = Board;
db.Memo = Memo;

Member.init(sequelize);
Board.init(sequelize);
Memo.init(sequelize);

Member.associate(db);
Board.associate(db);
Memo.associate(db);


module.exports = db;