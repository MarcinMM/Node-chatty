var express = require('express')
  , app = express.createServer();

app.use(express.bodyParser());

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
});

var chatBuffer = [];
var nameBuffer = [];
var styleBuffer = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6', 'style7', 'style8'];
var nameMemBuffer = [];


app.post('/', function(req, res, next) {
  if ((req.body.chat.name.length > 0) && (req.body.chat.content.length > 0)) {
    var name = req.body.chat.name.replace('<','&lt;').replace('>','&gt;');
    nameBuffer.push(name);
    chatBuffer.push(req.body.chat.content.replace('<','&lt;').replace('>','&gt;'));
    // stylin'
    if (nameMemBuffer.indexOf(name) == -1) {
      nameMemBuffer.push(name);
    }
  }
  next();
});

app.all('/', function(req, res) {
  var output = "";
  var stylin = "";
  var nameIndex = "";
  var chatlines = [];

  for (var i in chatBuffer) {
    nameIndex = nameMemBuffer.indexOf(nameBuffer[i]); 
    if ((nameIndex == -1) || (nameIndex >= styleBuffer.length))  {
      stylin = "none";
    } else {
      stylin = styleBuffer[nameMemBuffer.indexOf(nameBuffer[i])];
    }
    output = { "stylin": stylin, "message": chatBuffer[i], "name": nameBuffer[i] };
    chatlines.push(output);
  }

  res.render('index.jade', 
    { locals: 
      { output: output,
        chatlines: chatlines
      }
    }
  );

}); 

app.listen(8000);