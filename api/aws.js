const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const localConfigPath = path.join(__dirname, 'awsconfig.json');
if (fs.existsSync(localConfigPath)) {
  AWS.config.loadFromPath(localConfigPath);
}

module.exports = {
  s3: function(params) {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: params
    });
  }
};