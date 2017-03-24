# Shoebox

This is a simple project which allows you to mount a route in your express app which will let you 'browse' through an S3 bucket and upload stuff too..

## How to use

```
const shoebox = require('./src/index');
const express = require('express');
const app = express();

app.use('/api', shoebox);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
```

Now you can browse to http://localhost:3000/api and you'll get a JSON response

    {
      "path": "/",
      "uploadPath": "/api/",
      "folders": [
        {
          "name": "folder-name",
          "path": "/folder-name"
        }
      ],
      "files": [
        {
          "Prefix": "",
          "Filename": "my-photo.jpg",
          "PublicUrl": "https://s3.amazonaws.com/my-bucket/my-photo.jpg",
          "Key": "my-photo.jpg",
          "LastModified": "2017-03-21T03:15:27.000Z",
          "ETag": "\"0f3660d7ee1e4a3b0dbc1a7acd3d9081\"",
          "Size": 123432,
          "StorageClass": "STANDARD",
          "Owner": {
            "DisplayName": "ownername",
            "ID": "fa230164bf7e34a046076687310870a4ea4714e675b673d3e8f0673eae70243d"
          }
        }
      ]
    }