$(document).ready(function() {

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

});