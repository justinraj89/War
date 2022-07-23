//-------------- Constants------------------------------------------------------
const cards = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const suits = ['spade', 'club', 'diamond', 'heart'];
const masterDeck = buildMasterDeck();




//------ State Variables
let shuffledDeck = getNewShuffledDeck();
let playerScore;
let computerScore;
let player = '';
let cpu = '';
let playerCards;
let cpucards;

let currentCard;





// create elements for the current cards remaining values
// you may have to seperate the number from the current <div>
// and then cache them to in order to manipulate them with DOM

const resultsText = document.querySelector('.results')
const drawButton = document.querySelector('.draw');

//-------------Event listeners----------------------
drawButton.addEventListener('click', drawCard);

init();


// This needs to reset the values of playerScore and computerScore to 26 at the 
// beginning of the game. there should be no display result. and must randomize
// deck of cards before each new game.



function init() {
    getNewShuffledDeck();
    playerCards = shuffledDeck.slice(0, 26);
    cpucards = shuffledDeck.slice (26 , 52);
    currentCard = 0;

}



function drawCard(){
    

}


function render(){

}

// This function takes the existing masterDeck and uses Math.random() to randomly mix the deck.

function getNewShuffledDeck() {
    const tempDeck = [...masterDeck]; // '...' copies masterDeck without modifying the original
    const newShuffledDeck = [];
    while (tempDeck.length) {
        const randomIndex = Math.floor(Math.random() * tempDeck.length);
        newShuffledDeck.push(tempDeck.splice(randomIndex, 1)[0]);
    }
    
    return newShuffledDeck;
}


// This function loops through the above 'suits' and 'cardValues' arrays created and pushes them 
// into one deck.

function buildMasterDeck() {
    const deck = [];
    suits.forEach((suit) => {
        cards.forEach((value) => {
            deck.push({
                face: `${suit}${value}`,
            });
        });
    });
    return deck;
}



// This function will take the deck and split it in 2
// slice method (startIndex, deleteCount). *reminder



// This below function splits and randomizes, but only from the first 26 cards, not thew whole 52 :(

// function splitDeck () {
//     let halfDeck = masterDeck.slice(0, 26);
//     console.log(halfDeck);
//     let randomIdx = Math.floor(Math.random() * halfDeck.length);
//     console.log(halfDeck[randomIdx]);

// }

// splitDeck();

