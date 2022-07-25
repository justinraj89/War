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

let playerCard;
let cpuCard;




// create elements for the current cards remaining values
// you may have to seperate the number from the current <div>
// and then cache them to in order to manipulate them with DOM

const drawButton = document.querySelector('.draw');
const startButton = document.querySelector('.start');
const playerCardsRemaining = document.querySelector('.player-cards');
const cpuCardsRemaining = document.querySelector('.cpu-cards');
let playerCardImage = document.querySelector('#p-card');
let cpuCardImage = document.querySelector('#c-card');

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
    playerCardsRemaining.innerText = 26;
    cpuCardsRemaining.innerText = 26;
}


// 
function drawCard(){

    playerCard = playerCards[playerCardIndex];
    cpuCard = cpuCards[cpuCardIndex];

    console.log("PLAYER CARD INDEX and Value", playerCardIndex, "=", playerCard.value,
    "CPU CARD INDEX and Value", cpuCardIndex, "=", cpuCard.value);

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
        // cpuCardIndex = 0;
        cpuCardIndex = Math.floor(Math.random() * cpuCards.length);
    }

    if(playerCardIndex >= (playerCards.length -1) || playerCardIndex >= (cpuCards.length -1)) {

        if (playerCards.length === 52) {
            alert("PLAYER WINS!")
            return;
            
        } 
        else if (cpuCards.length === 52) {
            alert("CPU WINS!")
            return;
        }
        console.log("RESETTING INDEX")
        // playerCardIndex = 0;
        playerCardIndex = Math.floor(Math.random() * playerCards.length);
    }

    render();
    console.table("PLAYER CARDS:",playerCards.length, "CPU CARDS",cpuCards.length)

}
  
// function war() {
//     if(playerCard.value === cpuCard.value) {

//     }
// }


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
// syncButton.addEventListener('click', syncGame);

// console.table(masterDeck); // <-- use console.table to view better

// function syncGame() {
//     while((cpuCards.length) - 1 || (playerCards.length) - 1) {
//         drawCard();
//     }
// }

masterDeck[0].imageUrl =  'PNG-cards-1.3/spade02.png';
masterDeck[1].imageUrl =  'PNG-cards-1.3/spade03.png';
masterDeck[2].imageUrl =  'PNG-cards-1.3/spade04.png';
masterDeck[3].imageUrl = 'PNG-cards-1.3/spade05.png';
masterDeck[4].imageUrl = 'PNG-cards-1.3/spade06.png';
masterDeck[5].imageUrl = 'PNG-cards-1.3/spade07.png';
masterDeck[6].imageUrl = 'PNG-cards-1.3/spade08.png';
masterDeck[7].imageUrl = 'PNG-cards-1.3/spade09.png';
masterDeck[8].imageUrl = 'PNG-cards-1.3/spade10.png';
masterDeck[9].imageUrl = 'PNG-cards-1.3/spadeJ.png';
masterDeck[10].imageUrl = 'PNG-cards-1.3/spadeQ.png';
masterDeck[11].imageUrl = 'PNG-cards-1.3/spadeK.png';
masterDeck[12].imageUrl = 'PNG-cards-1.3/spadeA.png';
masterDeck[13].imageUrl = 'PNG-cards-1.3/club02.png';
masterDeck[14].imageUrl = 'PNG-cards-1.3/club03.png';
masterDeck[15].imageUrl = 'PNG-cards-1.3/club04.png';
masterDeck[16].imageUrl = 'PNG-cards-1.3/club05.png';
masterDeck[17].imageUrl = 'PNG-cards-1.3/club06.png';
masterDeck[18].imageUrl = 'PNG-cards-1.3/club07.png';
masterDeck[19].imageUrl = 'PNG-cards-1.3/club08.png';
masterDeck[20].imageUrl = 'PNG-cards-1.3/club09.png';
masterDeck[21].imageUrl = 'PNG-cards-1.3/club10.png';
masterDeck[22].imageUrl = 'PNG-cards-1.3/clubJ.png';
masterDeck[23].imageUrl = 'PNG-cards-1.3/clubQ.png';
masterDeck[24].imageUrl = 'PNG-cards-1.3/clubK.png';
masterDeck[25].imageUrl = 'PNG-cards-1.3/clubA.png';
masterDeck[26].imageUrl = 'PNG-cards-1.3/diamond02.png';
masterDeck[27].imageUrl = 'PNG-cards-1.3/diamond03.png';
masterDeck[28].imageUrl = 'PNG-cards-1.3/diamond04.png';
masterDeck[29].imageUrl = 'PNG-cards-1.3/diamond05.png';
masterDeck[30].imageUrl = 'PNG-cards-1.3/diamond06.png';
masterDeck[31].imageUrl = 'PNG-cards-1.3/diamond07.png';
masterDeck[32].imageUrl = 'PNG-cards-1.3/diamond08.png';
masterDeck[33].imageUrl = 'PNG-cards-1.3/diamond09.png';
masterDeck[34].imageUrl = 'PNG-cards-1.3/diamond10.png';
masterDeck[35].imageUrl = 'PNG-cards-1.3/diamondJ.png';
masterDeck[36].imageUrl = 'PNG-cards-1.3/diamondQ.png';
masterDeck[37].imageUrl = 'PNG-cards-1.3/diamondK.png';
masterDeck[38].imageUrl = 'PNG-cards-1.3/diamondA.png';
masterDeck[39].imageUrl = 'PNG-cards-1.3/heart02.png';
masterDeck[40].imageUrl = 'PNG-cards-1.3/heart03.png';
masterDeck[41].imageUrl = 'PNG-cards-1.3/heart04.png';
masterDeck[42].imageUrl = 'PNG-cards-1.3/heart05.png';
masterDeck[43].imageUrl = 'PNG-cards-1.3/heart06.png';
masterDeck[44].imageUrl = 'PNG-cards-1.3/heart07.png';
masterDeck[45].imageUrl = 'PNG-cards-1.3/heart08.png';
masterDeck[46].imageUrl = 'PNG-cards-1.3/heart09.png';
masterDeck[47].imageUrl = 'PNG-cards-1.3/heart10.png';
masterDeck[48].imageUrl = 'PNG-cards-1.3/heartJ.png';
masterDeck[49].imageUrl = 'PNG-cards-1.3/heartQ.png';
masterDeck[50].imageUrl = 'PNG-cards-1.3/heartK.png';
masterDeck[51].imageUrl = 'PNG-cards-1.3/heartA.png';







// masterDeck[0].imageUrl =  'PNG-cards-1.3/spade02.png';
// masterDeck[1].imageUrl =  'PNG-cards-1.3/spade03.png';
// masterDeck[2].imageUrl =  'PNG-cards-1.3/spade04.png';
// masterDeck[3].imageUrl = 'PNG-cards-1.3/spade05.png';
// masterDeck[4].imageUrl = 'PNG-cards-1.3/spade06.png';
// masterDeck[5].imageUrl = 'PNG-cards-1.3/spade07.png';
// masterDeck[6].imageUrl = 'PNG-cards-1.3/spade08.png';
// masterDeck[7].imageUrl = 'PNG-cards-1.3/spade09.png';
// masterDeck[8].imageUrl = 'PNG-cards-1.3/spade10.png';
// masterDeck[9].imageUrl = 'PNG-cards-1.3/spadeJ.png';
// masterDeck[10].imageUrl = 'PNG-cards-1.3/spadeQ.png';
// masterDeck[11].imageUrl = 'PNG-cards-1.3/spadeK.png';
// masterDeck[12].imageUrl = 'PNG-cards-1.3/spadeA.png';
// masterDeck[13].imageUrl = 'PNG-cards-1.3/club02.png';
// masterDeck[14].imageUrl = 'PNG-cards-1.3/club03.png';
// masterDeck[15].imageUrl = 'PNG-cards-1.3/club04.png';
// masterDeck[16].imageUrl = 'PNG-cards-1.3/club05.png';
// masterDeck[17].imageUrl = 'PNG-cards-1.3/club06.png';
// masterDeck[18].imageUrl = 'PNG-cards-1.3/club07.png';
// masterDeck[19].imageUrl = 'PNG-cards-1.3/club08.png';
// masterDeck[20].imageUrl = 'PNG-cards-1.3/club09.png';
// masterDeck[21].imageUrl = 'PNG-cards-1.3/club10.png';
// masterDeck[22].imageUrl = 'PNG-cards-1.3/clubJ.png';
// masterDeck[23].imageUrl = 'PNG-cards-1.3/clubQ.png';
// masterDeck[24].imageUrl = 'PNG-cards-1.3/clubK.png';
// masterDeck[25].imageUrl = 'PNG-cards-1.3/clubA.png';
// masterDeck[26].imageUrl = 'PNG-cards-1.3/diamond02.png';
// masterDeck[27].imageUrl = 'PNG-cards-1.3/diamond03.png';
// masterDeck[28].imageUrl = 'PNG-cards-1.3/diamond04.png';
// masterDeck[29].imageUrl = 'PNG-cards-1.3/diamond05.png';
// masterDeck[30].imageUrl = 'PNG-cards-1.3/diamond06.png';
// masterDeck[31].imageUrl = 'PNG-cards-1.3/diamond07.png';
// masterDeck[32].imageUrl = 'PNG-cards-1.3/diamond08.png';
// masterDeck[33].imageUrl = 'PNG-cards-1.3/diamond09.png';
// masterDeck[34].imageUrl = 'PNG-cards-1.3/diamond10.png';
// masterDeck[35].imageUrl = 'PNG-cards-1.3/diamondJ.png';
// masterDeck[36].imageUrl = 'PNG-cards-1.3/diamondQ.png';
// masterDeck[37].imageUrl = 'PNG-cards-1.3/diamondK.png';
// masterDeck[38].imageUrl = 'PNG-cards-1.3/diamondA.png';
// masterDeck[39].imageUrl = 'PNG-cards-1.3/heart02.png';
// masterDeck[40].imageUrl = 'PNG-cards-1.3/heart03.png';
// masterDeck[41].imageUrl = 'PNG-cards-1.3/heart04.png';
// masterDeck[42].imageUrl = 'PNG-cards-1.3/heart05.png';
// masterDeck[43].imageUrl = 'PNG-cards-1.3/heart06.png';
// masterDeck[44].imageUrl = 'PNG-cards-1.3/heart07.png';
// masterDeck[45].imageUrl = 'PNG-cards-1.3/heart08.png';
// masterDeck[46].imageUrl = 'PNG-cards-1.3/heart09.png';
// masterDeck[47].imageUrl = 'PNG-cards-1.3/heart10.png';
// masterDeck[48].imageUrl = 'PNG-cards-1.3/heartJ.png';
// masterDeck[49].imageUrl = 'PNG-cards-1.3/heartQ.png';
// masterDeck[50].imageUrl = 'PNG-cards-1.3/heartK.png';
// masterDeck[51].imageUrl = 'PNG-cards-1.3/heartA.png';
