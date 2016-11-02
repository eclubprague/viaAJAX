document.getElementById("update-date-button").addEventListener("click", changeDate);
document.getElementById("update-time-button").addEventListener("click", changeTime);
document.getElementById("update-datetime-button").addEventListener("click", changeDateTime);

function changeDate(event) {
	sendRequestXMLHttp("date");
}

function changeTime(event) {
	sendRequestXMLHttp("time");
}

function changeDateTime(event) {
	sendRequestXMLHttp("datetime");
}

function sendRequestXMLHttp(type) {
	var httpRequest;

    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                xmlHttpCallback(httpRequest.responseText, type);
            } else {
                console.log("Error: "+httpRequest.status);
            }
        }
    };
	httpRequest.open('GET', '//iot.eclubprague.com:8088/'+type, true);
    httpRequest.send();
}

function xmlHttpCallback(data, type) {
	var jsonData = JSON.parse(data);
	if(type === "date") {
		document.getElementById("xhttp-date").innerHTML = jsonData.date;
	}else if(type === "time") {
		document.getElementById("xhttp-time").innerHTML = jsonData.time;
	}else if(type === "datetime") {
		document.getElementById("xhttp-time").innerHTML = jsonData.time;
		document.getElementById("xhttp-date").innerHTML = jsonData.date;
	}
}