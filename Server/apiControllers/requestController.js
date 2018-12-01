var express = require('express');

var router = express.Router();
var requestRepo = require('../repos/requestRepo');
var events = require('../events');
//
// load orders by User

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

module.exports = router;