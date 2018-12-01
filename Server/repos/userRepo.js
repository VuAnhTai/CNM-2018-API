var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.add = userEntity => {
    var md5_pwd = md5(userEntity.password);
    var sql = `insert into users(name, password, permission) values('${userEntity.username}', '${md5_pwd}', ${userEntity.permission})`;
    return db.save(sql);
}
exports.addRequest = userEntity => {
    var sql = `insert into request(username, phone, address, note, status) values('${userEntity.name}', '${userEntity.phone}', '${userEntity.address}', '${userEntity.note}','${userEntity.status}')`;
    return db.save(sql);
}
exports.login = loginEntity => {
    var md5_pwd = md5(loginEntity.password);
    var userName = loginEntity.userName;
    var sql = `select * from users where name = '${userName}' and password = '${md5_pwd}'`;
    return db.load(sql);
};
exports.checkUserName=userName=>{
    var sql = `select * from users where name = '${userName}'`;
    return db.load(sql);
}
exports.getUserInfo=userId=>{
    var sql = `select * from users where ID = '${userId}'`;
    return db.load(sql);
}







