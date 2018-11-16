const Sequelize = require('sequelize');
const CONFIG = require('../config/config.json')
const sequelize = new Sequelize(CONFIG.DB.database, CONFIG.DB.username, CONFIG.DB.password,{
  host: CONFIG.DB.host,
  dialect: CONFIG.DB.dialect
});

const sequelizeStream = require('sequelize-stream');
const stream = sequelizeStream(sequelize);
module.exports = {Sequelize, sequelize, stream};