var express = require('express');

var router = express.Router();
var userRepo = require('../repos/userRepo'),
    moment = require('moment');
var authRepo = require('../repos/authRepo');
var events = require('../events');
//
// load orders by User

router.post('/regist',(req,res)=>{
    var entity={
        username:req.body.userName,
        password:req.body.password,
        permission:2
    };

    userRepo.checkUserName(entity.username).then(rows=>{
        if (rows.length===0){
            userRepo.add(entity).then(rows=>{
                res.json({
                    note:"done"
                })
            }).catch(err=>{
                console.log(err)
            })
        }else {
            res.json({
                note:"da ton tai"
            })
        }
    })


});



module.exports = router;