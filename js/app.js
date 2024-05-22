/*-------------------------------- Constants --------------------------------*/

const winningWord = ['O', 'R', 'A', 'N', 'G', 'E'];

const maxMistakes = 4;

/*-------------------------------- Variables --------------------------------*/

let guessedLetters = [];

let targetWord = ['', '', '', '', '', ''];

let mistakes = 0;

let winner = false;

/*------------------------ Cached Element References ------------------------*/

const guessedButtonsEl = document.querySelectorAll(".guessed-letters button");
// console.dir(guessedButtonsEl);

const resultDisplayEl = document.querySelector("#results-display");
// console.log(resultDisplayEl);

const targetEls = document.querySelectorAll(".target");
// console.log(targetEl);

const resetBtnEl = document.querySelector(".reset");
// console.log(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  guessedLetters = [];
  targetWord = ['', '', '', '', '', ''];
  mistakes = 0;
  winner = false;
  guessedButtonsEl.forEach(button => button.disabled = false);
  updateTargetWord();
  updateMessage();
  render();
};

const render = () => {
  updateTargetWord();
};

const updateMessage = () => {
  if (winner) {
    resultDisplayEl.textContent = 'Congratulations! You Won!';
  } else if (mistakes >= maxMistakes) {
    resultDisplayEl.textContent = 'Sorry! You lost! The word was ' + winningWord.join('');
  } else {
    resultDisplayEl.textContent = `Mistakes: ${mistakes}/${maxMistakes}`;
  }
};

const updateTargetWord = () => {
  targetEls.forEach((targetEl, idx) => {
    targetEl.textContent = targetWord[idx];
  })
};


const handleGuessedLetters = (event) => {
    const guessedButton = event.target.closest('button');
    const guessedLetter = guessedButton.textContent;

    if (!guessedLetters.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);

      if (winningWord.includes(guessedLetter)) {
      correctGuess(guessedLetter);
      updateTargetWord();
      } else {
        incorrectGuess();
      }

      disableButton(guessedButton);
      checkForWinner();
    }
    };

const correctGuess = (guessedLetter) => {
  winningWord.forEach((letter,idx) => {
    if(letter === guessedLetter) {
      targetWord[idx] = guessedLetter;
    }
  })
};

const incorrectGuess = () => {
  mistakes++;
  //update Foodman logic
};

const disableButton = (button) => {
  button.disabled = true;
};

const checkForWinner = () => {
  if(targetWord.join('') === winningWord.join('')) {
    winner = true;
  }
  updateMessage();
  render();
};









init();
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("click", handleGuessedLetters);

resetBtnEl.addEventListener('click', init);
