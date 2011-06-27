var formidable = require('formidable'),
    http = require('http'),

    sys = require('sys');

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
/*  res.write(
    '<form action="" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  res.end();*/
}).listen(1337);