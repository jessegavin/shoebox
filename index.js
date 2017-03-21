var express = require('express')
var app = express()

var api = require('./api');

app.get('/favicon.ico', function (req, res) {
  res.send('ok');
});

app.get('*', function (req, res) {
  api.listObjects(req.path.substr(1))
    .then(objects => res.json(objects))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});