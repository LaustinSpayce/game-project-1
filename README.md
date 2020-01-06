# Typing Battle Game
A WIP typing battle RPG game.

## Description
A typing game for General Assembley SEI 21, project 1.

## Gameplay (current)
After you 'begin game' a 1, 2 or 3 word phrase will appear.

Type the phrase in to score a point.
Make a mistake or typo to lose a life.

If you make consecutive mistakes without a correct character being typed in, you won't lose more than 1 life.

## Features implemented
* Simple player "classes" (difficulty):
    * Point 'n' Click Adventurer (easy 1 short word)
    * Keyboard Warrior (medium 2 medium words)
    * Netcodemancer (hard 3 any words)
* Each successful phrase completed is an "attack".
* Levels to go through:
    * Grassy Field
    * Dusty Desert
    * Creepy Caves
* Some light RPG-style levelling up and damage progression.
* Special boss attacks/features for the three bosses.
* Simple animations
* A randomised or semi-random group of enemies to attack (just name and maybe HP level changes:)

## Features to implement
* Each mistake locks the player as the monster "attacks".
* Add sound effects and maybe music.
* make it more obvious that it's a typing game

## Bugs to fix
* prompt user if hero or name needs filling in
* easy mode too difficult - have difficulty ramp up over time
* "and it does weird things when switching level, like letting you type briefly and the timer still going down"
    * the next level starts and you can type and the timer is doing it's thing, then it putting the heading up over it and resets.
* cannot return to hero select after game over.
* have a default difficulty and name put in so can just enter the game immediately.
    * you could make up/down arrow switch difficulty from within the name box?
    * Yeah a default. I think having “Player1” as a default name too will help save the lazy people.
    * or just put arrow left or right of it?
* preload images
* I found out what is going on with the enter key not working
    * if you type your name, hit enter and it doesn't work, then select difficulty, if you click back into the name box and hit enter it won't do anything
    * So o need to redo it that it’ll listen for the enter key on the text box instead of listening for a “changed” text box.


## Game Assets
* www.kenney.nl
* bevouliin.com
* pipoya - https://itch.io/profile/pipoya
* craftpix.net
* Animate.css - https://daneden.github.io/animate.css/
