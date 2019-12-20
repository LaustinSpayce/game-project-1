console.log("Script Loaded!")

var mainInputBox = document.querySelector('#mainInput');
var wordDisplay = document.querySelector('#wordDisplay');
var correctlyTypedDisplay = document.querySelector('#correctlyTypedPortion');
var wronglyTypedDisplay = document.querySelector('#wronglyTypedPortion');
var completeWordHint = document.querySelector('#completeWord');
var beginGameButton = document.querySelector('#beginGame');
var scoreText = document.querySelector('#scoreText');
var livesText = document.querySelector('#livesText');

var playerLives = 5;
var gameOver = true;
var score = 0;
var mistakeMade = false

var activeWord;
var correctlyTypedPortion = "";
var wronglyTypedPortion = "";
var remainingToTypePortion = "";



var checkWordMatched = function(event) {
    // console.log('no');
    var inputValue = this.value;

    // Check word partially matches what has been typed in so far.
    if (inputValue === activeWord.slice(0, inputValue.length)) {       
        remainingToTypePortion = remainingToTypePortion.slice(1);
        correctlyTypedDisplay.textContent = inputValue;
        wordDisplay.textContent = remainingToTypePortion;
        mistakeMade = false;
        wronglyTypedPortion = "";
        wronglyTypedDisplay.textContent = wronglyTypedPortion;
    } else {
        // console.log(inputValue + " typo!");
        this.value = inputValue.slice(0, inputValue.length - 1);
        wrongLetterTyped();
    }

    if (!inputValue) {
        remainingToTypePortion = activeWord;
    }
    

    // if the input equals the full active word.
    if (inputValue === activeWord) {
        console.log("word matched!");
        this.value = "";
        score++;
        updateScore();
        choosenewWord();
    } else {
        // console.log(inputValue + " is not matched.");
    }
};


var choosenewWord = function () {
    activeWord = "";
    correctlyTypedDisplay.textContent = "";
    mainInputBox.value = "";
    var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
    activeWord = wordDictionary[newWordIndex];
    remainingToTypePortion = activeWord;
    wordDisplay.textContent = activeWord;
    completeWordHint.textContent = activeWord;
}


var wrongLetterTyped = function() {
    if (!mistakeMade){
        playerLives--;
        mistakeMade = true;
        console.log("Lives left: " + playerLives);
    }
    wronglyTypedPortion = remainingToTypePortion[0];
    wordDisplay.textContent = remainingToTypePortion.slice(1);
    wronglyTypedDisplay.textContent = wronglyTypedPortion;
    checkGameOver();
}


var checkGameOver = function () {
    updateScore();
    if (playerLives <= 0) {
        console.log('game over')
        gameOver = true;
        mainInputBox.setAttribute('disabled', true);
    }
}


var beginGame = function () {
    console.log('clicked');
    if (gameOver) {
        score = 0;
        playerLives = 5;
        console.log('game begin');
        mainInputBox.removeAttribute('disabled');
        wronglyTypedPortion = "";
        wronglyTypedDisplay.textContent = wronglyTypedPortion;
        choosenewWord();
        updateScore();
        mainInputBox.focus();
    }
}


var updateScore = function () {
    scoreText.textContent = score;
    livesText.textContent = playerLives;
}



mainInputBox.addEventListener('keyup', checkWordMatched);
beginGameButton.addEventListener('click',beginGame);
choosenewWord();
updateScore();

mainInputBox.setAttribute('disabled', true);