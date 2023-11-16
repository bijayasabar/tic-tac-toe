console.log('Hii Tribeni');
let audioTurn = new Audio('ting.mp3');
let gameEndingMus= new Audio('gameover.mp3')
let gameIsOver = false;

let turn = 'X';

// function to change the turn
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
};

// function to check win
let checkWin = () => {
    let boxText = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e => {
        if (
            boxText[e[0]].innerText === boxText[e[1]].innerText &&
            boxText[e[1]].innerText === boxText[e[2]].innerText &&
            boxText[e[0]].innerText !== ''
        ) {
            document.querySelector('.info').innerText =
                boxText[e[0]].innerText + ' Won';
            gameIsOver = true; // Move this line outside the forEach loop
            updateGameEnding();
        }
    });
};

// Function to update game state on win
const updateGameEnding = () => {
    document.querySelector('.imageBox img').style.width = '200px';
    gameEndingMus.play();
};

// Game Logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText'); // it refers to the subtree of the parent box
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!gameIsOver) {
                document.querySelector('.info').innerText =
                    'Turn For ' + turn;
                // index number is necessary to add on, otherwise use querySelector
            }
        }
    });
});

let reset = document.getElementById('reset');
reset.addEventListener('click', ()=>{
    let boxText=document.querySelectorAll('.boxText')
    Array.from(boxText).forEach(element=>{
        element.innerText='';
    })
    turn='X';
    gameIsOver = false;
    document.getElementsByClassName('info')[0].innerText = 'Turn For ' + turn;
    document.querySelector('.imageBox img').style.width = '0px';

})