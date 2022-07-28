//-------------- Constants------------------------------------------------------
const cards = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const suits = ['spade', 'club', 'diamond', 'heart'];
const masterDeck = buildMasterDeck();

//------ State Variables
let playerCards;
let cpuCards;
let cpuCardIndex;
let playerCardIndex;
let playerCard;
let cpuCard;
let playerWarCards;
let cpuWarCards;
let shuffledDeck = getNewShuffledDeck();
let warModeEnabled = false;


//--------------- DOM Elements

//----- Buttons
const drawButton = document.querySelector('.draw');
const startButton = document.querySelector('.start');
const warButton = document.querySelector('.war');
const restartButton = document.querySelector('.restart');
//---- Score Count/Display Winner
const winnerNotification = document.querySelector('.winnerNotification');
const playerCardsRemaining = document.querySelector('.player-cards');
const cpuCardsRemaining = document.querySelector('.cpu-cards');
//---- Card Images
let playerCardImage = document.querySelector('#p-card');
let cpuCardImage = document.querySelector('#c-card');
let playerWarCardFaceDown = document.querySelector('#player-warCardDown'); 
let cpuWarCardFaceDown = document.querySelector('#cpu-warCardDown');        
let playerWarCardFaceUp = document.querySelector('#player-warCardUp');      
let cpuWarCardFaceUp = document.querySelector('#cpu-warCardUp');            


init();

function init() {
    playerCards = shuffledDeck.slice(0, 26);
    cpuCards = shuffledDeck.slice (26 , 52);
    // cpuCardIndex = 0;
    // playerCardIndex = 0;
}

function startGame () {
    startButton.classList.add("hide");  
    drawButton.classList.remove("hide");   
    playerCardsRemaining.innerText = playerCards.length;  
    cpuCardsRemaining.innerText = cpuCards.length;
}

function newGame() {
    if(warModeEnabled) {
        warCleanup();
    }
    shuffledDeck = getNewShuffledDeck();
    playerCards = shuffledDeck.slice(0, 26);
    cpuCards = shuffledDeck.slice (26 , 52);
    playerCardImage.classList.add('hide');
    cpuCardImage.classList.add('hide');
    winnerNotification.innerText = '';
    warButton.classList.add('hide');
    startGame();
}

function warCleanup() {
    playerWarCardFaceDown.classList.add("hide");  
    cpuWarCardFaceDown.classList.add("hide");     
    playerWarCardFaceUp.classList.add("hide");    
    cpuWarCardFaceUp.classList.add("hide");
    warModeEnabled = false;
}

function drawCard() {
    if (warModeEnabled) { 
        warCleanup() 
    }

    playerCardImage.classList.remove('hide');
    cpuCardImage.classList.remove('hide');
        
    playerCard = playerCards.shift()  
    cpuCard = cpuCards.shift()      

    // winnerNotification.innerText = '';  

    if (playerCard.value > cpuCard.value) {   
        playerCards.push(playerCard);            
        playerCards.push(cpuCard);            
        winnerNotification.innerText = 'Player Wins!';                               
        render();
    }                                                                                
    else if (playerCard.value < cpuCard.value) {
        cpuCards.push(cpuCard);
        cpuCards.push(playerCard);
        winnerNotification.innerText = 'Computer Wins!'
        render();    
    } else {                   
        warButton.classList.remove ("hide");  
        drawButton.classList.add('hide');   
        winnerNotification.innerText = "WAR!";
        renderWar();
    }

    if (cpuCards.length === 52) {
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'Computer Wins the Game!'
        return;     
    } 
    else if (playerCards.length === 52) {
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'Player Wins the Game!'
        return;       
    } 
}

function war() {   
    if(playerCards.length <= 1) {
        drawButton.classList.add('hide');
        warButton.classList.add('hide');   
        winnerNotification.innerText = 'Computer Wins the Game!'
        return;     
    } 
    else if(cpuCards.length <= 1) {
        warButton.classList.add('hide');
        drawButton.classList.add('hide');   
        winnerNotification.innerText = 'Player Wins the Game!'
        return;     
    }
    
    warModeEnabled = true;  

    playerWarCardFaceDown.classList.remove("hide");   
    cpuWarCardFaceDown.classList.remove("hide");     
    playerWarCardFaceUp.classList.remove("hide");
    cpuWarCardFaceUp.classList.remove("hide");

    warButton.classList.add("hide");  
    drawButton.classList.remove("hide");  

    playerWarCards = {
        faceDownCard: playerCards.shift(),  
        faceUpCard: playerCards.shift()  
    };

    cpuWarCards = {
        faceDownCard: cpuCards.shift(),  
        faceUpCard: cpuCards.shift()  
    };

    playerWarCardFaceUp.src = playerWarCards.faceUpCard.imageUrl;  
    cpuWarCardFaceUp.src = cpuWarCards.faceUpCard.imageUrl;        

   
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
        winnerNotification.innerText = 'Computer Wins War!'
    } 
    else {
        winnerNotification.innerText = 'Double War, Players receive cards back';
        playerCards.push(playerWarCards.faceUpCard);
        playerCards.push(playerWarCards.faceDownCard); 
        playerCards.push(playerCard); 
        cpuCards.push(cpuWarCards.faceUpCard);
        cpuCards.push(cpuWarCards.faceDownCard);
        cpuCards.push(cpuCard); 
    }
}

function render() {   
    playerCardsRemaining.innerText = playerCards.length;
    cpuCardsRemaining.innerText = cpuCards.length;
    playerCardImage.src = playerCard.imageUrl;
    cpuCardImage.src = cpuCard.imageUrl;
}

function renderWar() {
    playerCardImage.src = playerCard.imageUrl;
    cpuCardImage.src = cpuCard.imageUrl;
}

function getNewShuffledDeck() {
    const tempDeck = [...masterDeck]; 
    const newShuffledDeck = [];
    while (tempDeck.length) {
        const randomIndex = Math.floor(Math.random() * tempDeck.length);
        newShuffledDeck.push(tempDeck.splice(randomIndex, 1)[0]);
    }
    return newShuffledDeck;
}

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
restartButton.addEventListener('click', newGame);



