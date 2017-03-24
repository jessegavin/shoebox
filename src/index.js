require('./config').load()

const trimEnd = require('lodash.trimend')
const express = require('express')
const multer = require('multer')
const api = require('./api')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var apiRouter = express.Router()

// List Objects
apiRouter.get('*', (req, res, next) => {

  console.log('path', req.path)
  
  api.listObjects(req.path)
    .then(objects => ({
      path: req.path,
      uploadPath: `/api${req.path}`,
      folders: objects.folders.map(f => {
        return {
          name: f.Name,
          path: `/${trimEnd(f.Prefix, '/')}`
        }
      }),
      files: objects.files.map(f => f)
    }))
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(500).send(err)
    })

});

// Upload objects
apiRouter.post('*', upload.single('file'), (req, res) => {
  res.send(req.path)
})

module.exports = apiRouter