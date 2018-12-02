var db = require('../fn/mysql-db');

const HAVECAR = 2;
const LACATED = 1;
const UNLOCATED = 0;
const MOVING = 3;
const COMPLETED = 4;
exports.loadAll = () => {
    var sql = `select * from request where status = '${UNLOCATED}' OR status = '${LACATED}'`;
    return db.load(sql);
}

exports.updateLocation = (request) => {
    var sql = `UPDATE request 
    	SET user_lat = '${request.lat}', user_lng = '${request.lng}', status = '${LACATED}'
    	WHERE id = '${request.id}'`;
    return db.save(sql);
}

exports.getRequestMinTime = () => {
    var sql = `SELECT min(time), username, id, phone, note, status, address, user_lat, user_lng
                FROM request
                WHERE status = 1`;
    return db.save(sql);
}

exports.updateLocationDriver = (request) => {
    var sql = `UPDATE request 
    	SET lat = '${request.lat}', driver_lng = '${request.lng}', status = '${MOVING}'
    	WHERE id = '${request.id}'`;
    return db.save(sql);
}

exports.updateStatus = (id, status) => {
    var sql = `UPDATE request 
        SET status = '${status}'
        WHERE id = '${id}'`;
        console.log(sql);
    return db.save(sql);
}