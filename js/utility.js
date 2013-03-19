// utility
function getTime(){
	var time = new Date();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	var realTime = hours +":"+ minutes +":"+ seconds;
	return realTime;
}

exports = getTime;