$("#update-date-button-j").click(changeDate);
$("#update-time-button-j").click(changeTime);
$("#update-datetime-button-j").click(changeDateTime);

function changeDate(event) {
	sendJqueryRequest("date");
}

function changeTime(event) {
	sendJqueryRequest("time");
}

function changeDateTime(event) {
	sendJqueryRequest("datetime");
}

function sendJqueryRequest(type) {
    $.ajax({
      type: 'GET',
        url: '//iot.eclubprague.com:8088/'+type,
        dataType: 'json',
    success: function(data, status, jqXHR) {
        dataCallback(data, type);
    },
    complete: function(jqXHR, status){
        console.log("Request completed: "+status);
    },
    error: function(jqXHR, status, error) {
      console.log(error);
    }
});
}

function dataCallback(data, type) {
	var jsonData = data;
	if(type === "date") {
		$("#jquery-date").html(jsonData.date);
	}else if(type === "time") {
		$("#jquery-time").html(jsonData.time);
	}else if(type === "datetime") {
		$("#jquery-time").html(jsonData.time);
		$("#jquery-date").html(jsonData.date);
	}
}

