class mainClass {
  constructor() {
    // All the elements/variables
    this.gameOn = document.querySelector('.game-on-state');
    this.gameOver = document.querySelector('.game-over-state');
    this.difficiulty = document.querySelector('.difficiulty');
    this.time = document.querySelector('.time-left');
    this.score = document.querySelector('.score');
    this.youScored = document.querySelector('.scored');
    this.word = document.querySelector('.word-to-type');
    this.inputField = document.querySelector('.input-txt');
    this.playAgainBtn = document.querySelector('.play-again');

    // Used to hold the total time
    this.totalTime = 10;

    // Used to hold the random word
    this.randWord;

    // Used to determine if the game has started or not
    this.gameStarted = false;

    // All the Words
    this.words = [
      'sigh',
      'tense',
      'airplane',
      'ball',
      'pies',
      'juice',
      'warlike',
      'bad',
      'north',
      'dependent',
      'steer',
      'silver',
      'highfalutin',
      'superficial',
      'quince',
      'eight',
      'feeble',
      'admit',
      'drag',
      'loving',
    ];
  }

  // All the Methods/Functions
  // Generate the random word
  generateWord() {
    let randNum = parseInt(Math.random() * 20);
    this.randWord = this.words[randNum];
    // Set the word in the field
    this.word.textContent = this.randWord;
  }

  // Timer Function
  timer() {
    let timeInterval = setInterval(() => {
      this.totalTime--;
      this.time.textContent = this.totalTime;
      // If user runs out of time then do the following
      if (this.totalTime === 0) {
        clearInterval(timeInterval);
        // Change the state to gameOver State
        this.changePageState('gameOver');
      }
    }, 1000);
  }

  // Increase the time based on the difficiulty
  increaseTime() {
    if (this.difficiulty.value === 'easy') {
      this.totalTime += 5;
    } else if (this.difficiulty.value === 'medium') {
      this.totalTime += 3;
    } else if (this.difficiulty.value === 'hard') {
      this.totalTime += 2;
    }
  }

  // Update the Score function
  updateScore() {
    let currentSocre = this.score.textContent;
    currentSocre = parseInt(currentSocre);
    currentSocre++;
    this.score.textContent = currentSocre;
  }

  // Check the input
  checkInput() {
    // Get the input
    let input = this.inputField.value;
    // Compare the input to the random Word
    if (input === this.randWord) {
      // Increase time
      this.increaseTime();
      // Update the Score
      this.updateScore();
      // Generate new word
      this.generateWord();
      // Clear the input field
      this.inputField.value = '';
    }
  }

  // Change the page state based on the argument
  changePageState(state) {
    if (state === 'gameOn') {
      // Hide the gameOver State
      this.gameOver.style.display = 'none';
      // Display the gameOn State
      this.gameOn.style.display = 'block';
      // Reset the score back to zero
      this.score.textContent = '0';
      // Reset the timer back to 10
      this.totalTime = 10;
      // Reset the value at the time field
      this.time.textContent = '10';
      // Reset the value because the game hasn't started yet
      this.gameStarted = false;
      // Clear the input field
      this.inputField.value = '';
    } else if (state === 'gameOver') {
      // Hide the gameOn State
      this.gameOn.style.display = 'none';
      // Display the gameOver state
      this.gameOver.style.display = 'block';
      // Display the score
      this.youScored.textContent = this.score.textContent;
    }
  }
}

// New Object
const gameClass = new mainClass();

// Generate the word
gameClass.generateWord();

/* When the starts typing then start the timer and check the 
input */
gameClass.inputField.addEventListener('keyup', () => {
  /* If the game hasn't started then start the timer.
  Initially the value of 'gameStarted' = false' */
  if (!gameClass.gameStarted) {
    gameClass.timer();
    /* The game has started so, set the value of gameStarted = true */
    gameClass.gameStarted = true;
  }
  gameClass.checkInput();
});

// Event Listener on the PlayAgain button
gameClass.playAgainBtn.addEventListener('click', () => {
  gameClass.changePageState('gameOn');
});
