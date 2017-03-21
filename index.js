var express = require('express')
var app = express()

var api = require('./api');

app.get('/favicon.ico', function (req, res) {
  res.send('ok');
});

app.get(['/:bucket', '/:bucket/*'], function (req, res) {

  let bucketLength = req.params.bucket.length + 2;
  console.log(bucketLength);
  let path = req.path.substr(bucketLength);
  console.log(path);

  api.listObjects(req.params.bucket, path)
    .then(objects => res.json(objects))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});