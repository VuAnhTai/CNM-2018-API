const {sequelize} = require('./db');
const {Sequelize} = require('./db');
const Drivers = sequelize.define('Drivers', {
    id: {primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true},
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    created_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE
}, {
    timestamps: false,
    tableName: "drivers"
});

module.exports = Drivers;