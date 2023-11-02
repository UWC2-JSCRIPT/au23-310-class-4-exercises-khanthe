/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const cards = [];
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

  /// nested for loops
  for ( let i = 0; i < suits.length; i++) { 

    for ( let j = 2; j <= 14; j++) { 

      let cardVal = -1;
      let cardDisplayVal = '';

      if ( j > 1 && j < 11 ) {
        cardVal = j;
        cardDisplayVal = j.toString();
      } else if ( j === 11 ) {
        cardVal = 10;
        cardDisplayVal = 'Jack';
      } else if ( j === 12 ) {
        cardVal = 10;
        cardDisplayVal = 'Queen';
      } else if ( j === 13 ) {
        cardVal = 10;
        cardDisplayVal = 'King';
      } else if ( j === 14 ) {
        cardVal = 11;
        cardDisplayVal = 'Ace';      
      }

      cards.push({val: cardVal, displayVal: cardDisplayVal, suit: suits[i]});
    }
 
  }

  return cards;
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
