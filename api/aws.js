const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

module.exports = {
  s3: function(params) {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: params
    });
  }
};