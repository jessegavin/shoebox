const aws = require('./aws');
const s3 = aws.s3({});

const get = require('lodash/get');
const assign = require('lodash/assign');
const trim = require('lodash/trim');
const trimEnd = require('lodash/trimEnd');
const last = require('lodash/last');

const listObjects = (path) => {
  
  path = path || '';

  if (path.length > 0) {
    path = path === '/' ? '' : trim(path, '/') + '/';
  }

  var options = { Bucket: process.env.S3_BUCKET_NAME, Delimiter: '/', Prefix: path };

  console.log(options);

  return new Promise((resolve, reject) => {

    s3.listObjects(options, (err, data) => {

      if (err) {
        return reject(err);
      }

      var files = get(data, 'Contents', [])
        .map(x => {
          return assign({ 
            Prefix: options.Prefix,
            Filename: last(x.Key.split('/'))
          }, x);
        })
        .filter(x => x.Prefix !== x.Key);

      var folders = get(data, 'CommonPrefixes', []).map(function(commonPrefix) {
        let prefix = decodeURIComponent(commonPrefix.Prefix);
        return {
          Prefix: prefix,
          Name: last(trimEnd(prefix, '/').split('/'))
        }
      });

      resolve({
        folders: folders,
        files: files
      });

    });
  });
}

const upload = options => {

  var settings = assign({
    ACL: 'public-read'
  }, options);

  s3.upload(settings, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    return data;
  });
}

module.exports = {
  listObjects,
  upload
};