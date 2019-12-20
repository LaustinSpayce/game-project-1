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
var wordsPerBox = 3;

var activeWord;
var correctlyTypedPortion = "";
var wronglyTypedPortion = "";
var remainingToTypePortion = "";


// Checks the input box against the word/phrase.
var checkWordMatched = function(event) {
    // console.log('no');
    var inputValue = this.value;

    // Check word partially matches what has been typed in so far.
    if (inputValue === activeWord.slice(0, inputValue.length)) {       
        remainingToTypePortion = activeWord.slice(inputValue.length);
        correctlyTypedPortion = inputValue;
        mistakeMade = false;
        wronglyTypedPortion = "";
        updateWordDisplay();
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
        chooseNewWords();
    } else {
        // console.log(inputValue + " is not matched.");
    }
};


var updateWordDisplay = function() {
    correctlyTypedDisplay.textContent = correctlyTypedPortion;
    wordDisplay.textContent = remainingToTypePortion;
    wronglyTypedDisplay.textContent = wronglyTypedPortion;
    completeWordHint.textContent = activeWord;
}


var chooseNewWords = function () {
    activeWord = "";
    mainInputBox.value = "";
    for (let i = 0; i < wordsPerBox; i++) {
        var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        activeWord += wordDictionary[newWordIndex] + " ";
    }
    activeWord = activeWord.trim();
    correctlyTypedPortion = "";
    remainingToTypePortion = activeWord;
    updateWordDisplay();
}


var wrongLetterTyped = function() {
    if (!mistakeMade){
        playerLives--;
        mistakeMade = true;
        console.log("Lives left: " + playerLives);
        wronglyTypedPortion = remainingToTypePortion[0];
        remainingToTypePortion = remainingToTypePortion.slice(1);
    }
    updateWordDisplay();
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
        chooseNewWords();
        updateScore();
        mainInputBox.focus();
    }
}


var updateScore = function () {
    scoreText.textContent = score;
    livesText.textContent = playerLives;
}



mainInputBox.addEventListener('keyup', checkWordMatched);
beginGameButton.addEventListener('click',beginGame);    chooseNewWords();
updateScore();

mainInputBox.setAttribute('disabled', true);