$(document).ready(function() {

  var notifyPermission = false;

  var socket = io.connect(window.location.hostname);
  socket.on('chatReceived', function (data) {
    addRow(data);
    removeRow();
  });


  $('#chatForm').bind('submit', function (e) {
  	e.preventDefault();
  	socket.emit('chatSending', { name: $('#name').val(), content: $('#content').val() });
  	$('#content').val('').focus();
  });

  var addRow = function(data) {
  	var newLI = document.createElement('li');
  	newLI.className = data.stylin;

  	var newName = document.createElement('span');
  	newName.innerHTML = data.name + ' ';
  	newName.className = data.stylin + 'name';

  	var newContent = document.createElement('p');
  	newContent.className = 'message';
  	newContent.innerHTML = data.content;

  	var newTime = document.createElement('span');
  	newTime.className = 'time';
  	newTime.innerHTML = data.time;

  	newLI.appendChild(newContent);
  	newLI.appendChild(newName);
  	newLI.appendChild(newTime);
  	$('.convo').append(newLI);

    if ((notifyPermission) && ($('#name').val() != data.name)) {
        var message = webkitNotifications.createNotification(
          'http://www.gravatar.com/avatar/2ca03a181b2fd281e4fa7709e4564408?s=100',
          data.name, data.content);
        message.show();
        setTimeout(function() {
          message.cancel();
        }, 4000);      
    }

	// scroll to bottom
	var offsettop = parseInt($(document).height());
	window.scrollTo(0,offsettop);
  };

  var removeRow = function() {
  	if ($('.convo').children().length > 100) {
  		var childList = $('.convo').children('li');
  		$(childList[0]).remove();
  	}
  };

    if (window.webkitNotifications) {
    
      function checkPermission() {
        console.log(webkitNotifications.checkPermission());
        if (webkitNotifications.checkPermission() == 0) {
          $('#permission').attr('class', 'granted');
          notifyPermission = true;
        } else {
          $('#permission').attr('class', 'request');
        }
      }
      
      $('#permission .request a.yes').click(function() {
        webkitNotifications.requestPermission(function() {
          checkPermission();
        });
      });
      
      $('#permission .request a.no').click(function() {
        $('#permission').attr('class', 'denied');
        $('#permission').fadeOut(3000);
      });
            
      checkPermission();
    }

});