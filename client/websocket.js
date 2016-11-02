var websocket = new WebSocket("ws://iot.eclubprague.com:8088");
var date = "";
var time = "";

websocket.onopen = function (event) {
	websocket.send("date");
}

websocket.onmessage = function (data) {
  var jsonData = JSON.parse(data.data);
  if(jsonData.time !== undefined) {
  	time = jsonData.time;
  }else if(jsonData.date !== undefined) {
  	date = jsonData.date;
  }
  $('#datefield').html(date+" "+time);
}