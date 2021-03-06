var game = {
  hangWRDS: ["curry", "james", "davis", "westbrook","durant", "antetokounmpo", "green", "leonard", "harden", "paul", "irving" , "hayword"],
  secretWRD: "",
  secretARRAY: [],
  usrguessARRAY: [],
  currentLTR: "",
  inProgress: false,
  yesMatch: false,
  usedChar: false,
  remGUESS: 12,
  usedLTRS: [],
  matchPOS: [],
  init: function(){
  	this.secretWRD = this.hangWRDS[Math.floor(Math.random() * this.hangWRDS.length)];
  	this.secretARRAY = this.secretWRD.split("");
  	this.usrguessARRAY = this.secretARRAY.slice(0); // make the arrays the same size
  	this.usrguessARRAY.fill("_");
  	this.inProgress = true;
  	this.currentLTR = "";
  	this.remGUESS = 12;
  	this.usedChar = false; 
  	// document.getElementById("wordID").innerHTML = "";
  	var s ="";
  	for (var i = 0; i < this.secretARRAY.length; i++) {
  		s += "_  ";
  	}
    document.getElementById("wordID").innerHTML = s;
    console.log("usedLTRS Array : " + this.usedLTRS + this.usedLTRS.length);
  	
    var item = document.getElementById("guessedID");
    if (item.hasChildNodes() != null) {
      while (item.hasChildNodes()) {
          item.removeChild(item.lastChild);
      }
    }

    document.getElementById("guessedID").innerHTML = "CHARACTERS ALREADY GUESSED:  ";

    var len = this.usedLTRS.length;
  	for (var i = 0; i < len; i++) {
  		this.usedLTRS.pop();
  	}
    console.log("usedLTRS Array : " + this.usedLTRS);
 
  	document.getElementById("statusID").innerHTML = "PRESS ANY KEY TO GET STARTED!";
  	document.getElementById("guessCntID").innerHTML = "NUMBER OF GUESSES REMAINING: " + this.remGUESS;
  },
  updateGUESScnt: function(){
  	return(this.remGUESS--);
  },
  matchCHK: function(){
  	// Clear the previous matchPOS array if any
  	this.yesMatch = false;
  	var l = this.matchPOS.length;
  	for (var i = 0; i < l; i++) {
  		this.matchPOS.pop();
//  		console.log("matchPOS Array content, pop i =" + i + "  pos" + this.matchPOS);
//  		console.log("matchPOS Array length : " + this.matchPOS.length);

  	}
  	console.log("secretARRAY Array length : " + this.secretARRAY.length);
  	console.log("secretARRAY Contents : " + this.secretARRAY);
  	for (var i = 0; i < this.secretARRAY.length; i++) {
  		if (this.currentLTR === this.secretARRAY[i]){
  			this.yesMatch = true;
  			this.usrguessARRAY[i] = this.secretARRAY[i];
  			this.matchPOS.push(i);
  			document.getElementById("statusID").innerHTML = "THAT WAS A MATCH! MAKE ANOTHER GUESS!";
  		}
  	}
  	console.log("matchPOS Array content : " + this.matchPOS);
  	console.log("usrguessARRAY Array : " + this.usrguessARRAY);
  	console.log("secretARRAY : " + this.secretARRAY);
  	return(this.yesMatch);

  },
  usedCHK: function(){
  	this.usedChar = false;
  	for (var i = 0; i < this.usedLTRS.length; i++) {
  		if (this.currentLTR === this.usedLTRS[i]){
  			document.getElementById("statusID").innerHTML = "YOU ALREADY SELECTED THIS KEY!";
  			this.usedChar = true;
  			// console.log("usedChar : " + this.usedChar);
  			break;
  		}
  	}
  	// Add current letter to the used letter (character) array

  	// console.log("usedLTRS Array : " + this.usedLTRS);
  	if (this.usedChar === true){
  		document.getElementById("statusID").innerHTML = "MAKE ANOTHER GUESS!";
	} else {
	  	this.usedLTRS.push(this.currentLTR);
	  	TxtNode = document.createTextNode(this.currentLTR + "  ");
  		document.getElementById("guessedID").appendChild(TxtNode);
	}
  	return(this.usedChar);
  },
  winCHK: function(){
  	if (this.usrguessARRAY.length === this.secretARRAY.length){
  		for (var i = 0; i < this.secretARRAY.length; i++) {
  			if (this.usrguessARRAY[i] != this.secretARRAY[i])
  				return false;
  		}
  		return true;
  	}
  	else{
   		return false;
  	}
  },
  displayMatches: function(){
  	var el = "";
  	for (var i = 0; i < this.usrguessARRAY.length; i++) {
  		el += this.usrguessARRAY[i] + "  ";
  	}
  	document.getElementById("wordID").innerHTML = el;
  }
}


window.onload = function(){
	var winCnt = 0;
	game.init();
	document.onkeyup = function(event){
		game.currentLTR = event.key.toLowerCase();
		console.log("Game continues: " + game.currentLTR);
		console.log(game);
		game.usedCHK();
		console.log("Is usedChar set: " + game.usedChar);
		if (game.matchCHK() === true){
			game.displayMatches();
			if (game.winCHK() === true){
				winCnt++;
				document.getElementById("winID").innerHTML = "WINS: " + winCnt;

				game.init();
			}
		}

		if (game.usedChar === false && game.yesMatch === false){
			if (game.updateGUESScnt() === 0){
				console.log("You have used all of your guesses");
				console.log("Game ended!");
				game.inProgress = false;
				game.init();
			}
		document.getElementById("guessCntID").innerHTML = "NUMBER OF GUESSES REMAINING: " + game.remGUESS;
		}

		// after the HTML is rendered, init the game
		// process the keyup event and set current guess to lowercase
		// - Check if this guess has been used before:
		//		- add character to used character array
		//		- set flag that indicates current character has been selected before
		// - check if guess wins and update wins count
		// - check if guesses have been exhausted
		// -- init for new game if true 
		//
		//
		// wins:
		// check if current guess is a match and how many
		//	-	determine if current guess is a match and how many characters match for this guess
		//	-	display all the characters of the secretARRAY in the location that corresponds to the match position 


	}
}