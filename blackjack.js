const blackjackDeck = getDeck();

console.log(blackjackDeck);

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    drawCard() {
        this.hand.push(blackjackDeck[Math.floor(Math.random() * blackjackDeck.length)]);
    };
};


// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer");
const player = new CardPlayer("Player");

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */

const calcPoints = (hand) => {
    let totalScore = 0;
    let numberOfHardAces = 0;
    let hasSoftAce = false;

    hand.forEach(card => {
        if ( card.displayVal === 'Ace' ) { 
            if ( ( totalScore + 11 ) > 21 ) {
                totalScore += 1;
                hasSoftAce = true;
            } else {
                totalScore += 11;
                numberOfHardAces++
            }
        } else {
            totalScore += card.val;
        }

    });

    while ( ( numberOfHardAces > 0 ) && ( totalScore > 21 ) ) {
        // Uses numberOfHardAces to track if hard aces are present. 
        // If so, while there are hard aces and the score is over 21, 
        // removes 10 points by swapping hard ace to soft ace and de-iterates.
        totalScore -= 10;
        numberOfHardAces--;
        hasSoftAce = true;
    }

    const blackJackScore = {
        total: totalScore,
        isSoft: hasSoftAce
    }

    return blackJackScore;
}


// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
    let dealerScore = calcPoints(dealerHand);

    return dealerScore.total < 15 ? true : false;
}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
    let winner = '';
    let statement = '';

    if ( playerScore <= 21 && dealerScore <= 21 ) {
        
        if ( playerScore === dealerScore ) {
            winner = 'The game is a tie.';
        } else if ( playerScore > dealerScore ) {
            winner = 'The player wins.';
        } else if ( dealerScore > playerScore ) {
            winner = 'The dealer wins.';
        }

    } else if ( playerScore > 21 && dealerScore > 21 ) {

        winner = 'Both player and dealer are over 21, nobody wins.';

    } else if ( playerScore > 21 || dealerScore > 21 ) {

        if ( playerScore > 21 && dealerScore <= 21 ) {
            winner = 'The dealer wins.'
        } else if ( dealerScore > 21 && playerScore <= 21 ) {
            winner = 'The player wins.'
        }

    }

    statement = `The player's score is ${playerScore}. The dealer's score is ${dealerScore}. ${winner}`;

console.log(statement);

    let displayBox = document.getElementById('displayContainer');
    displayBox.innerHTML = statement;
   

    return statement;
}

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());