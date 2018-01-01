$(document).ready(function() {
	postHighScores();
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
				$("#" + rank + "").html(namesArrTwo[rank - 1] + " : " + scoresArrTwo[rank - 1]);
		}

	}

});