var db = require('../fn/mysql-db');

exports.loadAll = () => {
    var sql = 'select * from request';
    return db.load(sql);
}

exports.updateLocation = (request) => {
    var sql = `UPDATE request 
    	SET user_lat = '${request.lat}', user_lng = '${request.lng}', status = '${request.status}'
    	WHERE id = '${request.id}'`;
    return db.save(sql);
}