const cardValues = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const suits = ['spade', 'club', 'diamond', 'heart'];
const masterDeck = buildMasterDeck();

//------ State Variables
let shuffledDeck;
let playerScore;
let computerScore;
let playerCard;
let cpuCard;



// create elements for the current cards remaining values
// you may have to seperate the number from the current <div>
// and then cache them to in order to manipulate them with DOM

const resultsText = document.querySelector('.results');
const drawButton = document.querySelector('.draw');

//-------------Event listeners----------------------
drawButton.addEventListener('click', drawCard);

init();


// This needs to reset the values of playerScore and computerScore to 26 at the 
// beginning of the game. there should be no display result. and must randomize
// deck of cards before each new game.

init();

function init() {
    shuffleCards();
    resultsText.innerText = "";
}



function drawCard(){

}


function render(){

}

function shuffleCards(){
    let randomIndex = Math.floor(Math.random() * cardValues.length);
    randomCard = cardValues[randomIndex];
}

function buildMasterDeck() {
    const deck = [];
    suits.forEach((suit) => {
        cardValues.forEach((value) => {
            deck.push({
                face: `${suit}${value}`,
            });
        });
    });
    return deck;
}

buildMasterDeck();