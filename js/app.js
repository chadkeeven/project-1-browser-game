//Make sure Document is ready before loading js
$(document).ready(function() {
	var total_time = 0; //Score for time
	var clock; //Clock for setInterval
	var currentMargin = 0; //Userpiece position‹
	var canMove = false; //Condtion if user can move
	var switchPending = false; //condtion if stoplight needs to change
	var stopLight; //stoplight for setinterval
	var locationOfNewName = 0; //location of where to find new name for  high score
	var scoresArrTwo = []; //array that holds all of the scores
	var namesArrTwo = []; //array that holds all of the names
	setDefaultValues(); //sets default computer scores if no scores have been made

	/*
	function that runs the clock in game
	runs every 10ms 
	updates the clock by total_time element
	*/
	function runClock() {
		clock = setInterval(function() {
			total_time += 0.01;
			total_time = Math.round(100 * total_time) / 100;
			$(".clock").html(total_time);
		}, 10);
	}

	/*
	Click listener for playbutton
	Performs a 3 second countdown
	Invokes the runClock, runStopLight functions
	Changes canMove to true so user can move when game starts
	*/
	$(".playButton").click(function(event) {
		$('#playModal').show();
		$(".playButton").hide();
		$("#highScoreModal").hide();
		$('#playModal').html(3);
		setTimeout(function() {
			$('#playModal').html(2);
		}, 1000);
		setTimeout(function() {
			$('#playModal').html(1);
		}, 2000);
		setTimeout(function() {
			$('.modal').hide();
			runClock();
			runStopLight();
			canMove = true;
		}, 3000);
	});

	//Stoplight
	//check if switch is pending is true, every 50ms
	//function that changes the green and red lights
	//at random intervals between 1-3 seconds
	function runStopLight() {
		$('.greenLight').hide();
		stopLight = setInterval(function() {
			if (!isWinner()) {
				let stopLightRan = Math.random() * (3000 - 1000) + 1000;
				if (!switchPending) {
					//console.log(stopLightRan);
					setTimeout(function() {
						//console.log("new switch");
						if ($('.greenLight').is(':visible')) {
							$('.redLight').show();
							$('.greenLight').hide();
						} else if ($('.greenLight').is(':visible') === false) {
							$('.greenLight').show();
							$('.redLight').hide();
						}
						switchPending = false;
					}, stopLightRan);
				}
				switchPending = true;
			}
		}, 50);
	}

	//click listener that when a key is pressed
	//allows the user to move forward if green
	//or backwards if red
	$(this).keyup(function(event) {
		if (isWinner() === false) {
			if (canMove) {
				if ($('.greenLight').is(':visible') === true) {
					currentMargin += 5;
					$('.user_piece').css('margin-left', currentMargin + '%');
				} else if ($('.greenLight').is(':visible') === false) {
					if ($('.redLight').is(':visible') && currentMargin > 0) {
						currentMargin -= 5;
						$('.user_piece').css('margin-left', currentMargin + '%');
					}
				}
			}
		}
	});


	//Winning Condition
	//Checks for winner
	//if winner then highscores function is invoked
	//clears the clock and stoplight intervals
	//resets time and player back to 0
	function isWinner() {
		if (currentMargin === 90) {
			highScores();
			$('#highScoreModal').show();
			$('.playButton').show();
			clearInterval(clock);
			clearInterval(stopLight);
			total_time = 0;
			currentMargin = 0;
			canMove = false;
			$('.user_piece').css('margin-left', currentMargin + '%');
			return true;
		} else {
			return false;
		}
	}
	//set default values if local storage is blank
	//fill with CPU scores
	function setDefaultValues() {
		if (localStorage.getItem("scores") === null) {
			var scoresArr = [6, 8, 10, 15, 18];
			var namesArr = ["CP1", "CP2", "CP3", "CP4", "CP5"];
			localStorage.setItem("scores", scoresArr);
			localStorage.setItem("names", namesArr);
		}
	}

	//Post to high scores
	function highScores() {
		var timeHasBeenAdded = false;
		canMove = false;
		scoresArrTwo = [];
		namesArrTwo = [];
		$("#yourScore").html("Your Score: " + total_time);
		//Get values for scores and names from local storage
		var scoresString = localStorage.getItem("scores");
		var namesString = localStorage.getItem("names");
		//!!Convert JSON string of scores into an array of numbers
		var scoresJson = scoresString.split(",");
		var namesJson = namesString.split(",");
		//test wheather or not the user score beat another score
		//also pushes into position of score
		for (var i = 0; i < scoresJson.length; i++) {
			var currentNumber = parseFloat(scoresJson[i]);
			if (!timeHasBeenAdded && total_time < currentNumber) {
				namesArrTwo.push("NEW");
				scoresArrTwo.push(total_time);
				namesArrTwo.push(namesJson[i]);
				scoresArrTwo.push(currentNumber);
				timeHasBeenAdded = true;
			} else {
				namesArrTwo.push(namesJson[i]);
				scoresArrTwo.push(currentNumber);
			}
		}
		//Makes sure only top 5 scores and names are kept
		while (scoresArrTwo.length > 5) {
			namesArrTwo.pop();
			scoresArrTwo.pop();
		}
		//checks for if there was a new highscore
		//finds where the new high score is
		//if highscore a text box appears and a submit button
		//asking to input intials
		for (var rank = 1; rank <= scoresArrTwo.length; rank++) {
			if (namesArrTwo[rank - 1] === "NEW") {
				locationOfNewName = rank - 1;
				$("#" + rank + "").html("<input type='text' id='newName' name='newName' placeholder='Initials' maxlength='3'> : " + scoresArrTwo[rank - 1]);
				$("#addNameButton").show();
			} else {
				$("#" + rank + "").html(namesArrTwo[rank - 1] + " : " + scoresArrTwo[rank - 1]);
			}
		}

	}

	//eventlistner for submit for name on highscore
	//if empty "FOO" is submitted as name instead
	$("#addNameButton").click(function(event) {
		var newNameValue = $('#newName').val().toUpperCase();
		if ($('#newName').val() === "") {
			newNameValue = "FOO";
		}
		namesArrTwo[locationOfNewName] = newNameValue;
		$("input").hide();
		$(this).hide();
		$("#" + (locationOfNewName + 1) + "").html(namesArrTwo[locationOfNewName] + " : " + scoresArrTwo[locationOfNewName]);
		localStorage.setItem("scores", scoresArrTwo);
		localStorage.setItem("names", namesArrTwo);
	});


	// //x button on highscore modal
	// $('.xButton').click(function(event) {
	// 	$('.modal').hide();
	// });

});