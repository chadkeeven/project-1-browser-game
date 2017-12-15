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
	//check if switch is pending is true, every 50ms
	setInterval(function(){

		if (!isWinner()) {

			let  stopLightRan = Math.random() * (3000 - 1000) + 1000;
			if (!switchPending) {
				//console.log(stopLightRan);
				setTimeout(function(){
					//console.log("new switch");
					if ($('.greenLight').is(':visible')) {
						$('.redLight').show();
						$('.greenLight').hide();
					}else if($('.greenLight').is(':visible') === false){
						$('.greenLight').show();
						$('.redLight').hide();
					}
					switchPending = false;		
				},stopLightRan);
			}switchPending = true;
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
		}
	});

	//Winning Condition
	function isWinner(){
		if (currentMargin === 90) {
			localStorage.setItem("score", total_time);
			highScores();
			$('#firstPlace').html(localStorage.getItem("score"));
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

	//Post to high scores
	var scoresArr = [1,2,3,4,5];
	localStorage.setItem("scores", scoresArr);
	function highScores(){
		var timeHasBeenAdded = false;
	//	console.log(localStorage.getItem("scores")); 
	var scoresString =localStorage.getItem("scores");
	var scoresArrTwo =[];
 	//!!Convert JSON string of scores into an array of numbers
 	var currentString= scoresString.split(",");
 	for (var i in currentString){
 		var currentNumber = parseInt(currentString[i]);
 		if (!timeHasBeenAdded) {
 			if (total_time < currentNumber) {
 				scoresArrTwo.push(total_time);
 				scoresArrTwo.push(currentNumber);
 				timeHasBeenAdded = true;
 			}else{
 				scoresArrTwo.push(currentNumber);
 			}
 		}else{
 			scoresArrTwo.push(currentNumber);
 		}
 		//console.log(scoresArrtwo[i]);

 	}
 	if (scoresArrTwo.length < 5) {
 		scoresArrTwo.pop();
 	}
 	localStorage.setItem("scores", scoresArrTwo);
 }

	//x button on highscore modal
	$('.xButton').click(function(event) {
		$('.modal').hide();
	});

});















