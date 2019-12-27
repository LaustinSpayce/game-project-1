console.log("Script Loaded!")

// Gameplay UI
var gameplayMainContainer = document.querySelector('#gameplayMainContainer');
var mainInputBox = document.querySelector('#mainInput');
var wordDisplay = document.querySelector('#wordDisplay');
var correctlyTypedDisplay = document.querySelector('#correctlyTypedPortion');
var wronglyTypedDisplay = document.querySelector('#wronglyTypedPortion');
var completeWordHint = document.querySelector('#completeWord');
var newEnemyButton = document.querySelector('#summonNewEnemy');
var scoreText = document.querySelector('#scoreText');
var livesText = document.querySelector('#livesText');

// Player UI Elements
var playerNameText = document.querySelector('#playerName');
var playerLevelText = document.querySelector('#playerLevel');
var playerHealthBar = document.querySelector('#playerHealthBar');
var playerHPText = document.querySelector('#playerHP');
var playerMaxHPText = document.querySelector('#playerMaxHP');
var playerDamageText = document.querySelector('#playerDamageText');
var playerImage = document.querySelector('#playerImage');

// Enemy UI Elements
var enemyNameText = document.querySelector('#enemyName');
var enemyLevelText = document.querySelector('#enemyLevel');
var enemyHealthBar = document.querySelector('#enemyHealthBar');
var enemyHPText = document.querySelector('#enemyHP');
var enemyMaxHPText = document.querySelector('#enemyMaxHP');
var enemyDamageText = document.querySelector('#enemyDamageText');
var enemyImage = document.querySelector('#enemyImage');

// Options Menu / character selection
var heroSelection = document.querySelector('#heroSelection');
var chooseAdventurer = document.querySelector('#chooseAdventurer');
var chooseWarrior = document.querySelector('#chooseWarrior');
var chooseWizard = document.querySelector('#chooseWizard');
var chooseClassArray = document.querySelectorAll('.choose-your-hero');
var heroSelectScreen = document.querySelector('#heroSelectScreen');
var playerNameInput = document.querySelector('#playerNameInput');
var beginGameButton = document.querySelector('#beginGame');

// Global variables
var playerName = "playerName";
var playerLevel = 1;
var playerMaxHP = 5;
var playerHP = 5;
var gameOver = true;
var score = 0;
var mistakeMade = false
var wordsPerBox = 0;
var enemiesDefeated = 0;
var enemiesToReachBossBattle = 3;
var playerBaseDamage = 5;
var playerDamageMultiplier = 2;
var maxWordLength = 10;
var adventurerImage = 'img/playerCharacter/Elf-idle-00.png';
var warriorImage = 'img/playerCharacter/knight-idle-00.png';
var wizardImage = 'img/playerCharacter/witch-idle-00.png';

// Game levels 1-3, 0 - Grass, 1 - Desert, 2 - Dungeon.
var activeGameStageIndex = 0;
var activeGameStage = gameStagesArray[activeGameStageIndex];
var activeMonsterArray = activeGameStage.monsterArray;

// Variables for the current word challenge to type.
var activeWord;
var correctlyTypedPortion = "";
var wronglyTypedPortion = "";
var remainingToTypePortion = "";

// Enemy details
var activeEnemyName = "Terry";
var activeEnemyLevel = 5;
var enemyHP = 5;
var enemyMaxHP = 5;
var enemyDamage = 1;
var bossFight = false;


// Checks the input box against the word/phrase.
var checkWordMatched = function (event) {
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


    // if the input equals the full active phrase.
    if (inputValue === activeWord) {
        console.log("word matched!");
        this.value = "";
        damageEnemy();
        updateScore();
        if (enemyHP <= 0) {
            // console.log(activeEnemyName + ' slain!');
            // alert('You have defeated ' + activeEnemyName);
            // gameOver = true;
            // mainInputBox.setAttribute('disabled', true);
            enemiesDefeated++;
            selectNextEnemy();
        }
        chooseNewWords();
    }
};


// One function updates the word display to the player.
var updateWordDisplay = function () {
    correctlyTypedDisplay.textContent = correctlyTypedPortion;
    wordDisplay.textContent = remainingToTypePortion;
    wronglyTypedDisplay.textContent = wronglyTypedPortion;
    completeWordHint.textContent = activeWord;
}


// Choose new words according to the difficulty.
var chooseNewWords = function () {
    activeWord = "";
    mainInputBox.value = "";
    for (let i = 0; i < wordsPerBox; i++) {
        var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        // If the word is too long for the difficulty, keep getting different words until it is short enough.
        while (wordDictionary[newWordIndex].length > maxWordLength) {
            var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        }
        activeWord += wordDictionary[newWordIndex] + " ";
    }
    activeWord = activeWord.trim();
    correctlyTypedPortion = "";
    remainingToTypePortion = activeWord;
    updateHP();
    updateWordDisplay();
    updateEnemyHP();
    updateEnemyDetails();
}


// Clear words typed and displayed.
var clearWords = function () {
    activeWord = "";
    correctlyTypedPortion = "";
    remainingToTypePortion = "";
    wronglyTypedPortion = "";
    updateWordDisplay();
}


// If an incorrect letter is typed. Only applies a penalty for the first mistake.
// Subequent consecutive mistakes don't incur an extra penalty.
var wrongLetterTyped = function () {
    if (!mistakeMade) {
        // TODO: Freeze the game input
        // Have the enemy swipe the player.
        // Then deduct the HP.
        console.log('Enemy attack animation.');
        playerHP -= enemyDamage; // TODO: Have some small randomisation
        damageTextAppear(enemyDamage, playerDamageText);
        mistakeMade = true;
        console.log("HP left " + playerHP + " / " + playerMaxHP);
        wronglyTypedPortion = remainingToTypePortion[0];
        remainingToTypePortion = remainingToTypePortion.slice(1);
        updateHP();
    }
    updateWordDisplay();
    checkGameOver();
}


// End the game if the player loses all lives.
var checkGameOver = function () {
    updateScore();
    if (playerHP <= 0) {
        console.log('game over')
        gameOver = true;
        mainInputBox.setAttribute('disabled', true);
        toggleContainerVisibility(heroSelectScreen);
        toggleContainerVisibility(gameplayMainContainer);
    }
}


var beginGame = function () {
    console.log('clicked');
    if (playerNameInput.value.trim().length === 0) {
        alert('please type in your character name');
        return;
    }
    if (!wordsPerBox) {
        alert('please pick your hero');
        return;
    }
    if (gameOver) {
        playerName = playerNameInput.value.trim().slice(0, 16);
        playerNameText.textContent = playerName;
        playerDamageText.textContent = "";
        enemyDamageText.textContent = "";
        score = 0;
        playerHP = 5;
        enemyHP = enemyMaxHP;
        console.log('game begin');
        mainInputBox.removeAttribute('disabled');
        wronglyTypedPortion = "";
        wronglyTypedDisplay.textContent = wronglyTypedPortion;
        randomiseArrayOrder(activeMonsterArray);
        toggleContainerVisibility(heroSelectScreen);
        toggleContainerVisibility(gameplayMainContainer);
        selectNextEnemy();
        chooseNewWords();
        updateScore();
        mainInputBox.focus();
    }
}


// Update the scores.
var updateScore = function () {
    scoreText.textContent = score;
    livesText.textContent = playerHP;
}


var updateHP = function () {
    playerHPText.textContent = playerHP;
    playerMaxHPText.textContent = playerMaxHP;
    var healthPercentage = Math.floor((playerHP / playerMaxHP) * 100);
    playerHealthBar.style.width = healthPercentage + "%";
}


var updateEnemyHP = function () {
    enemyHPText.textContent = enemyHP;
    enemyMaxHPText.textContent = enemyMaxHP;
    var healthPercentage = Math.floor((enemyHP / enemyMaxHP) * 100);
    enemyHealthBar.style.width = healthPercentage + "%";
}

var updateEnemyDetails = function () {
    enemyNameText.textContent = activeEnemyName;
    enemyLevelText.textContent = "Level " + activeEnemyLevel;
}


var setActiveEnemy = function (enemyInput) {
    activeEnemyName = enemyInput.name;
    activeEnemyLevel = enemyInput.level;
    enemyMaxHP = enemyInput.startHP;
    enemyHP = enemyInput.startHP;
    var enemyGraphic = enemyInput.graphic;
    enemyImage.src = enemyGraphic;
    updateEnemyDetails();
    updateEnemyHP();
}


var selectNextEnemy = function () {
    if (bossFight) {
        console.log('Onto the next stage');
        bossFight = false;
        activeGameStageIndex++;
        activeGameStage = gameStagesArray[activeGameStageIndex];
        activeMonsterArray = activeGameStage.monsterArray;
        enemiesDefeated = 0;
        // TODO: Change background.
        return;
    }
    if (enemiesDefeated >= activeGameStage.enemiesBeforeBoss) {
        bossFight = true;
        setActiveEnemy(activeGameStage.stageBoss);
    } else {
        setActiveEnemy(activeMonsterArray[enemiesDefeated]);
    }
}


var damageEnemy = function () {
    // 5 points base damage + 1 point per level + 1-5 random points.
    var damageDealt = playerBaseDamage + (playerLevel * playerDamageMultiplier) + Math.floor(Math.random() * playerBaseDamage);
    console.log(damageDealt + " damage! Oof Ow Socko!");
    enemyHP -= damageDealt;
    enemyHP = (enemyHP < 0) ? 0 : enemyHP; // if HP is less than 0 set it to 0.
    damageTextAppear(damageDealt, enemyDamageText);
    updateEnemyHP();
}


var damageTextAppear = function (damage, targetBox) {
    targetBox.textContent = damage;
    var damageTextBoxReset = setTimeout(function () {
        targetBox.textContent = "";
    }, 1000);
}


var heroSelection = function () {
    // console.log('Hero clicked ' + this.id);
    for (let i = 0; i < chooseClassArray.length; i++) {
        chooseClassArray[i].classList.remove('hero-selected');
    }
    this.classList.add('hero-selected');
    switch (this.id) {
        case 'chooseAdventurer':
            wordsPerBox = 1;
            maxWordLength = 5;
            playerImage.src = adventurerImage;
            break;
        case 'chooseWarrior':
            wordsPerBox = 2;
            maxWordLength = 7;
            playerImage.src = warriorImage;
            break;
        case 'chooseWizard':
            wordsPerBox = 3;
            maxWordLength = 10;
            playerImage.src = wizardImage;
            break;
        default:
            console.log('Something went wrong selecting the hero');
    }
    checkIfCanStartGame();
}


var checkIfCanStartGame = function () {
    playerName = playerNameInput.value.trim().slice(0, 16);
    if (playerName.length > 0 && wordsPerBox > 0) {
        beginGameButton.removeAttribute('disabled');
        return true;
    } else {
        beginGameButton.setAttribute('disabled', true);
        return false;
    }
}


var toggleContainerVisibility = function (pageElement) {
    if (pageElement.classList.contains('d-none')) {
        pageElement.classList.remove('d-none');
    } else {
        pageElement.classList.add('d-none');
    }
}


var hitEnterToBeginGame = function () {
    if (checkIfCanStartGame()) {
        beginGame();
    }
}


// Add event listeners to everything, has to be below the function declarations.
mainInputBox.addEventListener('keyup', checkWordMatched);
beginGameButton.addEventListener('click', beginGame);
chooseAdventurer.addEventListener('click', heroSelection);
chooseWarrior.addEventListener('click', heroSelection);
chooseWizard.addEventListener('click', heroSelection);
playerNameInput.addEventListener('keyup', checkIfCanStartGame);
playerNameInput.addEventListener('change', hitEnterToBeginGame);


// Assign names and levels to player:
playerNameText.textContent = playerName;
playerLevelText.textContent = "Level " + playerLevel;
enemyNameText.textContent = activeEnemyName;
enemyLevelText.textContent = "Level " + activeEnemyLevel;


// Disable the input box if the game is not running.
mainInputBox.setAttribute('disabled', true);
beginGameButton.setAttribute('disabled', true);