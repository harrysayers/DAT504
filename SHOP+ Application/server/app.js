var express = require('express');
var userService = require('./services/userService');
var body = require('body-parser');
var path = require('path');
var app = express();

app.use(body.json())
app.use(body.urlencoded({ extended : false }))

app.post('/api/signup', function(){
  let userObj = new userService(req, res)
  userObj.adduser()
})

app.listen(3000, function(){
  console.log('listening...')
});
