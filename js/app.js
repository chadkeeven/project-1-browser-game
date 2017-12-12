$(document).ready(function() {
	console.log("js connected!");
	var total_time = 0;
	setInterval(function(){
		console.log(total_time);
		total_time += 1;
		$(".clock").html(total_time);
	},1000);
});