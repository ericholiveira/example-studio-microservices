var Studio = require('studio');
var express = require('express');
var app = express();

var searchForContent = Studio.module('Reddit')('searchForContent');

app.get('/favicon.ico', function (req, res) {
	res.send('');
});
app.get('/:path', function (req, res) {
  searchForContent(req.params.path).then((result)=>{
  	res.send(result);
  }).catch((error)=>{
  	console.log(error);
  	res.send(error);
  });
});

app.listen(3000,function(err){
	console.log('Server listening at http://localhost:3000');
});