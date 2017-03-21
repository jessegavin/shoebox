const aws = require('./aws');
let bucketName = process.env.BUCKET_NAME;
if (!bucketName) {
  throw new Error('BUCKET_NAME environment variable not set');
}
const s3 = aws.s3({ Bucket: bucketName });

const get = require('lodash/get');
const assign = require('lodash/assign');
const trimEnd = require('lodash/trimEnd');

const listObjects = path => {
  var options = { Delimiter: '/', Prefix: `${trimEnd(path,'/')}/` };

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

module.exports = {
  listObjects
};