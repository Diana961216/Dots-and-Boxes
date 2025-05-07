/*-------------------------------- Constants --------------------------------*/
const drawnLines = new Set();
const boxDotIndexes = [
  [0, 1, 5, 6],
  [1, 2, 6, 7],
  [5, 6, 10, 11],
  [6, 7, 11, 12],
  [10, 11, 15, 16],
  [11, 12, 16, 17],
  [15, 16, 20, 21],
  [16, 17, 21, 22],
  [20, 21, 25, 26],
  [21, 22, 26, 27],
]
const boxLines= [
  [[0, 1], [1, 6], [5, 6], [0, 5]],
  [[1, 2], [2, 7], [6, 7], [1, 6]],
  [[5, 6], [6, 11], [10, 11], [5, 10]],
  [[6, 7], [7, 12], [11, 12], [6, 11]],
  [[10, 11], [11, 16], [15, 16], [10, 15]],
  [[11, 12], [12, 17], [16, 17], [11, 16]],
  [[15, 16], [16, 21], [20, 21], [15, 20]],
  [[16, 17], [17, 22], [21, 22], [16, 21]],
  [[20, 21], [21, 26], [25, 26], [20, 25]],
  [[21, 22], [22, 27], [26, 27], [21, 26]],
]

/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X';
let board = Array(25).fill(""); 
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
        checkForBoxCompletion(selectedDots[0], selectedDots[1])
      } else {
        console.log('not adjacent')
      }
      selectedDots = []
      allDots.forEach(d => d.classList.remove('clicked'))
    }
  })
})


const drawLine = (index1, index2) => {
  const lineKey = [Math.min(index1, index2), Math.max(index1, index2)].join('-')
 drawnLines.add(lineKey);
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
  ctx.lineWidth = 5
  
  if (turn === 'X') {
    ctx.strokeStyle = '#D32F2F'
  } else {
    ctx.strokeStyle = '#1976D2'
  }
  ctx.stroke()
 
};

const changeTurn = () => {
    if (turn === 'X') {
        turn = 'O'
    }
    else {
        turn = 'X'
    }
}


const checkForBoxCompletion = (index1, index2) => {
  const currentPlayer = turn
  let boxCompleted = false

  boxLines.forEach((box, i) => {
    const allLinesDrawn = box.every(([a, b]) => {
      const lineKey = [Math.min(a, b), Math.max(a, b)].join('-')
      return drawnLines.has(lineKey)
    })

    if (allLinesDrawn && !document.getElementById(`box-${i}`)) {
      fillBox(box, i, currentPlayer)
      boxCompleted = true
    }
  })

  if (!boxCompleted) {
    changeTurn()
  }
}

const fillBox = (box, boxIndex, player) => {
  const [d1, d2, d3, d4] = boxDotIndexes[boxIndex].map(i => allDots[i].getBoundingClientRect())
  const canvasRect = canvasElement.getBoundingClientRect()

  const centerX = ((d1.left + d4.right) / 2) - canvasRect.left
  const centerY = ((d1.top + d4.bottom) / 2) - canvasRect.top

  ctx.fillStyle = player === 'X' ? '#D32F2F' : '#1976D2'
  ctx.font = '20px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(player === 'X' ? 'P1' : 'P2', centerX, centerY)

  const div = document.createElement('div')
  div.id = `box-${boxIndex}`
  document.body.appendChild(div)
}
/*----------------------------- Event Listeners -----------------------------*/
