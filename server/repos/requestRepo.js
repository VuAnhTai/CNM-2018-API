var db = require('../fn/mysql-db');

exports.loadAll = () => {
    var sql = 'select * from requests';
    return db.load(sql);
}