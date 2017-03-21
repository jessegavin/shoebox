var express = require('express')
var app = express()

var api = require('./api');

app.get('/favicon.ico', function (req, res) {
  res.send('ok');
});

app.get(['/:bucket', '/:bucket/*'], function (req, res) {
  
  let bucket = req.params.bucket;
  let path = req.path.substr(req.params.bucket.length + 2);

  api.listObjects(bucket, path)
    .then(objects => res.json(objects))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});