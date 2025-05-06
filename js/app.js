/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X';
let board = [
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
    "", "", "", "", "",
  ]  
  let isWinner 
  let isTie

/*------------------------ Cached Element References ------------------------*/
const gameBoardEl = document.querySelector('.game-board')
console.log(gameBoardEl)
const allDots = []
for (let i = 0; i < 25; i++) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.setAttribute('data-index', i)
    allDots.push(dot)
    gameBoardEl.appendChild(dot)
}
console.log(allDots)

const canvasElement = document.querySelector('canvas')
const ctx = canvasElement.getContext('2d')

const numDots = 25



/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = [
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
    ]
    turn = "X"
    isWinner = false
    isTie = false
    render()
  }


  const render = () => {
      console.log('render');
  }
  

/*----------------------------- Event Listeners -----------------------------*/
