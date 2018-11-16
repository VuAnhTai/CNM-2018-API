const {sequelize} = require('./db');
const {Sequelize} = require('./db');
const Request = sequelize.define('Request', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: Sequelize.STRING,
    driver: Sequelize.STRING,
    phone: Sequelize.STRING,
    lat: Sequelize.STRING,
    driver_lng: Sequelize.STRING,
    user_lat: Sequelize.STRING,
    user_lng: Sequelize.STRING,
    status: Sequelize.INTEGER,
    note: Sequelize.STRING,
    time: Sequelize.DATE
},{
    timestamps: false,
    tableName: "request"
});

module.exports = Request;