var express = require('express');

var router = express.Router();
var requestRepo = require('../repos/requestRepo');
var driverRepo = require('../repos/driverRepo');
var events = require('../events');

router.get('/get-driver', (req, res) => {
    id = req.headers['id'];
    driverRepo.loadDriver(id)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
});

router.post('/update-location', (req, res) => {
    params = req.body;
    driverRepo.updateLocation(params)
        .then(rows => {
			res.json(rows);
            // events.publishRequestUpdated(rows);
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

module.exports = router;