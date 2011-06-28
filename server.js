var express = require('express')
  , app = express.createServer();

app.use(express.bodyParser());

var chatBuffer = [];
var nameBuffer = [];
var styleBuffer = ['style1', 'style2', 'style3'];
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

  for (var i in chatBuffer) {
    nameIndex = nameMemBuffer.indexOf(nameBuffer[i]);
    if ((nameIndex == -1) || (nameIndex >= styleBuffer.length))  {
      stylin = "none";
    } else {
      stylin = styleBuffer[nameMemBuffer.indexOf(nameBuffer[i])];
    }
    output += "<span class='" + stylin + "'>" + stylin + nameBuffer[i] + "</span>:" + chatBuffer[i] + '<br>';
  }
  res.send(
    '<form action="/" method="post">'+
    '<input type="text" name="chat[name]"><br>'+
    '<input type="text" name="chat[content]"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>' + output
  );  
}); 

app.listen(8000);