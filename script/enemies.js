var EnemyMonster = function (name, startHP = 10, level = 5, graphic, activeLevel = 0, xpAwarded = 10, isBoss = false) {
    this.name = name;
    this.startHP = startHP;
    this.level = level;
    this.graphic = graphic;
    this.isBoss = isBoss;
    this.activeLevel = activeLevel;
    this.xpAwarded = xpAwarded;
    // The Boss special attack will be triggered with every key press the player makes, if the boss has an attack.
    this.bossSpecialAttack = function () {
        console.log('Boss Special Attack Activated');
        return;
    }
    this.imageObject = new Image();
    this.imageObject.src = graphic;
}

var StageLevel = function (levelName, backgroundImageClass, monsterArray, stageBoss, enemiesBeforeBoss) {
    this.levelName = levelName;
    this.backgroundImageClass = backgroundImageClass;
    this.monsterArray = monsterArray;
    this.stageBoss = stageBoss;
    this.enemiesBeforeBoss = enemiesBeforeBoss;
}

var testMonster1 = new EnemyMonster("testMonster", 20, 10, "img/enemy/furr_walking_monster/idle/skeleton-idle_0.png");
var testMonster2 = new EnemyMonster('Larry', 15, 7, 'img/Soldier/Poses/soldier_cheer1.png');

var level1MonsterArray = [];
var level2MonsterArray = [];
var level3MonsterArray = [];

// Monsters for level 1 (green fields);
var grassLandBat = new EnemyMonster('Bad Bat', 15, 1, "img/enemy/pipo-enemy001.png", 1, 5);
level1MonsterArray.push(grassLandBat);
var angryChicken = new EnemyMonster('Cheeky Chicken', 20, 2, 'img/enemy/pipo-enemy036.png', 1, 5);
level1MonsterArray.push(angryChicken);
var babyChick = new EnemyMonster('Baby Bird', 15, 1, 'img/enemy/pipo-enemy035.png', 1, 5);
level1MonsterArray.push(babyChick);
var littleMouse = new EnemyMonster('Meek Mouse', 20, 2, 'img/enemy/pipo-enemy034.png', 1, 5);
level1MonsterArray.push(littleMouse);
var sheep = new EnemyMonster('Sneaky Sheep', 12, 2, 'img/enemy/pipo-enemy031.png', 1, 5);
level1MonsterArray.push(sheep);
var brazenBear = new EnemyMonster('Brazen Bear', 20, 2, 'img/enemy/pipo-enemy037a.png', 1, 5);
level1MonsterArray.push(brazenBear);
var treeEnemy = new EnemyMonster('Terrifying Tree', 20, 2, 'img/enemy/pipo-enemy006.png', 1, 5);
level1MonsterArray.push(treeEnemy);
var greenImp = new EnemyMonster('Impatient Imp', 22, 3, 'img/enemy/pipo-enemy040a.png', 1, 5);
level1MonsterArray.push(greenImp);
var greenLandBoss = new EnemyMonster('Ghastly Ghoul!', 30, 10, 'img/enemy/pipo-boss001.png', 1, 20, true);

// Special attack for the Green Land Boss:
greenLandBoss.bossSpecialAttack = function () {
    // The boss' "special attack" is to only display the next letter to type.
    // The phrase to type will have all spaces removed soitwillbeonelongword.

    // Hide the regular word display. (When boss dies bring it back)
    if (!wordDisplay.classList.contains('d-none')) {
        wordDisplay.classList.add('d-none');
        specialWordDisplay.textContent = activeWord[0];
    }

    // This boss is difficult so remove the timer.
    if (phraseTimer) {
        console.log('stopping ' + phraseTimer);
        clearTimeout(phraseTimer);
        clearInterval(timeBarTimer);
        phraseTimer = null;
    }

    // Remove all spaces in the current activeWord string.
    activeWord = activeWord.replace(/\s/g, ''); // Regular expression to remove all white space.
    specialWordDisplay.textContent = activeWord[correctlyTypedPortion.length];
    // console.log('Green Land Boss Attack!');
    // return;
}

// Monsters for level 2 (Desert):
var sneakySnakeEnemy = new EnemyMonster('Sneaky Snake', 20, 5, "img/enemy/pipo-enemy003.png", 2, 10, );
level2MonsterArray.push(sneakySnakeEnemy);
var scarabBeetleEnemy = new EnemyMonster('Beastly Beetle', 25, 5, 'img/enemy/pipo-enemy004.png', 2, 10);
level2MonsterArray.push(scarabBeetleEnemy);
var creepyWorm = new EnemyMonster('Worried Worm', 15, 5, "img/enemy/pipo-enemy005a.png", 2, 10);
level2MonsterArray.push(creepyWorm);
var cuteBlob = new EnemyMonster('Cute Blob', 15, 5, 'img/enemy/pipo-enemy009a.png', 2, 10);
level2MonsterArray.push(cuteBlob);
var salamanderEnemy = new EnemyMonster('Suspicious Salamander', 20, 8, 'img/enemy/pipo-enemy016.png', 2, 10);
level2MonsterArray.push(salamanderEnemy);
var griffinEnemy = new EnemyMonster('Gorgeous Griffin', 25, 6, 'img/enemy/pipo-enemy022.png', 2, 10);
level2MonsterArray.push(griffinEnemy);
var scorpionEnemy = new EnemyMonster('Scorching Scorpion', 25, 8, 'img/enemy/pipo-enemy028b.png', 2, 10);
level2MonsterArray.push(scorpionEnemy);
var pussInBoots = new EnemyMonster('Puss in Boots', 30, 9, 'img/enemy/pipo-enemy041b.png', 2, 10);
level2MonsterArray.push(pussInBoots);
var desertLandBoss = new EnemyMonster('Naughty Necromancer!', 35, 12, 'img/enemy/pipo-boss002.png', 2, 20, true);

// Special Attack for the Desert Land Boss.
// Add one extra word to the end of the string for player to type.
desertLandBoss.bossSpecialAttack = function () {
    if (bossSpecialUsed) {
        return;
    }

    // wait until the player has typed a few letters before adding the word.
    if (correctlyTypedPortion.length >= (activeWord.length / 2)) {
        var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        while (wordDictionary[newWordIndex].length > maxWordLength) {
            var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        }
        activeWord += " " + wordDictionary[newWordIndex];
        activeWord = activeWord.trim();
        updateWordDisplay();
        // ** The animation doesn't appear to be working as-is. ***
        wordDisplay.classList.add('animated', 'bounce');
        // console.log('bounce!');
        var wordDisplayReset = setTimeout(function () {
            wordDisplay.classList.remove('animated', 'bounce');
        }, 1000);
        bossSpecialUsed = true;
        // console.log('Add an extra word.');
        return;
    }
}

// Monsters for level 3 (Cave):
var knightEnemy = new EnemyMonster('Silent Knight', 30, 13, 'img/enemy/pipo-enemy018.png', 3, 15);
level3MonsterArray.push(knightEnemy);
var mushroomEnemy = new EnemyMonster('Mad Mushroom', 30, 15, 'img/enemy/pipo-enemy008b.png', 3, 15);
level3MonsterArray.push(mushroomEnemy);
var ghoulishGhost = new EnemyMonster('Ghoulish Ghost', 35, 12, 'img/enemy/pipo-enemy010.png', 3, 15);
level3MonsterArray.push(ghoulishGhost);
var depressedZombie = new EnemyMonster('Depressed Zombie', 35, 16, 'img/enemy/pipo-enemy011.png', 3, 15);
level3MonsterArray.push(depressedZombie);
var fireElemental = new EnemyMonster('Fire Elemental', 32, 14, 'img/enemy/pipo-enemy012.png', 3, 15);
level3MonsterArray.push(fireElemental);
var forumTroll = new EnemyMonster('Forum Troll', 37, 17, 'img/enemy/pipo-enemy013a.png', 3, 15);
level3MonsterArray.push(forumTroll);
var angryTroll = new EnemyMonster('Angry Cave Troll', 35, 17, 'img/enemy/pipo-enemy019.png', 3, 15);
level3MonsterArray.push(angryTroll);
var dangerousDragon = new EnemyMonster('Dangerous Dragon', 32, 14, 'img/enemy/pipo-enemy021a.png', 3, 15);
level3MonsterArray.push(dangerousDragon);
var spookySpider = new EnemyMonster('Spooky Spider', 25, 12, 'img/enemy/pipo-enemy027.png', 3, 15);
level3MonsterArray.push(spookySpider);
var mimicMonster = new EnemyMonster('Mimic', 32, 13, 'img/enemy/pipo-enemy032.png', 3, 15);
level3MonsterArray.push(mimicMonster);
var spoopySkeleton = new EnemyMonster('Spoopy Skeleton', 32, 16, 'img/enemy/pipo-enemy039.png', 3, 15);
level3MonsterArray.push(spoopySkeleton);
var caveBoss = new EnemyMonster('Swole Dragon', 50, 55, 'img/enemy/pipo-boss004.png', 3, 50, true);

// Cave Boss Special Attack:
// CHANGE the final word in the string to a different word.
caveBoss.bossSpecialAttack = function () {

    if (bossSpecialUsed) {
        return;
    }
    // Split the active phrase into an array of words.
    var activeWordArray = activeWord.split(" ");

    // If only 1 word, add a second word (any length to make it harder).
    if (activeWordArray.length === 1) {
        if (correctlyTypedPortion.length >= (activeWord.length / 2)) {
            var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
            activeWord += " " + wordDictionary[newWordIndex];
            activeWord = activeWord.trim();
            updateWordDisplay();
            wordDisplay.classList.add('animated', 'bounce', 'bg-info');
            // console.log('bounce!');
            var wordDisplayReset = setTimeout(function () {
                wordDisplay.classList.remove('animated', 'bounce', 'bg-info');
            }, 1000);
            bossSpecialUsed = true;
        }
        return;
    }

    // If 2+ words, partway through, change the final word to another word.

    // Create a word array less the final word, which will be changed.
    var activeStringLessFinalWord = "";
    for (let i = 0; i < (activeWordArray.length - 1); i++) {
        activeStringLessFinalWord += activeWordArray[i] + " ";
    }

    // Create one word and swap it for the final word in the string.
    if (correctlyTypedPortion.length >= ((3 * activeStringLessFinalWord.length) / 4)) {
        var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        while (wordDictionary[newWordIndex].length > maxWordLength) {
            var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        }
        activeStringLessFinalWord += wordDictionary[newWordIndex];
        activeWord = activeStringLessFinalWord.trim();
        updateWordDisplay();
        wordDisplay.classList.add('animated', 'bounce', 'bg-info');
        // console.log('bounce!');
        var wordDisplayReset = setTimeout(function () {
            wordDisplay.classList.remove('animated', 'bounce', 'bg-info');
        }, 1000);
        bossSpecialUsed = true;
        // console.log('Add an extra word.');
        return;
    }
}


function randomiseArrayOrder(array) {
    // Shuffle the cards
    // Using Fisher-Yates Algorithm from
    // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


// Might as well shuffle them now as well as later.
randomiseArrayOrder(level1MonsterArray);
randomiseArrayOrder(level2MonsterArray);
randomiseArrayOrder(level3MonsterArray);


// Create the levels as objects.
var greenFieldsLevel = new StageLevel("Green Fields", 'battle-background-forest', level1MonsterArray, greenLandBoss, 3);
var dustyDesertLevel = new StageLevel("Dusty Desert", 'battle-background-desert', level2MonsterArray, desertLandBoss, 4);
var creepyCavesLevel = new StageLevel("Creepy Caves", 'battle-background-cave', level3MonsterArray, caveBoss, 5);


// Levels stored in one array.
var gameStagesArray = [greenFieldsLevel, dustyDesertLevel, creepyCavesLevel];