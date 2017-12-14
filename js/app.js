$(document).ready(function() {
	//Clock
	var total_time = 0;
	setInterval(function(){
		//console.log(total_time);
		total_time += 1;
		$(".clock").html(total_time);
	},1000);
	//Stoplight
	/*
	To Do:
	1)Get setInterval to change random stopLightRan
	instead of using the same one.
	2)instead of hide change color to black or grey.
	*/
	$('.greenLight').hide();

	let stopLightRan = Math.random() * (3000 - 1000) + 1000;
	setInterval(function(){
				//console.log(stopLightRan);
				if ($('.greenLight').is(':visible')) {
					$('.redLight').show();
					$('.greenLight').hide();
				}else if($('.greenLight').is(':visible') === false){
					$('.greenLight').show();
					$('.redLight').hide();
				}	
			},stopLightRan);

	//Move user piece

	var currentMargin = 0;
	$(this).keyup(function(event) {
		console.log($('.greenLight').is(':visible') === true);
		if ($('.greenLight').is(':visible') === true) {
			console.log("light is green");
			currentMargin += 5;
			$('.user_piece').css('margin-left', currentMargin + '%');
		}else if($('.greenLight').is(':visible') === false){
			if ($('.redLight').is(':visible') && currentMargin > 0){
				console.log("light is red");
				currentMargin -= 5;
				$('.user_piece').css('margin-left', currentMargin + '%');
			}
		}
		console.log(currentMargin);
	});
});