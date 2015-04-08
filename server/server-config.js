var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '../../app'));

app.get('/', function(req, res){
  res.redirect('index.html');
});

// app.post('/api/search', function(res, req){
//   // console.log(req.body);
//   res.redirect('index.html');
// });

module.exports = app;
