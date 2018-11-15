const {sequelize} = require('./db');
const {Sequelize} = require('./db');
const Users = sequelize.define('Users', {
    id: {primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true},
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
});

module.exports = Users;