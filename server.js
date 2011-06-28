var express = require('express')
  , app = express.createServer();

app.use(express.bodyParser());

var buffer = [];

app.post('/', function(req, res, next) {
  console.log(req.body.chat);
  buffer.push(req.body.chat.content);
  next();
});

app.all('/', function(req, res) {
  var output;
  for (var i in buffer) {
    output += buffer[i] + '<br>';
  }
  res.send(
    '<form action="/" method="post">'+
    '<input type="text" name="chat[content]"><br>'+
    '<input type="text" name="chat[name]"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>' + output
  );  
}); 
/*
app.get('/', function(req, res) {
  res.send(
    '<form action="/post" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="textcontent"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  //res.send('Hello World');
});*/

app.listen(3030);
/*

http.createServer(function(req, res) {
  if (req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('received upload:\n\n');
      res.write(sys.inspect({fields: fields, files: files}));
      res.write(
        '<form action="" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
      );
      res.end();
    });
  }

  //res.writeHead(200, {'content-type': 'text/html'});
  res.write(
    '<form action="" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  res.end();
}).listen(1337);*/