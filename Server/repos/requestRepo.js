var db = require('../fn/mysql-db');

const LACATED = 0;
const UNLOCATED = -1;
const MOVING = 1;
const COMPLETED = 2;
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
                WHERE status = '${LACATED}'`;
    return db.save(sql);
}

exports.updateLocationDriver = (request) => {
    var sql = `UPDATE request 
    	SET lat = '${request.lat}', driver = '${request.driver}', driver_lng = '${request.lng}', status = '${MOVING}'
        WHERE id = '${request.id}'`;
        console.log(request);
    return db.save(sql);
}

exports.updateStatus = (id, status) => {
    var sql = `UPDATE request 
        SET status = '${status}'
        WHERE id = '${id}'`;
        console.log(sql);
    return db.save(sql);
}