// Declare Variables For Sound Files
var yes1 = new Audio('snd/yes-1.mp3'),
	yes2 = new Audio('snd/yes-2.mp3'),
	yes3 = new Audio('snd/yes-3.mp3'),
	no1 = new Audio('snd/no-1.mp3'),
	no2 = new Audio('snd/no-2.mp3'),
	no3 = new Audio('snd/no-3.mp3');
// Array for the 'correct' sound effects	 
var yesArr = [yes1, yes2, yes3],
	// Array for the 'incorrect' sound effects
	noArr = [no1, no2, no3];
// Array of background colors for the cards
var cardColors = ['#0154a4', '#0092ce', '#00a88f', '#8dfd07', '#fef200', '#ffc20f', '#f78f1e', '#ed1b24', '#e44097', '#a64499'],   // Array of card values (The numbers on the cards)
	cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	// Array of problems/questions
	problems = ['1+0', '1+1', '1+2', '1+3', '1+4', '1+5', '1+6', '1+7', '1+9'];
// Generate a (close to) truly random array selection
function retRand(array) {
	// Get he first item of the arry
	var arrItem = array.slice(0);
	return function () {
		// There aren't many items in the array :(
		if (arrItem.length < 1) {
			// So, get the first item
			arrItem = array.slice(0);
		}
		// Create a random index value (maximum of how many items are in the array)
		var index = Math.floor(Math.random() * arrItem.length);
		// Random array item based on our random index
		var newItem = arrItem[index];
		// Get the item
		arrItem.splice(index, 1);
		// Return the randomized item
		return newItem;
	};
}
// Generate cards and select a problem
function generateGame() {
	// get random card color
	var cardColor = retRand(cardColors),
		// get random card value
		cardValue = retRand(cardValues),
		// Count how many cards there will be
		numCards = cardValues.length;
	// Initialize the cards	
	$('#cards').empty();
	// Add an LI for each card in the array
	for (var i = 0; i < numCards; i++) {
		// Append the card (LI)
		$('#cards').append("<li><span>" + cardValue() + "</span></li>");
	}
	// For each card
	$('#cards li').each(function () {
		// Add a random background color to each card
		$(this).css('backgroundColor', cardColor());
	});
	// Cache our LI
	var card = $('#cards li');
	// On tap for device, click for desktop
	$('#cards li span').on('tap', function () {
		// Get the number (value) from the card
		var cardVal = $(this).text();
		// If the answer is correct
		if (cardVal == answer) {
			// Animate background from current color to green
			$(this).animate({
				backgroundColor: 'rgba(0,170,0,1)'
			}, 300);
			// Play random 'correct' sound effect
			yesArr[Math.floor(Math.random() * yesArr.length)].play();
			// Wait 1 second, then Refresh the playing field
			setTimeout(function () {
				generateGame();
			}, 1000);
		}
		// Else (if the answer is wrong)
		else {
			// Animate background from current		
			$(this).animate({
				backgroundColor: 'rgba(255,0,0,1)'
			}, 300, function () {
				// Play random 'incorrect' sound effect
				noArr[Math.floor(Math.random() * noArr.length)].play();
				// Animate back to original card color
				$(this).animate({
					backgroundColor: 'rgba(255,0,0,0)'
				}, 300);
			});
		}
	});
	// Randomize the random array
	var randProb = problems.sort(function () {
			return Math.random() - 0.5;
		}),
		// Get a problem
		problem = retRand(randProb),
		// Grab the first number from our problem
		firstNum = parseInt(problem().substr(0, 1)),
		// Grab the second number from our problem
		secondNum = parseInt(problem().substr(2, 1)),
		// Generate the answer
		answer = firstNum + secondNum,
		// Problem variation one (always starts with '1' ends with 0-9)
		prob1 = firstNum + ' + ' + secondNum,
		// Problem variation two (starts with 0-9 ends with 1)
		prob2 = secondNum + ' + ' + firstNum,
		// Array that stores our problem variations
		probs = [prob1, prob2],
		// Grab a random problem format
		getProb = retRand(probs);
	// Display the problem
	$('#problem').text(getProb);
}
// Create the playing field
generateGame();
