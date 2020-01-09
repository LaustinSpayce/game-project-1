# Project Post-Mortem

## Approach and Process

1. What in my process and approach to this project would I do differently next time?
    * I would perhaps consider making my elements more 'generalised' and reusable, thinking about future use cases. I had to jump backwards and refactor quite a lot of code elements because by adding an extra feature, caused a lot of my existing stuff to be rewritten to accommodate the new feature.
    * I think I could take more risks with features, 
    * Get people to help test the project earlier and more often if possible.
    * I will try and avoid getting injured, it makes working the project much harder.

1. What in my process and approach to this project went well that I would repeat next time?
    * I felt that by starting with the absolute bare minimum to get the game "working" worked well.
    * The very first iteration of the game featured just one single word to type in, no lookup in a dictionary. After that, it was a case of adding one single feature, testing that, and then adding one more feature. Small incremental changes helped keep bugs in check (I think!)

--

## Code and Code Design

1. What in my code and program design in the project would I do differently next time?
    * Make everything more modular (DRY) - the code I wrote for selecting a word from the word list is reused in the "boss attacks":
    ```js
    for (let i = 0; i < wordsPerBox; i++) {
        var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        // If the word is too long for the difficulty, keep getting different words until it is short enough.
        while (wordDictionary[newWordIndex].length > maxWordLength) {
            var newWordIndex = Math.floor(Math.random() * wordDictionary.length);
        }
        activeWord += wordDictionary[newWordIndex] + " ";
    }
    activeWord = activeWord.trim();
    ```
    I would split this off as the "boss attacks" have slightly different variants of this code to create new words that are longer.

1. What in my code and program design in the project went well? Is there anything I would do the same next time?
    * Using object methods to give the 'boss attacks' a unique twist on their level.
    ```js
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
    }

## WDI Unit 1 Post Mortem
1. What habits did I use during this unit that helped me?
    * Notes! Writing lots of notes and comments through the code.

2. What habits did I have during this unit that I can improve on?
    * Have more helpful function and variable names. Sometimes they are a bit long winded or inconsistent with other variable/function names. So it can get confusing.
    * Functions -> verbNoun (getPassword, selectHero, hideTimer etc.)
    * bool should read as a question (hasGameStarted, isLevelTwo etc.)

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)
    * Good I think?