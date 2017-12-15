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

	var currentMargin = 80;

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
			
			highScores();
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

	function setDefaultValues(){
		//console.log(localStorage.getItem("scores")=== null );
		if(localStorage.getItem("scores") === null){
			var scoresArr = [5,8,10,12,15];
			var namesArr = ["Jim","Bob","Sid","ECK", "Si"];
			localStorage.setItem("scores", scoresArr);
			localStorage.setItem("names", namesArr);
		//console.log("default values set");
	}
}
	//localStorage.setItem("score", total_time);
	//$('#firstPlace').html(localStorage.getItem("score"));
	//Post to high scores
	// var scoresArr = [5,8,10,12,15];
	// var namesArr = ["Jim","Bob","Sid","ECK", "Si"];
	// localStorage.setItem("scores", scoresArr);
	// localStorage.setItem("names", namesArr);
	setDefaultValues();
	var locationOfNewName = 0;
	var scoresArrTwo =[];
		var namesArrTwo = [];

	function highScores(){
		var timeHasBeenAdded = false;
		
		//	console.log(localStorage.getItem("scores")); 
		var scoresString =localStorage.getItem("scores");
		var namesString = localStorage.getItem("names");
		
	 	//!!Convert JSON string of scores into an array of numbers
	 	var scoresJson = scoresString.split(",");
	 	var namesJson = namesString.split(",");
	 	console.log(namesJson);
	 	//console.log(scoresJson);
	 	for (var i in scoresJson){
	 		var currentNumber = parseFloat(scoresJson[i]);
	 		if (!timeHasBeenAdded) {
	 			if (total_time < currentNumber) {
	 				namesArrTwo.push("NEW");
	 				scoresArrTwo.push(total_time);
	 				namesArrTwo.push(namesJson[i]);
	 				scoresArrTwo.push(currentNumber);
	 				timeHasBeenAdded = true;
	 			}else{
	 				namesArrTwo.push(namesJson[i]);
	 				scoresArrTwo.push(currentNumber);
	 			}
	 		}else{
	 			namesArrTwo.push(namesJson[i]);
	 			scoresArrTwo.push(currentNumber);
	 		}
	 		//console.log(scoresArrtwo[i]);

	 	}
	 	while (scoresArrTwo.length > 5) {
	 		namesArrTwo.pop();
	 		scoresArrTwo.pop();
	 	}
	 	
	 	for(var rank = 1; rank <= scoresArrTwo.length; rank++){
	 		if (namesArrTwo[rank-1] === "NEW") {
	 			locationOfNewName = rank -1;
	 			$("#"+ rank + "").html("<input type='text' id='newName' name='newName' placeholder='Initials' maxlength='3'> : " + scoresArrTwo[rank-1]);
	 			$("#addNameButton").show();

	 		}else{
	 			$("#"+ rank + "").html(namesArrTwo[rank-1] + " : " + scoresArrTwo[rank-1]);
	 		}
	 	}
	 		 	
	 }
	 //eventlistner for submit for name on highscore
	 	$("#addNameButton").click(function(event) {
	 		//console.log("score is at:" + locationOfNewName);
	 		//console.log($('#newName').val());
	 		var newNameValue = $('#newName').val();
	 		namesArrTwo[locationOfNewName] = newNameValue;
	 		localStorage.setItem("scores", scoresArrTwo);
	 	localStorage.setItem("names", namesArrTwo);
	 	});

	 



	//x button on highscore modal
	$('.xButton').click(function(event) {
		$('.modal').hide();
	});

});















