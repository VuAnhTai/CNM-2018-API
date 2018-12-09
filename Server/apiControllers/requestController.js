var express = require('express');

var router = express.Router();
var requestRepo = require('../repos/requestRepo');
var events = require('../events');
//
// load orders by User
const LACATED = 0;
const UNLOCATED = -1;
const MOVING = 1;
const COMPLETED = 2;

router.get('/getAll', (req, res) => {

    requestRepo.loadAll()
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
});

router.post('/updateLocation', (req, res) => {
	params = req.body;
    requestRepo.updateLocation(params)
        .then(rows => {
			res.json(rows);
            events.publishRequestUpdated(rows);
        }).catch(err => {
	        console.log(err);
	        res.statusCode = 500;
	        res.end('View error log on console');
    	})
});

router.post('/updateStatus', (req, res) => {
    params = req.body;
    requestRepo.updateStatus(params.id, params.status)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
	        console.log(err);
	        res.statusCode = 500;
	        res.end('View error log on console');
    	})
});

router.post('/requestDriver', (req, res) => {
    requestRepo.getRequestMinTime()
    .then(rows => {
        if(rows[0].id !== null) {
            events.publishRequestDriver(rows);
            requestRepo.updateStatus(rows[0].id, MOVING);
            res.json(rows);
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

router.post('/updateLocationDriver', (req, res) => {
    var params = req.body;
    requestRepo.updateLocationDriver(params).
    then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})
module.exports = router;