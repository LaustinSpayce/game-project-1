console.log("Script Loaded!")

// Gameplay UI
var gameplayMainContainer = document.querySelector('#gameplayMainContainer');
var mainInputBox = document.querySelector('#mainInput');
var wordDisplay = document.querySelector('#wordDisplay');
var specialWordDisplay = document.querySelector('#specialWordDisplay');
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
var playerXPBar = document.querySelector('#playerXPBar');

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
// time to type the phrase in ms.
var timeToTypePhrase = 5000;
var phraseTimer;

var playerLevel = 1;
var playerXPToNextLevel = playerLevel * 10;
var playerTotalXP = 0;
var playerHealthGainedPerLevel = 5;

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
var enemyXP = 0;
var bossSpecialUsed = false;

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
        stopPhraseTimer();
        this.value = "";
        bossSpecialUsed = false; // Reset the boss special attack when the word is matched.
        damageEnemy();
        updateScore();
        chooseNewWords();
    }

    if (bossFight) {
        activeGameStage.stageBoss.bossSpecialAttack();
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
    specialWordDisplay.textContent = "";
    updateHP();
    updateWordDisplay();
    updateEnemyHP();
    updateEnemyDetails();
    startPhraseTimer();
    // if it's a boss fight let the boss do their trick first.
    if (bossFight) {
        activeGameStage.stageBoss.bossSpecialAttack();
    }
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
    if (gameOver) {
        stopPhraseTimer();
        return;
    }
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


var startPhraseTimer = function () {
    if (phraseTimer) {
        console.log('Force stopping timer ' + phraseTimer);
        clearTimeout(phraseTimer);
        phraseTimer = null;
    }
    phraseTimer = setTimeout(ranOutOfTime, timeToTypePhrase);
    console.log('Starting ' + phraseTimer);
}


var stopPhraseTimer = function () {
    console.log('stopping ' + phraseTimer);
    if (phraseTimer) {
    clearTimeout(phraseTimer);
    phraseTimer = null;
    }
}


var ranOutOfTime = function () {
    if (!phraseTimer) {
        return;
    }
    phraseTimer = null;
    mistakeMade = false;
    wrongLetterTyped();
    console.log('Ran out of time, making new phrase');
    wronglyTypedPortion = "";
    if (playerHP > 0 && !gameOver) {
    chooseNewWords();
    }
}


// End the game if the player loses all lives.
var checkGameOver = function () {
    updateScore();
    if (playerHP <= 0) {
        stopPhraseTimer();
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
        console.log('game begin');
        mainInputBox.removeAttribute('disabled');
        wronglyTypedPortion = "";
        wronglyTypedDisplay.textContent = wronglyTypedPortion;
        toggleContainerVisibility(heroSelectScreen);
        toggleContainerVisibility(gameplayMainContainer);
        beginNewStage();
        updateXPBar();
    }
}


var checkIfGameWon = function () {
    if (!gameStagesArray[activeGameStageIndex]) {
        alert('You win! Game over!');
        stopPhraseTimer();
        return true;
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
    enemyXP = enemyInput.xpAwarded
    updateEnemyDetails();
    updateEnemyHP();
}


var beginNewStage = function () {
    activeGameStage = gameStagesArray[activeGameStageIndex];
    activeMonsterArray = activeGameStage.monsterArray;
    gameplayMainContainer.classList.add(activeGameStage.backgroundImageClass);
    randomiseArrayOrder(activeMonsterArray);
    enemiesDefeated = 0;
    playerHP = playerMaxHP;
    selectNextEnemy();
    stopPhraseTimer();
    chooseNewWords();
    updateScore();
    mainInputBox.focus();
}


var selectNextEnemy = function () {
    if (bossFight) {
        console.log('Onto the next stage');
        bossFight = false;
        gameplayMainContainer.classList.remove(activeGameStage.backgroundImageClass);
        activeGameStageIndex++;
        // un-hide the word Display if it's hidden
        if (wordDisplay.classList.contains('d-none')) {
            wordDisplay.classList.remove('d-none');
            specialWordDisplay.textContent = "";
        }
        if (checkIfGameWon()) {
            return;
        }
        beginNewStage();
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
    // console.log(damageDealt + " damage! Oof Ow Socko!");
    enemyHP -= damageDealt;
    enemyHP = (enemyHP < 0) ? 0 : enemyHP; // if HP is less than 0 set it to 0.
    damageTextAppear(damageDealt, enemyDamageText);
    if (enemyHP <= 0) {
        // console.log(activeEnemyName + ' slain!');
        // alert('You have defeated ' + activeEnemyName);
        // gameOver = true;
        // mainInputBox.setAttribute('disabled', true);
        enemiesDefeated++;
        earnExperiencePoints(enemyXP);
        selectNextEnemy();
    }
    updateEnemyHP();
}


var damageTextAppear = function (damage, targetBox) {
    targetBox.textContent = damage;
    targetBox.classList.add('animated', 'bounce');
    var damageTextBoxReset = setTimeout(function () {
        targetBox.textContent = "";
        targetBox.classList.remove('animated', 'bounce');
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
            phraseTimer = 5000; // 5 second timer.
            break;
        case 'chooseWarrior':
            wordsPerBox = 2;
            maxWordLength = 7;
            playerImage.src = warriorImage;
            phraseTimer = 10000; // 10 second timer.
            break;
        case 'chooseWizard':
            wordsPerBox = 3;
            maxWordLength = 10;
            playerImage.src = wizardImage;
            phraseTimer = 15000; // 15 second timer.
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
    pageElement.classList.toggle('d-none');
    // if (pageElement.classList.contains('d-none')) {
    //     pageElement.classList.remove('d-none');
    // } else {
    //     pageElement.classList.add('d-none'); 
    // }
}


var hitEnterToBeginGame = function () {
    if (checkIfCanStartGame()) {
        beginGame();
    }
}


// XP System:
// Start at level 1.
// 1->2: 10XP
// 2->3: 20XP
// 3->4: 30XP and so on...

var earnExperiencePoints = function (xpEarned) {
    playerTotalXP += xpEarned;
    while (playerTotalXP >= playerXPToNextLevel) {
        playerLevelUp();
    }
    updateXPBar();
}


var playerLevelUp = function () {
    playerLevel++;
    playerMaxHP += playerHealthGainedPerLevel;
    playerHP = playerMaxHP;
    updateHP();
    playerXPToNextLevel += (playerLevel * 10)
    updateXPBar();
    // TODO: RESET HEALTH
    // TODO: Play animation + sound effect for levelling up.
}


var updateXPBar = function () {
    playerLevelText.textContent = "Level " + playerLevel;
    // TODO: Update an XP progress bar undernearth the player's stats.
    var ExperiencePercentage = Math.floor((playerTotalXP / playerXPToNextLevel) * 100);
    playerXPBar.style.width = ExperiencePercentage + "%";
}


// Cheat function to skip to the boss fight of that level.
var cheatSkipToBossFight = function () {
    enemiesDefeated = activeGameStage.enemiesBeforeBoss;
    bossFight = true;
    setActiveEnemy(activeGameStage.stageBoss);
}


// Cheat function to skip the current enemy.
var cheatDefeatCurrentEnemy = function () {
    enemyHP = 0;
    enemiesDefeated++;
    earnExperiencePoints(enemyXP);
    selectNextEnemy();
    updateEnemyHP();
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