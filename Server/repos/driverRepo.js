var db = require('../fn/mysql-db');

exports.loadAll = () => {
    var sql = 'select * from drivers';
    return db.load(sql);
}

exports.updateStatus = ($request) => {
    var sql = `UPDATE drivers 
        SET status = '${request.status}'
        WHERE id = '${request.id}'`;
    return db.load(sql);
}


