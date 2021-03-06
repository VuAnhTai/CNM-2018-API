// import library
const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({extended: false});
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const {stream} = require('./model/db');

// import my function
const Request = require('./model/request');
const middle = require('./model/middleware');

// set default
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

// route
app.get('/', (req, res) => res.render('home'));
server.listen(5000, () => console.log('Server has been started port 5000!'));

app.post('/signin' , parser , (req , res) => {
  const {username , password} = req.body;
  middle.signIn(username , password)
  .then(token => {
      res.cookie('token' , token);
      res.send({message: "OK"});
  })
  .catch(err => res.send({error: err.message}));
});
app.get('/add-request', parser, async(req, res)=>{
  // Request.create
  let {username, driver, phone, lat, driver_lng, user_lat, user_lng} = req.query;
  Request.create({
    username: username,
    driver: driver,
    phone: phone,
    lat: lat,
    driver_lng: driver_lng,
    user_lat: user_lat,
    user_lng: user_lng
  })
  res.send({message: "SUCCESS"});
});
app.get('/renewtoken', middle.isLogin , (req , res) => {
  res.send({message: "SUCCESS"});
});

// socket io
io.on('connection' , async (socket) => { 
  var rows = await Request.findAll();
  socket.emit('SEND_LIST_USERS' , rows);
  
  stream.on('data', async () =>{
    var rows = await Request.findAll();
    socket.emit('CHANGE_IN_DB' , rows);
  });
});