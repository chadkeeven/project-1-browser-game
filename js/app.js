$(document).ready(function() {
	//Clock
	var total_time = 0;
	setInterval(function(){
		//console.log(total_time);
		total_time += 0.01;
		total_time = Math.round(100 * total_time)/100;
		$(".clock").html(total_time);
	},10);
	//Stoplight
	/*
	To Do:
	-instead of hide change color to black or grey.
	*/
	$('.greenLight').hide();

	

	var switchPending = false;
	setInterval(function(){
		if (!isWinner()) {
			let  stopLightRan = Math.random() * (3000 - 1000) + 1000;
			if (!switchPending) {
				console.log(stopLightRan);
				setTimeout(function(){
					if ($('.greenLight').is(':visible')) {
						$('.redLight').show();
						$('.greenLight').hide();
					}else if($('.greenLight').is(':visible') === false){
						$('.greenLight').show();
						$('.redLight').hide();
					}
					switchPending = false;		
				},stopLightRan);
			}
			switchPending = true;
		}
	},50);

	//Move user piece

	var currentMargin = 0;

	$(this).keyup(function(event) {
		if (isWinner() == false) {
			if ($('.greenLight').is(':visible') === true) {
				currentMargin += 5;
				$('.user_piece').css('margin-left', currentMargin + '%');
				isWinner();
			}else if($('.greenLight').is(':visible') === false){
				if ($('.redLight').is(':visible') && currentMargin > 0){
					currentMargin -= 5;
					$('.user_piece').css('margin-left', currentMargin + '%');
				}
			}
		}else{
			alert("Game is over!");
		}
	});

	//Winning Condition
	function isWinner(){
		if (currentMargin === 100) {
			$('#highScoreModal').show();
			total_time = 0;
			currentMargin = 0;
			$('.user_piece').css('margin-left', currentMargin + '%');
			return true;
		}
		else{
			return false;
		}
	}

	//x button on highscore modal
	$('.xButton').click(function(event) {
		$('.modal').hide();
	});

});