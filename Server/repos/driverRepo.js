var db = require('../fn/mysql-db');

exports.loadAll = () => {
    var sql = 'select * from drivers';
    return db.load(sql);
}
exports.loadDriver = ($id) => {
    var sql = `select * from drivers where id = '${id}'`;
    return db.load(sql);
}

exports.updateStatus = (id, status) => {
    var sql = `UPDATE driver 
        SET status = '${status}'
        WHERE id = '${id}'`;
        console.log(sql);
    return db.save(sql);
}

exports.updateLocation = (request) => {
    var sql = `UPDATE drivers 
    	SET lat = '${request.lat}', lng = '${request.lng}'
        WHERE id = '${request.id}'`;
    return db.save(sql);
}

