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


//--------------- DOM Elements
const drawButton = document.querySelector('.draw');
const startButton = document.querySelector('.start');
const warButton = document.querySelector('.war');
const restartButton = document.querySelector('.restart');
const playerCardsRemaining = document.querySelector('.player-cards');
const cpuCardsRemaining = document.querySelector('.cpu-cards');
let playerCardImage = document.querySelector('#p-card');
let cpuCardImage = document.querySelector('#c-card');
const winnerNotification = document.querySelector('.winnerNotification');
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

function restartGame() {
    if(warModeEnabled) {
        warCleanup();
    }
    playerCardImage.classList.add('hide');
    cpuCardImage.classList.add('hide');
    winnerNotification.innerText = '';
    init();
    startGame();
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

    playerCardImage.classList.remove('hide');
    cpuCardImage.classList.remove('hide');
        
    playerCard = playerCards.shift()  // shift removes an element from beginning of array.
    cpuCard = cpuCards.shift()      

    console.log("PLAYER CARD INDEX and Value", playerCardIndex, "=", playerCard.value,
    "CPU CARD INDEX and Value", cpuCardIndex, "=", cpuCard.value);

    winnerNotification.innerText = '';

    if (playerCard.value > cpuCard.value) {   // The conditional statement checks for the higher value (values assigned to each card object)
        playerCards.push(playerCard);            // the winner pushes the losers card into their deck
        playerCards.push(cpuCard);            // the winner pushes the losers card into their deck
        winnerNotification.innerText = 'Player Wins!';                               
        render();
    }                                                                                
    else if (playerCard.value < cpuCard.value) {
        cpuCards.push(cpuCard);
        cpuCards.push(playerCard);
        winnerNotification.innerText = 'CPU Wins!'
        render();

    } else {
        renderWar();
        console.log('TIE');                   // In the case of a tie, or "War", the warButton is revealed, and the draw button is hidden.
        warButton.classList.remove ("hide");  // the Tied cards remain on the screen.
        drawButton.classList.add('hide');   
        winnerNotification.innerText = "WAR!";
       
    }
    
    if (cpuCards.length === 52) {
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'CPU Wins Gane!'
        return;     
    } 
    else if (playerCards.length === 52) {
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'Player Wins Gane!'
        return;       
    } 
    // render()
}

function war() {   // // this function is tied to the warButton click eventListener . Created objects for players war cards, and CPUs war cards.
    if(playerCards.length <= 3) {
        drawButton.classList.add('hide');
        warButton.classList.add('hide');   
        winnerNotification.innerText = 'CPU Wins the Game!'
        return;     
    } 
    else if(cpuCards.length <= 3) {
        warButton.classList.add('hide');
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'Player Wins the Game!'
        return;     
    }
    
    warModeEnabled = true;  

    playerWarCards = {
        faceDownCard: playerCards.shift(),  // one card is dealed down, the other dealed up, whoevers faceUpCard value is higher wins both cards.
        faceUpCard: playerCards.shift()  
    };

    cpuWarCards = {
        faceDownCard: cpuCards.shift(),  // one card is dealed down, the other dealed up, whoevers faceUpCard value is higher wins both cards.
        faceUpCard: cpuCards.shift()  
    };

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
        playerCards.push(playerWarCards.faceUpCard);
        playerCards.push(playerWarCards.faceDownCard); 
        playerCards.push(playerCard);  
        playerCards.push(cpuCard); 
        render();
        winnerNotification.innerText = 'Player Wins War!'
    }
    else if (playerWarCards.faceUpCard.value < cpuWarCards.faceUpCard.value) {
        cpuCards.push(cpuWarCards.faceUpCard);
        cpuCards.push(cpuWarCards.faceDownCard);
        cpuCards.push(playerWarCards.faceUpCard);
        cpuCards.push(playerWarCards.faceDownCard);
        cpuCards.push(playerCard);
        cpuCards.push(cpuCard); 
        render();
        winnerNotification.innerText = 'CPU Wins War!'
    } 
    else {
        war();
    }

    console.table("PC AFTER WAR",playerCards.length)
    
    console.table("CC AFTER WAR",cpuCards.length)

}


function render(){   // This will need to render the currentCard image to the screen, and update the cards remaining counts
    
    playerCardsRemaining.innerText = playerCards.length;
    cpuCardsRemaining.innerText = cpuCards.length;
    playerCardImage.src = playerCard.imageUrl;
    cpuCardImage.src = cpuCard.imageUrl;
}

function renderWar() {
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
restartButton.addEventListener('click', restartGame);

// simulateButton.addEventListener('click', simulateGame);

// console.table(masterDeck); // <-- use console.table to view better

// function simulateGame() {
//     while((cpuCards.length - 1)  || (playerCards.length -1)) {
//         drawCard();
//     }
// }

