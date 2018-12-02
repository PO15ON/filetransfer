var express = require('express');
const fileUpload = require('express-fileupload');
const http = require('http');
var fs = require('fs');


var app = express();
app.use(fileUpload());

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  else{
    console.log(req.files.upload); //uploaded file object ( .upload de el hya name= <input type="file" name="upload" multiple>)
    req.files.upload.mv("folder/"+req.files.upload.name, function(err) {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
    });

  }

  // DOWNLOAD BY : GET http://localhost:3000/download?file=filename
  app.get('/download', function(req, res) {
    var filename = req.param('file');
    var file = "folder/"+filename;
    if (!fs.existsSync(file)) {
      res.status(404).send('Requested file not found!');
    }
    else {
      res.download(file);
    }
  });


});


app.listen(3001);
console.log('Node server running on port 3001');
