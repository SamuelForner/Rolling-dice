'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0]; // total score of both player, player 1 is scores[0] and player 2 is score[1]
  currentScore = 0;
  activePlayer = 0; // Which player is playing, starting with player 1
  playing = true; // state variable : we are playing as long as no one wins

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switch player functionnality
const switchPlayer = () => {
  // 1.Switch to other player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // 2.Toggle will check if the active player has player--active classLit. If it has, it will remove it, if it has not it will add it (and then add the background color)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice functionnality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generate random number between 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for dice equal to 1
    if (dice !== 1) {
      // If not, add dice number to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If yes
      switchPlayer();
    }
  }
});

// Hold button functionnality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if the active player score >=100
    //  if so finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //  if not switch player
      switchPlayer();
    }
  }
});

// New game button functionnality
btnNew.addEventListener('click', init);
