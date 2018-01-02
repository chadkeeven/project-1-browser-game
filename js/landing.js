$(document).ready(function() {
	setDefaultValues(); 
	postHighScores();
	//sets default computer scores if no scores have been made
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

	//Post high scores
	function postHighScores() {
		scoresArrTwo = [];
		namesArrTwo = [];
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
			namesArrTwo.push(namesJson[i]);
			scoresArrTwo.push(currentNumber);
		}
		//Makes sure only top 5 scores and names are kept
		while (scoresArrTwo.length > 5) {
			namesArrTwo.pop();
			scoresArrTwo.pop();
		}
		//posts scores to landing page
		for (var rank = 1; rank <= scoresArrTwo.length; rank++) {
			$("#" + rank + "").html(rank + ")" + namesArrTwo[rank - 1] + " : " + scoresArrTwo[rank - 1]);
		}

	}

});