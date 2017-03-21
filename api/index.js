const aws = require('./aws');
const s3 = aws.s3({});

const get = require('lodash/get');
const assign = require('lodash/assign');
const trimEnd = require('lodash/trimEnd');

const listObjects = (bucket, path) => {
  
  path = path || '';

  if (path.length > 0) {
    path = path === '/' ? '' : trimEnd(path, '/') + '/';
  }

  var options = { Bucket: bucket, Delimiter: '/', Prefix: path };

  console.log(options);
  return new Promise((resolve, reject) => {

    s3.listObjects(options, (err, data) => {

      if (err) {
        return reject(err);
      }

      var files = get(data, 'Contents', [])
        .map(x => {
          return assign({ Prefix: options.Prefix }, x);
        })
        .filter(x => x.Prefix !== x.Key);

      var folders = get(data, 'CommonPrefixes', []).map(function(commonPrefix) {
        return decodeURIComponent(commonPrefix.Prefix);
      });

      resolve({
        folders: folders,
        files: files
      });

    });
  });
}

const putObject = options => {
  var files = document.getElementById('photoupload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
  var fileName = file.name;
  var albumPhotosKey = encodeURIComponent(albumName) + '//';

  var photoKey = albumPhotosKey + fileName;
  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    alert('Successfully uploaded photo.');
    viewAlbum(albumName);
  });
}

module.exports = {
  listObjects
};