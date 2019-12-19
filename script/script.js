console.log("Script Loaded!")

var mainInputBox = document.querySelector('#mainInput');

console.log(mainInputBox);

var doIWinTheGame = function(event) {
    // console.log('no');
    var inputValue = this.value;

    if (inputValue === "winner") {
        alert('You win the game!');
    }
};
mainInputBox.addEventListener('change', doIWinTheGame);