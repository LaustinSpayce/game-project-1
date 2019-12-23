var EnemyMonster = function (name, startHP=10, level=5, graphic, activeLevel=0, isBoss=false,) {
    this.name = name;
    this.startHP = startHP;
    this.level = level;
    this.graphic = graphic;
    this.isBoss = isBoss;
    this.activeLevel = activeLevel;
}

var testMonster1 = new EnemyMonster("testMonster", 20, 10, "img/enemy/furr_walking_monster/idle/skeleton-idle_0.png");
var testMonster2 = new EnemyMonster('Larry', 15, 7, 'img/Soldier/Poses/soldier_cheer1.png');

var level1MonsterArray = [];
var level2MonsterArray = [];
var level3MonsterArray = [];


// Monsters for level 1 (green fields);
var grassLandBat = new EnemyMonster('Bad Bat', 5, 1, "img/enemy/pipo-enemy001.png", 1);
level1MonsterArray.push(grassLandBat);
var angryChicken = new EnemyMonster('Angry chicken', 7, 2, 'img/enemy/pipo-enemy036.png', 1);
level1MonsterArray.push(angryChicken);
var babyChick = new EnemyMonster('Baby Chick', 2, 1, 'img/enemy/pipo-enemy035.png', 1);
level1MonsterArray.push(babyChick);
var littleMouse = new EnemyMonster('Harmless Mouse', 4, 2, 'img/enemy/pipo-enemy034.png', 1);
level1MonsterArray.push(littleMouse);
var sheep = new EnemyMonster('Sheep', 5, 2, 'img/enemy/pipo-enemy031.png', 1);
level1MonsterArray.push(sheep);
var knightEnemy = new EnemyMonster('Silent Knight', 7, 3, 'img/enemy/pipo-enemy018.png', 1);
level1MonsterArray.push(knightEnemy);



// Monsters for level 2 (Desert):


// Monsters for level 3 (Dungeon):


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
