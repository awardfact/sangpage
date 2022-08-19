const Sequelize = require('sequelize');


const Member = require('./member');
const Board = require('./board');
const Memo = require('./memo');
const Exchange = require('./exchange');

const Test = require('./test');

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.user, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.Member = Member;
db.Board = Board;
db.Memo = Memo;
db.Exchange = Exchange;


Member.init(sequelize);
Board.init(sequelize);
Memo.init(sequelize);
Exchange.init(sequelize);


Member.associate(db);
Board.associate(db);
Memo.associate(db);
Exchange.associate(db);


db.Test = Test;
Test.init(sequelize);

module.exports = db;