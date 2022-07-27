//-------------- Constants------------------------------------------------------
const cards = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const suits = ['spade', 'club', 'diamond', 'heart'];
const masterDeck = buildMasterDeck();
const shuffledDeck = getNewShuffledDeck();

//------ State Variables
let playerCards;
let cpuCards;
let cpuCardIndex;
let playerCardIndex;
let playerCard;
let cpuCard;

let playerWarCards;
let cpuWarCards;
let warModeEnabled = false;


// create elements for the current cards remaining values
// you may have to seperate the number from the current <div>
// and then cache them to in order to manipulate them with DOM

const drawButton = document.querySelector('.draw');
const startButton = document.querySelector('.start');
const warButton = document.querySelector('.war');
const playerCardsRemaining = document.querySelector('.player-cards');
const cpuCardsRemaining = document.querySelector('.cpu-cards');
let playerCardImage = document.querySelector('#p-card');
let cpuCardImage = document.querySelector('#c-card');

let playerWarCardFaceDown = document.querySelector('#player-warCardDown');  // Tied to the war function, only revelaed during 'War'
let cpuWarCardFaceDown = document.querySelector('#cpu-warCardDown');        // Tied to the war function, only revelaed during 'War'
let playerWarCardFaceUp = document.querySelector('#player-warCardUp');      // Tied to the war function, only revelaed during 'War'
let cpuWarCardFaceUp = document.querySelector('#cpu-warCardUp');            // Tied to the war function, only revealed during 'War'

const simulateButton = document.querySelector('.simulate');


init();

function init() {
    playerCards = shuffledDeck.slice(0, 26);
    cpuCards = shuffledDeck.slice (26 , 52);
    cpuCardIndex = 0;
    playerCardIndex = 0;
}

function startGame () {
    startButton.classList.add("hide");  // when you click 'start game' button it is hidden
    drawButton.classList.remove("hide");   // and then 'draw card' button is revealed
    playerCardsRemaining.innerText = 26;  // sets player and CPU scores to 26
    cpuCardsRemaining.innerText = 26;
}

function warCleanup() {
    playerWarCardFaceDown.classList.add("hide");  // this functions purpose is to hide all the extra cards
    cpuWarCardFaceDown.classList.add("hide");     // that get displayed when war takes place. It is put at the
    playerWarCardFaceUp.classList.add("hide");    // beginning of the drawCard() as the first check to clear the cards
    cpuWarCardFaceUp.classList.add("hide");
    warModeEnabled = false;
}

function drawCard() {

    if (warModeEnabled) { 
        warCleanup() 
    }
        
    playerCard = playerCards[playerCardIndex];   // in the init(), playerCardIndex and cpuCardIndex both set to 0
    cpuCard = cpuCards[cpuCardIndex];           // so playerCard and cpuCard indexes both start at 0 to begin with.

    console.log("PLAYER CARD INDEX and Value", playerCardIndex, "=", playerCard.value,
    "CPU CARD INDEX and Value", cpuCardIndex, "=", cpuCard.value);

    if (playerCard.value > cpuCard.value) {   // The conditional statement checks for the higher value (values assigned to each card object)
        playerCards.push(cpuCard);            // the winner pushes the losers card into their deck
        cpuCards.splice(cpuCardIndex,1)       // splice parameters are.. (start, how many elements to remove. So in this case, the current card)
    }                                                                                
    else if (playerCard.value < cpuCard.value) {
        cpuCards.push(playerCard);
        playerCards.splice(playerCardIndex,1)
        
    } else {
        console.log('TIE');                   // In the case of a tie, or "War", the warButton is revealed, and the draw button is hidden.
        warButton.classList.remove ("hide");  // the Tied cards remain on the screen.
        drawButton.classList.add('hide');      
        }

    cpuCardIndex++           // after the conditional statements have been checked, the playerCardIndex and cpuCardIndex both get incremented by 1       
    playerCardIndex++

    console.log("Indexes after increment", cpuCardIndex,playerCardIndex)

    if(cpuCardIndex >= (cpuCards.length - 1 )) {  // This conditional statement checks the current card index and makes sure it does not go over the                                               // length of the cards remaining in deck (player, or CPU). Also checks for a Win.
        if (cpuCards.length === 52) {
            alert("Computer WINS!")
            return;     
        } 
        console.log("RESETTING INDEX") 
        cpuCardIndex = Math.floor(Math.random() * cpuCards.length - 1 );  // this resets the card index to a random number upon reset (avoid never ending game)
    }

    if(playerCardIndex >= (playerCards.length - 1)) {
        if (playerCards.length === 52) {
            alert("PLAYER WINS!")
            return;       
        } 
        console.log("RESETTING INDEX")
        playerCardIndex = Math.floor(Math.random() * playerCards.length - 1);
    }
    render();
}
  
function getRandomCard(cards) {
    return cards[(Math.floor(Math.random() * cards.length-1))];  //This is just a function that will pick a random card, and put into an array
}



function war() {             // // this function is tied to the warButton click eventListener . Created objects for players war cards, and CPUs war cards.
    warModeEnabled = true;  

    playerWarCards = {
        faceUpCard: getRandomCard(playerCards),  // uses the above ^ getRandomCard() to generate cards for war
        faceDownCard: getRandomCard(playerCards) // one card is dealed down, the other dealed up, whoevers faceUpCard value is higher wins both cards.
    };
    console.table(playerWarCards)
    
    cpuWarCards = {
        faceUpCard: getRandomCard(cpuCards), 
        faceDownCard: getRandomCard(cpuCards)
    };
    console.table(cpuWarCards) 

    playerWarCardFaceUp.src = playerWarCards.faceUpCard.imageUrl;  // sets the images of the faceUp cards to their imageURL
    cpuWarCardFaceUp.src = cpuWarCards.faceUpCard.imageUrl;        // warFaceCardUp variables have a CSS 'hide' applied

    playerWarCardFaceDown.classList.remove("hide");   // these are all hidden during normal gameplay (when its not war)
    cpuWarCardFaceDown.classList.remove("hide");      // when war occurs, all are rendered onto screen. Removing 'hide' CSS class.
    playerWarCardFaceUp.classList.remove("hide");
    cpuWarCardFaceUp.classList.remove("hide");

    // console.log(playerWarCards.faceUpCard);
    // console.log(cpuWarCards.faceUpCard);

    warButton.classList.add("hide");  // warButton is hidden after it is clicked, and drawCard button comes back
    drawButton.classList.remove("hide");  // draw card button comes back, but is not clicked during war, when you click it, it resets back to normal gameplay

    if(playerWarCards.faceUpCard.value > cpuWarCards.faceUpCard.value) {
        playerCards.push(cpuWarCards.faceUpCard);
        playerCards.push(cpuWarCards.faceDownCard);
        playerCards.push(cpuCard); // double check if this is right

        let spliceIndex = cpuCards.findIndex(c => c.face === cpuWarCards.faceDownCard.face)  
        cpuCards.splice(spliceIndex, 1);
        spliceIndex = cpuCards.findIndex(c => c.face === cpuWarCards.faceUpCard.face)
        cpuCards.splice(spliceIndex, 1);
        cpuCards.splice(cpuCardIndex,1)


        render();
        setTimeout(() => alert("PLAYER WINS!"), 500);
    }
    else if (playerWarCards.faceUpCard.value < cpuWarCards.faceUpCard.value) {
        cpuCards.push(playerWarCards.faceUpCard);
        cpuCards.push(playerWarCards.faceDownCard);
        cpuCards.push(playerCard);  // double check if this is right
        
        let spliceIndex = playerCards.findIndex(c => c.face === playerWarCards.faceDownCard.face)
        playerCards.splice(spliceIndex, 1);
        spliceIndex = playerCards.findIndex(c => c.face === playerWarCards.faceUpCard.face)
        playerCards.splice(spliceIndex, 1);
        playerCards.splice(playerCardIndex,1)
       
        render();
        setTimeout(() => alert("COMPUTER WINS!"), 500);
    } 


}


function render(){   // This will need to render the currentCard image to the screen, and update the cards remaining counts
    
    playerCardsRemaining.innerText = playerCards.length;
    cpuCardsRemaining.innerText = cpuCards.length;
    playerCardImage.src = playerCard.imageUrl;
    cpuCardImage.src = cpuCard.imageUrl;
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
        let val = 1;  // this sets the value of each suit to 1 to begin with.
        cards.forEach((card) => {
            deck.push({            // cards.forEach is creating an object for each card
                face: `${suit}${card}`,
                imageUrl: `PNG-cards-1.3/${suit}${card}.png`,
                value: val
            });
            val++    
        });
    });
    return deck;
}



//-------------Event listeners----------------------
startButton.addEventListener('click', startGame);
drawButton.addEventListener('click', drawCard);
warButton.addEventListener('click', war);

// simulateButton.addEventListener('click', simulateGame);

// console.table(masterDeck); // <-- use console.table to view better

// function simulateGame() {
//     while((cpuCards.length - 1)  || (playerCards.length -1)) {
//         drawCard();
//     }
// }

