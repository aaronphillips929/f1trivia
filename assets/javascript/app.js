$(document).ready(function(){
	
	var questions = [{
		question:"Who is the youngest driver on the 2019 grid?",
		choices:["Lando Norris", "Charles Leclerc", "Max Verstappen", "George Russell"],
		answer: "Lando Norris",
	},  {
		question:"How many WDC's has Lewis Hamilton won?",
		choices:["7", "5", "10", "3"],
		answer: "5",
	},  {
		question:"Which team claims to have exceeded the 1000hp barrier?",
		choices:["Renault F1 Team", "Scuderia Ferrari", "Mercedes AMG Petronas F1", "Red Bull Racing"],
		answer: "Renault F1 Team",
	},  {
		question:"Which driver replaced Pierre Gasly at Red Bull Racing mid-season 2019?",
		choices:["Jack Doohan", "Carlos Sainz", "Alex Albon", "Daniil Kvyat"],
		answer: "Alex Albon",
	},  {
		question:"Which circuit on the 2019 calendar is the newest addition to the calendar?",
		choices:["Baku City Circuit", "Circuit of the Americas", "Yas Marina Circuit", "Bahrain International Circuit"],
		answer: "Baku City Circuit",
	},  {
		question:"What's the name of McLaren's esports team?",
		choices: ["McLaren Driving Academy", "McLaren Honda Esports", "McLaren Shadow", "McLaren Team Vitality"],
		answer: "McLaren Shadow",
	},  {
		question:"Which manufacturer is the only tire manufacturer on the 2019 grid?",
		choices:["Bridgestone", "Michelin", "Hankook", "Pirelli"],
		answer: "Pirelli",
	},  {
		question:"What's the average age of drivers on the 2019 grid?",
		choices:["29 years and 2 months", "25 years and 11 months", "21 years and 6 months", "26 years and 3 months"],
		answer: "26 years and 3 months",
	},  {
		question:"Where is Kimi Raikkonen from?",
		choices:["Greenland", "Finland", "Iceland", "Poland"],
		answer: "Finland",
	},  {
		question:"Which F2 team did Charles Leclerc race with for the 2017 season?",
		choices:["MP Motorsport", "UNI-Virtuosi", "PREMA Racing", "BWT Arden"],
		answer: "PREMA Racing",
	},  {
		question:"Who is the Team Principal at HAAS Formula One Team",
		choices:["Guenther Steiner", "Gene Haas", "Toto Wolff", "Rob Taylor"],
		answer: "Guenther Steiner",
	},  {
		question:"Which power unit does ROKiT Williams Racing utilize",
		choices:["Ferrari", "Renault", "Mercedes", "Honda"],
		answer: "Mercedes",
	},  {
		question:"Which team has the longest car on the 2019 grid?",
		choices:["Mercedes AMG Petronas Motorsport", "Alfa Romeo Racing", "Scuderia Toro Rosso", "Red Bull Racing"],
		answer: "Mercedes AMG Petronas Motorsport",
	},  {
		question:"Which driver on the 2019 grid has driven the most races without reaching a podium?",
		choices:["Robert Kubica", "Nico Hulkenburg", "Romain Grosjean", "Kevin Magnusson"],
		answer: "Nico Hulkenburg",
	},  {
		question:"How many races are on the 2019 calendar?",
		choices:["21", "15", "23", "17"],
		answer: "21",
	}];

	/* DOM */
	var section = $("<section id='main'>");
	var row = $("<div class='row'>");
	var col = $("<div class='col-md-8 col-md-offset-2'>");
	var well = $("<div class='well'>");
	var h3 = $("<h3 class='text-center'>");
	var h4 = $("<h4 class='text-center'>");
	var button = $("<button class='btn btn-default'>");

	
	/*	========================================================
		Step : 1 ==> Starts the game.
		========================================================	*/
	$(".container").on("click", ".btn-start", function(){
		$(".game-rule").fadeOut(500);
		setTimeout(game.loadQuestion, 1000);
	});

	/*	=============================================================
		Step : 2 ==> User selects answer (click on choices(answers)).
		=============================================================	*/
	$(".container").on("click", ".btn-answer", function(){
		section.html('');
		well.html('');
		clearInterval(game.setIntervalFlag);
		if($(this).attr('data-name') === questions[game.currentQuestion].answer){
			game.correctAnswer();
		}
		else{
			game.incorrectAnswer();
		}
	});

	/*	========================================================
		Step : 3 ==> After result, it resets the game.
		========================================================	*/
	$(".container").on("click", ".btn-reset", function(){
		game.reset();
	});

	var game = {
		/* Assigning 'questions' array to 'gameQuestions' */
		gameQuestions : questions,
		
		/* To keep track of current question */
		currentQuestion : 0,

		/* Trackers : To keep track of correct/incorrect answers and time left */
		correctAnswerCounter : 0,
		wrongAnswerCounter : 0,
		unanswerCounter : 0,
		timeCounter : 10,
		
		/* Flags To clearTimeout and to clearInterval */
		setIntervalFlag : '',
		setTimeoutFlag : '',

		
		/*	========================================================
				Load question and their choices from gameQuestions.
				Generate HTML elements.
				Keep timer go on.
			========================================================	*/
		loadQuestion : function(){
			// console.log("loadQuestion");
			clearTimeout(game.setTimeoutFlag);
			section.html('');
			well.html('');

			h3.html('Time Left : <span id="time-left">10</span>');
			game.setIntervalFlag = setInterval(game.timer, 1000);

			h4.html(game.gameQuestions[game.currentQuestion].question);
			well.append(h3).append(h4);

			for (var i = 0; i<game.gameQuestions[game.currentQuestion].choices.length; i++){
      			var button = $("<button class='btn btn-default btn-block btn-answer'>");
      			button.attr('data-name', game.gameQuestions[game.currentQuestion].choices[i]);
      			button.text(game.gameQuestions[game.currentQuestion].choices[i]);
      			well.append(button);
    		}

    		col.append(well);
			row.append(col);
			section.append(row);
			$(".container").append(section);
		},

		/*	==============================================
				Let the timer go on from 10 to 0 seconds.
				When timeCounter reaches 0, call timeUp().
			==============================================	*/
		timer : function(){
			game.timeCounter--;
			$("#time-left").text(game.timeCounter);
			if(game.timeCounter === 0){
				$("#time-left").text('Too slow!');
				game.timeUp();
			}
		},

		/*	========================================================
				If user doen't select any answer in given time,
				execute this function.
			========================================================	*/
		timeUp : function(){
			// console.log("timeUp");
			clearInterval(game.setIntervalFlag);
			game.unanswerCounter++;
			game.generateHTML('', '', 'Too slow!', 'The correct Answer is ' + game.gameQuestions[game.currentQuestion].answer);
			game.currentStatus();
		},

		/*	========================================================
				Keep track of correctAnswerCounter and generate gif
			========================================================	*/
		correctAnswer : function(){
			// console.log("correctAnswer");
			game.correctAnswerCounter++;
			game.generateHTML('', '', 'Correct!', game.gameQuestions[game.currentQuestion].answer);
			game.currentStatus();
		},

		/*	========================================================
				Keep track of wrongAnswerCounter and generate gif
			========================================================	*/
		incorrectAnswer : function(){
			// console.log("incorrectAnswer");
			game.wrongAnswerCounter++;
			game.generateHTML('', '', 'Incorrect', 'The correct answer is: ' + game.gameQuestions[game.currentQuestion].answer);
			game.currentStatus();
		},

		/*	========================================================
				Checks if there are questions available	in gameQuestions or not.
				If yes, go to next question.
				If no, print result.
			========================================================	*/
		currentStatus : function(){
			if(game.currentQuestion === game.gameQuestions.length - 1){
      			setTimeout(game.result, 2000);
    		}else {
      			setTimeout(game.nextQuestion, 2000);
    		}
		},

		/*	========================================================
				Load next question from gameQuestions if there is.
				If there isn't, call result()
			========================================================	*/
		nextQuestion : function(){
			// console.log("nextQuestion");
			game.timeCounter = 10;
			game.currentQuestion++;
			
			if(game.currentQuestion < game.gameQuestions.length)
				game.setTimeoutFlag = game.loadQuestion();
			else
				game.setTimeoutFlag = game.result();
		},

		/*	========================================================
				Generate result based on users answer.
			========================================================	*/
		result : function(){
			// console.log(game.correctAnswerCounter + " " + game.wrongAnswerCounter);
			clearTimeout(game.setTimeoutFlag);
			game.generateHTML('', '', '"You reached the checkered flag!"', 'Right Answers : ' 
				+ game.correctAnswerCounter + " " 
				+ 'Wrong Answers: ' + game.wrongAnswerCounter + " "
				+ " " + 'Unanswered: ' + game.unanswerCounter);
			var button = $("<button class='btn btn-default btn-block btn-reset' id='reset'>");
			button.text('Try Again?');
			well.append(button);
		},


		/*	========================================================
				Go Back To Default State.
			========================================================	*/
		reset : function(){
			// console.log("reset");
			game.currentQuestion = 0;
			game.correctAnswerCounter = 0;
			game.wrongAnswerCounter = 0;
			game.timeCounter = 10;
			clearTimeout(game.setTimeoutFlag);
			clearInterval(game.setIntervalFlag);
			game.setIntervalFlag = '';
			game.setTimeoutFlag = '';
			section.html('');
			well.html('');
			game.loadQuestion();
		},

		/*	========================================================
				Generic function to generate HTML Page/Section
			========================================================	*/
		generateHTML : function(sectionTag, wellTag, h3Tag, h4Tag){
			
			section.html(sectionTag);
			well.html(wellTag);
			
			h3.html(h3Tag);
			h4.text(h4Tag);
			
			well.append(h3).append(h4);
			col.append(well);
			row.append(col);
			section.append(row);
			
			$(".container").append(section);
		}
	}
});