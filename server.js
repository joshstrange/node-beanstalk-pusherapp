var Pusher = require('node-pusher');

var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Nothing to see here, move along.');
});

app.get('/deploy', function(request, response) {
	  var pusher = new Pusher({
	  appId: 'APP_ID',
	  key: 'KEY',
	  secret: 'SECRET'
	});

	var channel = 'deployments';
	var event = 'growl';
	var data = {
	  title: 'Deployment Successful',
	  content: 'Your beanstalk repo was Successfully deployed'
	};

	// (optional) socket_id is used to prevent getting message for myself
	// http://pusher.com/docs/publisher_api_guide/publisher_excluding_recipients
	var socket_id = '1302.1081607';

	pusher.trigger(channel, event, data, socket_id, function(err, req, res) {
	  // do something (this callback is optional)
	});
});

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});