const AWS = require('aws-sdk')
const get = require('lodash.get')
const last = require('lodash.last')
const trim = require('lodash.trim')
const assign = require('lodash.assign')
const trimEnd = require('lodash.trimend')


const s3 =  new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: process.env.S3_BUCKET_NAME }
})


const normalizePath = (path) => {
  path = path || ''

  if (path.length > 0) {
    path = path === '/' ? '' : trim(path, '/') + '/'
  }
  return path;
}


const listObjects = function (path) {
  
  var options = { Delimiter: '/', Prefix: normalizePath(path) }

  return new Promise( function (resolve, reject) {

    s3.listObjects(options, function (err, data) {

      if (err) {
        return reject(err)
      }

      var files = get(data, 'Contents', [])
        .map(x => {
          return assign({ 
            Prefix: options.Prefix,
            Filename: last(x.Key.split('/')),
            PublicUrl: `https://s3.amazonaws.com/${process.env.S3_BUCKET_NAME}/${x.Key}`
          }, x)
        })
        .filter(x => x.Prefix !== x.Key)

      var folders = get(data, 'CommonPrefixes', [])
        .map(function(commonPrefix) {
          let prefix = decodeURIComponent(commonPrefix.Prefix);
          return {
            Prefix: prefix,
            Name: last(trimEnd(prefix, '/').split('/'))
          }
        })

      resolve({
        folders: folders,
        files: files
      })

    })
  })
}


const upload = options => {

  var settings = assign({
    ACL: 'public-read'
  }, options)

  return new Promise((resolve, reject) => {
    s3.upload(settings, function(err, data) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

module.exports = {
  listObjects,
  upload
}