var httpServer = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var dateFormat = require('dateformat');

//Init web socket
var wss = new WebSocketServer({ server: httpServer });

//Init Express.JS
var express = require('express');
var app = express();
var port = 8088;
//Cross-origin resource sharing
//Allowing clients to post ajax request from other origins (for demo)
var cors = require('cors');


//Define routes and end points
//Endpoint date => returns {"date", "dd.mm.yyyy"} JSON as String
app.get('/date',cors(), function(req, res) {
  var data = {};
  data.date = dateFormat(new Date(), 'dd.mm.yyyy');
  res.send(JSON.stringify(data));
});

//Endpoint date => returns {"time", "HH.MM.ss"} JSON as String
app.get('/time',cors(), function(req, res) {
  var data = {};
  data.time = dateFormat(new Date(), 'HH.MM.ss');
  res.send(JSON.stringify(data));
});

//Endpoint date => returns {"date", "dd.mm.yyyy"¨, "time", "HH.MM.ss"} JSON as String
app.get('/datetime',cors(), function(req, res) {
  var data = {};
  data.date = dateFormat(new Date(), 'dd.mm.yyyy');
  data.time = dateFormat(new Date(), 'HH.MM.ss');
  res.send(JSON.stringify(data));
});

//ROOT Endpoint returns simple message
app.get("/", function(req, res) {
  res.send("Hello world!");
}); 

//WEBSOCKET CODE
var connectedClients = {}; //List of connected clients
wss.on('connection', function connection(ws) {
  //LOG Connected Client
  console.log("Client connected!");
  ws.on('message', function incoming(message) { //Accept message from Client
    if(message !== undefined) {
    	if(message.toLowerCase() === "date") {
    		try {
    			sendDate(ws);
    		}catch(e) {
    			console.error("Error: Client connection is closed!")
    		}
    	}
    }
  });

  //Send Time to Clients in 1000 ms interval
  var interval = setInterval(function() { sendTime(ws);}, 1000);
  connectedClients.ws = interval; //Cache interval references for when the client disconnects

  //LOG Disconnected user
  ws.on('close', function(message) {
  	console.log("Client disconected!");
  	var wsInterval = connectedClients.ws;
  	if(wsInterval !== undefined)
  		clearInterval(wsInterval); //Stop sending data to disconnected client
  });

});

//Sends data over given websocket connection
//Time {"time", "HH.MM.ss"} JSON as String
function sendTime(ws) {
	try{
		var data = {};
		data.time = dateFormat(new Date(), 'HH:MM:ss');
		ws.send(JSON.stringify(data));
	}catch(e) {
		console.error("Error: client is not connected!");
	}
}

//Sends data over given websocket connection
//Date {"date", "dd.mm.yyyy"} JSON as String
function sendDate(ws) {
	try{
		var data = {};
		data.date = dateFormat(new Date(), 'dd.mm.yyyy');
		ws.send(JSON.stringify(data));
	}catch(e) {
		console.error("Error: client is not connected!");
	}
}


//Setup server
//Connect HTTP server and Express JS APP
httpServer.on('request', app);

//START SERVER, listen on port 8088
httpServer.listen(port, function() {console.log('Listening on '+httpServer.address().port)});
