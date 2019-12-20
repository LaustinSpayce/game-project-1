console.log("Script Loaded!")

var mainInputBox = document.querySelector('#mainInput');
var wordDisplay = document.querySelector('#wordDisplay');
var beginGameButton = document.querySelector('#beginGame');
var scoreText = document.querySelector('#scoreText');
var livesText = document.querySelector('#livesText');

// var wordlistArray = ["wordOne", "wordTwo", "wordThree", "wordFour", "wordFive", "wordSix"];
var activeWord;
var playerLives = 5;
var gameOver = true;
var score = 0;

// console.log(mainInputBox);


var checkWordMatched = function(event) {
    // console.log('no');
    var inputValue = this.value;

    // Check word partially matches what has been typed in so far.
    if (inputValue === activeWord.slice(0, inputValue.length)) {
        // console.log(inputValue + " ok");
    } else {
        console.log(inputValue + " typo!");
        this.value = inputValue.slice(0, inputValue.length - 1);
        wrongLetterTyped();
    }

    // if the input equals the full active word.
    if (inputValue === activeWord) {
        console.log("word matched!");
        this.value = "";
        choosenewWord();
        score++;
        updateScore();
    } else {
        // console.log(inputValue + " is not matched.");
    }
};


var choosenewWord = function () {
    activeWord = "";
    var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
    activeWord = wordDictionary[newWordIndex];
    wordDisplay.textContent = activeWord;
}


var wrongLetterTyped = function() {
    playerLives--;
    console.log("Lives left: " + playerLives);
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
        choosenewWord();
        updateScore();
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