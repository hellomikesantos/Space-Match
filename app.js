// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// store the icons in an array
// compare the #next-card to the e.target in ul#card
// use .classlist to change the className 

const iconsArray = [
  'fa-meteor',
  'fa-satellite',
  'fa-user-alien',
  'fa-rocket-launch',
  'fa-ufo-beam',
  'fa-star-shooting',
  'fa-planet-ringed',
  'fa-moon-stars',
  'fa-shuttle-space',
  'fa-comet',
  'fa-user-astronaut',
  'fa-telescope'
];

const cards = document.getElementsByClassName('card')
const cardsContainer = document.querySelector('#cards');
const listCollection = document.getElementById('cards').querySelectorAll('.card');
const iconsCollection = cardsContainer.getElementsByClassName('fas');
const restartButton = document.querySelector('.restart');
const nextCard = document.getElementById('next-card').firstElementChild;
const score = document.getElementById('score');
let scoreNum = 0;
let arr = -1;
let lockBoxes = false;
let nextCardMatched = false;
let matchDone = false;
let currentIndex;
let arrayForAllMatched = [];


// nextCard.classList.replace()
console.log(nextCard)

// a function to update the UI
function updateUI() {
  score.textContent = scoreNum;
}

// restart
function restart() {
  arr = -1;
  scoreNum = 0;
  // shuffle the icons
  // reset the #next-card
  // let currentNextCard = nextCard.classList[1];
  // nextCard.classList.replace(currentNextCard, iconsArray[2]);
  arr += 1;
  let currentCard = nextCard.classList[1];
  nextCard.classList.replace(currentCard, iconsArray[arr]);

  // reset the block colors by removing all matched and show class
  for (i = 0; i < cards.length; i++) {
    cards[i].classList.remove('matched', 'show');
  }

  updateUI();
  // shuffle(iconsArray);
  shuffleIcons();
}

// shuffle the icons
function shuffleIcons() {
  let newArr = [];
  for (i = 0; i < iconsArray.length; i++) {
    // get the collection of icons using DOM
    // store the classnames of each icon in a new array
    newArr.push(iconsCollection[i].classList[1]);
  }
  // shuffle the new array
  shuffle(newArr);
  
  //insert back the newArr to doc using DOM
  
 for (i = 0; i < iconsCollection.length; i++) {
  let currentIcon = iconsCollection[i].classList[1];
   iconsCollection[i].classList.replace(currentIcon, newArr[i])
 }
  console.log(newArr)
}

// click
function click(e) {
  let listItem = e.target;
  scoreNum += 1;
  if (!lockBoxes) { 
    checkForMatch(e);  
    if (listItem.classList[1] === 'matched') {
      updateUI();
      console.log('this is already matched'); 
    } else if (listItem.classList[1] !== 'matched'){
        listItem.classList.add('show');
        lockBoxes = true;
        setTimeout(function() {
          listItem.classList.remove('show');
          lockBoxes = false;
        }, 100);
        console.log('show');
        updateUI();
      }
  }
  announceWin();
}

// check for match!
function checkForMatch(e) {
  const iconsTarget = e.target.firstElementChild;
  if (nextCard.classList[1] === iconsTarget.classList[1]) {
      e.target.classList.add('matched');
      nextCardMatched = true;
      updateNextCard();
      let currentCard = nextCard;
      currentCard.setAttribute('match', 'done');
      arrayForAllMatched.push(currentCard);
      console.log('successful')
  } else if (e.target.classList[1] === 'matched') {
    console.log('this is already matched!');
  }
}

// check if nextCard is already matched
function nextCardChecker() {
  // check if the next card has attribute match
  const iconsArray2 = [
    ['fa-shuttle-space'],
    ['fa-meteor'],
    ['fa-rocket'],
    ['fa-satellite'],
    ['fa-satellite-dish'],
    ['fa-user-astronaut'],
    ['fa-squarespace'git status],
    ['fa-atom'],
    ];
  for (i = 0; i < iconsArray2.length; i++) {
    if (arrayForAllMatched[i] == iconsArray2[i]) {
      matchDone = false;
    } else {
      matchDone = true;
      console.log('this was matched')
    }
      // if (matchDone) {
      }
}

// reset nextCard
function resetNextCard() {
  nextCardChecker(); 
  if (matchDone) {
    arr += 1;
    let currentCard = nextCard.classList[1];
    nextCard.classList.replace(currentCard, iconsArray[arr]);
  } else {
  }
}

// change nextCard image
function updateNextCard() {
  if (nextCardMatched) {
    nextCardMatched = false;
    resetNextCard();
  } 
}

// announce the winner with number of moves as their score
function announceWin() {
  let allMatched = 0;
  for (i = 0; i < listCollection.length; i++) {
    if (listCollection[i].classList[1] === 'matched') {
      allMatched += 1;
    }
  }
  if (allMatched === 12) {
    setTimeout(function() {
      alert(`I'm impressed! You matched all of them in ${scoreNum} moves!`);
    }, 250)
  }
  console.log(allMatched)
}

restartButton.addEventListener("click", restart)
cardsContainer.addEventListener("click", click)