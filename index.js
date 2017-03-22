require('dotenv').load();

const express = require('express');
const app = express();
const api = require('./api');
const path = require('path');
const trimEnd = require('lodash/trimEnd');

const multer  = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.set('view engine', 'ejs');

app.get('/favicon.ico', function (req, res) {
  res.send('ok');
});

app.get('/api/*', function (req, res) {
});

app.post('/api/*', upload.single('file'), function (req, res) {
  console.log(req.file);
});



app.get('*', function (req, res) {


  let nav = trimEnd(req.path, '/').split('/').reduce((result, item, index) => {
    let entry = {
      name: index === 0 ? '🗃️' : item,
      path: index === 0 ? '/' : result[index-1].path + ( index > 1 ? '/' : '') + item
    }
    result.push(entry);
    return result;
  },[]);
  
  console.log('PATH: '+ req.path);

  api.listObjects(req.path)
    .then(objects => {
      res.render('index', {
        path: req.path,
        nav: nav,
        uploadPath: `/api${req.path}`,
        folders: objects.folders.map(f => {
          return {
            name: f.Name,
            path: `/${trimEnd(f.Prefix, '/')}`
          }
        }),
        files: objects.files.map(f => f)
      });
    })
    .catch(err => res.status(500).send(err));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});