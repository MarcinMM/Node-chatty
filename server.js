var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.use(express.bodyParser());

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
});

var styleBuffer = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6', 'style7', 'style8'];
var nameMemBuffer = [];

io.sockets.on('connection', function (socket) {
  socket.on('chatSending', function (data) {

    if ((data.name.length > 0) && (data.content.length > 0)) {
      var chatName = data.name.replace('<','&lt;').replace('>','&gt;');
      var chatContent = data.content.replace('<','&lt;').replace('>','&gt;');
      // stylin'
      if (nameMemBuffer.indexOf(chatName) == -1) {
        nameMemBuffer.push(chatName);
      }

      // pick style from style array
      nameIndex = nameMemBuffer.indexOf(chatName); 
      if (nameIndex >= styleBuffer.length)  {
        stylin = "none";
      } else {
        stylin = styleBuffer[nameMemBuffer.indexOf(chatName)];
      }

      var timeStamp = new Date();

      socket.broadcast.emit('chatReceived', { name: chatName, content: chatContent, stylin: stylin, time: timeStamp.toTimeString()});
      socket.emit('chatReceived', { name: chatName, content: chatContent, stylin: stylin, time: timeStamp.toTimeString()});
    }
  });
});

app.all('/', function(req, res) {

  res.render('index.jade'
  );

}); 

app.listen(8000);