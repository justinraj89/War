const cardValues = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

let playerScore = 0;
let computerScore = 0;

let playerCard = null;
let cpuCard = null;

let randomCard;

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

function init() {
    randomizeCards();
    
}



function drawCard(){

}


function render(){

}

function randomizeCards(){
    let randomIndex = Math.floor(Math.random() * cardValues.length);
    randomCard = cardValues[randomIndex];
}

