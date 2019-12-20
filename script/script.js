console.log("Script Loaded!")

var mainInputBox = document.querySelector('#mainInput');
var wordDisplay = document.querySelector('#wordDisplay');

// var wordlistArray = ["wordOne", "wordTwo", "wordThree", "wordFour", "wordFive", "wordSix"];
var activeWord;

console.log(mainInputBox);


var checkWordMatched = function(event) {
    // console.log('no');
    var inputValue = this.value;

    if (inputValue === activeWord) {
        console.log("word matched!");
        this.value = "";
        choosenewWord();
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

mainInputBox.addEventListener('keyup', checkWordMatched);
choosenewWord();