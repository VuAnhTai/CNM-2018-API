var eventEmitter = require('eventemitter3');
var emitter = new eventEmitter();

var subscribeEvent = (req, res, event) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var heartBeat = setInterval(() => {
        res.write('\n');
    }, 15000);

    var handler = data => {
        var json = JSON.stringify(data);
        res.write(`retry: 500\n`);
        res.write(`event: ${event}\n`);
        res.write(`data: ${json}\n`);
        res.write(`\n`);
    };

    emitter.on(event, handler);

    req.on('close', () => {
        clearInterval(heartBeat);
        emitter.removeListener(event, handler);
    });
};

//
// event pub-sub

var REQUEST_ADDED = 'REQUEST_ADDED';
var REQUEST_UPDATED = 'REQUEST_UPDATED';
var REQUEST_DRIVER = 'REQUEST_DRIVER';

var subscribeAddedRequest = (req, res) => {
    subscribeEvent(req, res, REQUEST_ADDED);
};
var subscribeUpdatedRequest = (req, res) => {
    subscribeEvent(req, res, REQUEST_UPDATED);
};
var subscribeRequestDriver = (req, res) => {
    subscribeEvent(req, res, REQUEST_DRIVER);
};
var publishRequestAdded = requestObj => {
    emitter.emit(REQUEST_ADDED, requestObj);
};
var publishRequestUpdated = requestObj => {
    emitter.emit(REQUEST_UPDATED, requestObj);
};
var publishRequestDriver = requestObj => {
    emitter.emit(REQUEST_DRIVER, requestObj);
};

module.exports = {
    subscribeAddedRequest,
    subscribeUpdatedRequest,
    subscribeRequestDriver,
    publishRequestAdded,
    publishRequestUpdated,
    publishRequestDriver
}