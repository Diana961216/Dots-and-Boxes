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
canvasElement.width = canvasElement.offsetWidth;
canvasElement.height = canvasElement.offsetHeight;

const boardContainerEl = document.querySelector('.board-container')
canvasElement.width = boardContainerEl.offsetWidth;
canvasElement.height = boardContainerEl.offsetHeight;

const numDots = 25


/*-------------------------------- Functions --------------------------------*/
const isAdjacent = (i1, i2) => {
  i1 = Number(i1)
  i2 = Number(i2)
  const diff = Math.abs(i1 - i2)

  if (Math.floor(i1 / 5) === Math.floor(i2 / 5) && diff === 1) return true

  if (diff === 5) return true

  return false
}

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


let selectedDots =[]
allDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const index = e.target.dataset.index
    selectedDots.push(index)
    dot.classList.add('clicked')

    if (selectedDots.length === 2) {
      if (isAdjacent(selectedDots[0], selectedDots[1])) {
        drawLine(selectedDots[0], selectedDots[1])
      } else {
        console.log('not adjacent')
      }
      selectedDots = []
      allDots.forEach(d => d.classList.remove('clicked'))
    }
  })
})


const drawLine = (index1, index2) => {
  const dot1 = allDots[Number(index1)]
  const dot2 = allDots[Number(index2)]

  const rect1 = dot1.getBoundingClientRect()
  const rect2 = dot2.getBoundingClientRect()
  console.log(rect1, rect2)
  const canvasRect = canvasElement.getBoundingClientRect()

  const x1 = rect1.left + rect1.width / 2 - canvasRect.left
  const y1 = rect1.top + rect1.height / 2 - canvasRect.top
  const x2 = rect2.left + rect2.width / 2 - canvasRect.left
  const y2 = rect2.top + rect2.height / 2 - canvasRect.top

  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  
  if (turn === 'X') {
    ctx.strokeStyle = '#D32F2F'
  } else {
    ctx.strokeStyle = '#1976D2'
  }
  ctx.stroke()
  changeTurn()
};

const changeTurn = () => {
    if (turn === 'X') {
        turn = 'O'
    }
    else {
        turn = 'X'
    }
}
/*----------------------------- Event Listeners -----------------------------*/
