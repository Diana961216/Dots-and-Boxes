/*-------------------------------- Constants --------------------------------*/
const drawnLines = new Set();
const boxDotIndexes = [
  [0, 1, 5, 6],    
  [1, 2, 6, 7],    
  [2, 3, 7, 8],    
  [3, 4, 8, 9],    
  [5, 6, 10, 11],  
  [6, 7, 11, 12],  
  [7, 8, 12, 13],  
  [8, 9, 13, 14],  
  [10, 11, 15, 16],
  [11, 12, 16, 17],
  [12, 13, 17, 18],
  [13, 14, 18, 19],
  [15, 16, 20, 21],
  [16, 17, 21, 22],
  [17, 18, 22, 23],
  [18, 19, 23, 24],
  [20, 21, 25, 26],
  [21, 22, 26, 27],
  [22, 23, 27, 28],
  [23, 24, 28, 29],
  [25, 26, 30, 31],
  [26, 27, 31, 32],
  [27, 28, 32, 33],
  [28, 29, 33, 34],
  [30, 31, 35, 36],
]

const boxLines = [
  [[0, 1], [1, 6], [5, 6], [0, 5]],    
  [[1, 2], [2, 7], [6, 7], [1, 6]],   
  [[2, 3], [3, 8], [7, 8], [2, 7]],    
  [[3, 4], [4, 9], [8, 9], [3, 8]],    
  [[5, 6], [6, 11], [10, 11], [5, 10]], 
  [[6, 7], [7, 12], [11, 12], [6, 11]], 
  [[7, 8], [8, 13], [12, 13], [7, 12]], 
  [[8, 9], [9, 14], [13, 14], [8, 13]], 
  [[10, 11], [11, 16], [15, 16], [10, 15]], 
  [[11, 12], [12, 17], [16, 17], [11, 16]], 
  [[12, 13], [13, 18], [17, 18], [12, 17]], 
  [[13, 14], [14, 19], [18, 19], [13, 18]], 
  [[15, 16], [16, 21], [20, 21], [15, 20]], 
  [[16, 17], [17, 22], [21, 22], [16, 21]], 
  [[17, 18], [18, 23], [22, 23], [17, 22]], 
  [[18, 19], [19, 24], [23, 24], [18, 23]], 
  [[20, 21], [21, 26], [25, 26], [20, 25]], 
  [[21, 22], [22, 27], [26, 27], [21, 26]], 
  [[22, 23], [23, 28], [27, 28], [22, 27]], 
  [[23, 24], [24, 29], [28, 29], [23, 28]], 
  [[25, 26], [26, 31], [30, 31], [25, 30]], 
  [[26, 27], [27, 32], [31, 32], [26, 31]], 
  [[27, 28], [28, 33], [32, 33], [27, 32]], 
  [[28, 29], [29, 34], [33, 34], [28, 33]], 
  [[30, 31], [31, 36], [35, 36], [30, 35]], 
];

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

const score1El = document.querySelector('.player1-score')
const score2El = document.querySelector('.player2-score')

const playAgainBtn = document.createElement('button')
const gameOverText = document.createElement('div')

const h1El = document.querySelector('h1')
const welcomeEl = document.querySelector('.welcome')
const howToPlayEl = document.querySelector('.how-to')
const instructionsEl = document.querySelector('.instructions')
const player1IconEl = document.querySelector('.player1-icon')
const player2IconEl = document.querySelector('.player2-icon')








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
    board = Array(25).fill("")
    drawnLines.clear()
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
  if (drawnLines.has(lineKey)) return
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

const showActivePlayer = () => {
  if (turn === 'X') {
    player1IconEl.classList.add('active')
    player2IconEl.classList.remove('active')
  } else {
    player2IconEl.classList.add('active')
    player1IconEl.classList.remove('active')
  }
}

const changeTurn = () => {
    if (turn === 'X') {
      turn = 'O'
    }
    else {
      turn = 'X'
    }
    showActivePlayer()
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
  div.style.position = 'absolute'
  div.style.left = `${centerX}px`
  div.style.top = `${centerY}px`
  div.style.zIndex = '10'

  document.querySelector('.board-container').appendChild(div)
  updateScore(player)
}

const updateScore = (player) => {
   
  if (player === 'X') {
    score1El.textContent = parseInt(score1El.textContent || '0') + 1
  } else {
    score2El.textContent = parseInt(score2El.textContent || '0') + 1
  }
  checkForTie()
  checkForWinner()
 
}

const checkForTie = () => {
  if (score1El.textContent === '8' && score2El.textContent === '8') {
    console.log("It's a tie!")
    isTie = true
    gameOver()
    init()  
  }
}

const checkForWinner = () => {
  const score1 = parseInt(score1El.textContent)
  const score2 = parseInt(score2El.textContent)
  const totalBoxes = 16;

  if (score1 + score2 === totalBoxes) {
    if (score1 > score2) {
      console.log('Player 1 wins!')
      isWinner = true
      gameOver('Player 1')
    } else if (score2 > score1) {
      console.log('Player 2 wins!')
      isWinner = true
      gameOver('Player 2')
    } else {
      console.log("It's a tie!")
      isTie = true
      gameOver()
    }
    
  }
}

const resetButton = document.querySelector('.reset-button')
resetButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    allDots.forEach(dot => dot.classList.remove('clicked'))
    drawnLines.clear()
    score1El.textContent = '0'
    score2El.textContent = '0'
    init()
})

const gameOver = (winner = null) => {
  if(isWinner || isTie){
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    allDots.forEach(dot => dot.classList.remove('clicked'))
    drawnLines.clear()
    score1El.textContent = `${score1El.textContent}`
    score2El.textContent = `${score2El.textContent}`
    gameBoardEl.style.display = 'none'
       

   
    gameOverText.classList.add('game-over-text')
    if (winner) {
      gameOverText.textContent = `${winner} wins!`

      if (winner === 'Player 1') {
        gameOverText.style.color = '#D32F2F' 
      } else if (winner === 'Player 2') {
        gameOverText.style.color = '#1976D2' 
      } else {
        gameOverText.style.color = '#444'
      }

    } else {
      gameOverText.textContent = "It's a tie!"
      gameOverText.style.color = '#9E9E9E' 
    }

    h1El.textContent = "Game Over"
    h1El.style.fontSize = '2rem'
    h1El.style.textAlign = 'center'
    h1El.style.marginTop = '20px'
    h1El.style.left = '51%'
    instructionsEl.style.display = 'none'
    howToPlayEl.style.display = 'none'
    welcomeEl.style.display = 'none'

    document.body.appendChild(gameOverText)

    playAgainBtn.classList.add('play-again-btn')
    playAgainBtn.textContent = "Play Again"
   
    document.body.appendChild(playAgainBtn)
  }
  
  playAgainBtn.addEventListener('click', () => {
    gameBoardEl .style.display = 'grid'
    gameBoardEl.style.gridTemplateColumns = 'repeat(5, 1fr)'
    gameBoardEl.style.gridTemplateRows = 'repeat(5, 1fr)'
    score1El.textContent = '0'
    score2El.textContent = '0'
    h1El.textContent = "Dots and Boxes"
    instructionsEl.style.display = 'block'
    howToPlayEl.style.display = 'block'
    welcomeEl.style.display = 'block'
    gameOverText.remove()
    playAgainBtn.remove()
    init()
  })
}



/*----------------------------- Event Listeners -----------------------------*/
