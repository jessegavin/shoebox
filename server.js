const express = require('express');
const app = express();

app.use('/api', require('./src/index'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});