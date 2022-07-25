//-------------- Constants------------------------------------------------------
const cards = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const suits = ['spade', 'club', 'diamond', 'heart'];
const masterDeck = buildMasterDeck();
const shuffledDeck = getNewShuffledDeck();




//------ State Variables
let playerScore;
let computerScore;
let playerCards;
let cpuCards;
let cpuCardIndex;
let playerCardIndex;


// create elements for the current cards remaining values
// you may have to seperate the number from the current <div>
// and then cache them to in order to manipulate them with DOM

const drawButton = document.querySelector('.draw');
const startButton = document.querySelector('.start');
const playerCardsRemaining = document.querySelector('.player-cards');
const cpuCardsRemaining = document.querySelector('.cpu-cards');

const syncButton = document.querySelector('.sync');



// This needs to reset the values of playerScore and computerScore to 26 at the 
// beginning of the game. there should be no display result. and must randomize
// deck of cards before each new game.


init();

function init() {
    playerCards = shuffledDeck.slice(0, 26);
    cpuCards = shuffledDeck.slice (26 , 52);
    // cpuCardIndex = 0;
    // playerCardIndex = 0;
    playerCardIndex = Math.floor(Math.random() * playerCards.length);
    cpuCardIndex = Math.floor(Math.random() * cpuCards.length);

    
}

function startGame () {
    startButton.classList.add("hide");
    drawButton.classList.remove("hide");   
}


// 
function drawCard(){

    let playerCard = playerCards[playerCardIndex];
    let cpuCard = cpuCards[cpuCardIndex];

    console.log("PLAYER CARD INDEX", playerCardIndex, "=", playerCard.value,
    "CPU CARD INDEX", cpuCardIndex, "=", cpuCard.value);

    if (playerCard.value > cpuCard.value) {
        playerCards.push(cpuCard);
        cpuCards.splice(cpuCardIndex,1)

  
    }
    else if (playerCard.value < cpuCard.value) {
        cpuCards.push(playerCard);
        playerCards.splice(playerCardIndex,1)
        
    } else {
        console.log("TIE!")
        
    }
    cpuCardIndex++
    playerCardIndex++
    console.log("Indexes after increment", cpuCardIndex,playerCardIndex)

    if(cpuCardIndex >= (playerCards.length - 1) || cpuCardIndex >= (cpuCards.length - 1))
     {
        if (playerCards.length === 52) {
            alert("PLAYER WINS!")
            return;
            
        } 
        else if (cpuCards.length === 52) {
            alert("CPU WINS!")
            return;
        }
        console.log("RESETTING INDEX")
        cpuCardIndex = 0;
    }

    if(playerCardIndex >= (playerCards.length-1) || playerCardIndex >= (cpuCards.length-1)
    ) {
        if (playerCards.length === 52) {
            alert("PLAYER WINS!")
            return;
            
        } 
        else if (cpuCards.length === 52) {
            alert("CPU WINS!")
            return;
        }
        console.log("RESETTING INDEX")
        playerCardIndex = 0;
    }

    render();
    console.table("PLAYER CARDS:",playerCards.length, "CPU CARDS",cpuCards.length)

}
  


function render(){   // This will need to render the currentCard image to the screen, and update the cards remaining counts
    
    playerCardsRemaining.innerText = playerCards.length;
    cpuCardsRemaining.innerText = cpuCards.length;
    

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
// into one deck. Added keys to object for "value" , and "imageUrl"


function buildMasterDeck() {
    const deck = [];
    suits.forEach((suit) => {
        let i = 1;  // this sets the value of each suit to 1 to begin with.
        cards.forEach((card) => {
            deck.push({            // cards.forEach is creating an object for each card
                face: `${suit}${card}`,
                imageUrl: "http//xxxx",
                value: i
            });
            i++    // <-- try to understand this 
        });
    });
    return deck;
}



//-------------Event listeners----------------------
startButton.addEventListener('click', startGame);
drawButton.addEventListener('click', drawCard);
syncButton.addEventListener('click', syncGame);

// console.table(masterDeck); // <-- use console.table to view better

function syncGame() {
    while((cpuCards.length) - 1 || (playerCards.length) - 1) {
        drawCard();
    }
}

