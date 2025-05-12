const drawnLines = new Set()
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
]


let turn = 'X';
let board = Array(25).fill("")
let isWinner 
let isTie
let firstMove = false


const gameBoardEl = document.querySelector('.game-board')
const allDots = []
for (let i = 0; i < 25; i++) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.setAttribute('data-index', i)
    allDots.push(dot)
    gameBoardEl.appendChild(dot)
}


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
const resetButtonEl = document.querySelector('.reset-button')
const scoreBoardEl = document.querySelector('.scoreboard')
const darkModeBtn = document.querySelector('.switch-mode-btn')


const themeBtn = document.querySelector('.switch-mode-btn')

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

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
    firstMove = false
    document.querySelectorAll('.board-container [id^="box-"]').forEach(el => el.remove())
    render()
  }


const render = () => {
   if(firstMove)showActivePlayer()
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
      } 
      selectedDots = []
      allDots.forEach(d => d.classList.remove('clicked'))
    }
  })
})


const drawLine = (index1, index2) => {
  const lineKey = [Math.min(index1, index2), Math.max(index1, index2)].join('-')
  if (drawnLines.has(lineKey)) return

  if (!firstMove) {
    showActivePlayer()
    firstMove = true
  }
  
  drawnLines.add(lineKey);
  const dot1 = allDots[Number(index1)]
  const dot2 = allDots[Number(index2)]

  const rect1 = dot1.getBoundingClientRect()
  const rect2 = dot2.getBoundingClientRect()
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
 
}

const showActivePlayer = () => {
  if (turn === 'X') {
    player1IconEl.classList.add('active')
    player2IconEl.classList.remove('active')
  } else {
    player2IconEl.classList.add('active')
    player1IconEl.classList.remove('active')
  }
}

const makeComputerMove = () => {
  const possibleMoves = []
  const scoringMoves = []

  for (let i = 0; i < numDots; i++) {
    for (let j = i + 1; j < numDots; j++) {
      if (isAdjacent(i, j)) {
        const key = [i, j].sort((a, b) => a - b).join('-')
        if (!drawnLines.has(key)) {
          possibleMoves.push([i, j])

          let scorePotential = 0

          boxLines.forEach((box) => {
            const lineKeys = box.map(([a, b]) =>
              [Math.min(a, b), Math.max(a, b)].join('-')
            )
            if (lineKeys.includes(key)) {
              const alreadyDrawn = lineKeys.filter(k => drawnLines.has(k)).length
              if (alreadyDrawn === 3) {
                scorePotential++
              }
            }
          })

          if (scorePotential > 0) {
            scoringMoves.push([i, j])
          }
        }
      }
    }
  }

  if (scoringMoves.length > 0) {
    const [index1, index2] = scoringMoves[Math.floor(Math.random() * scoringMoves.length)]
    drawLine(index1, index2)
    checkForBoxCompletion(index1, index2)
    return
  }

  if (possibleMoves.length > 0) {
    const [index1, index2] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    drawLine(index1, index2)
    checkForBoxCompletion(index1, index2)
  }
}

const changeTurn = () => {
  if (turn === 'X') {
    turn = 'O'
    showActivePlayer()
    setTimeout(() => {
      makeComputerMove()
    }, 500)
  } else {
    turn = 'X'
    showActivePlayer()
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
  } else if (currentPlayer === 'O') {
    setTimeout(() => {
      makeComputerMove()
    }, 500)
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
      isWinner = true
      gameOver('Player 1')
    } else if (score2 > score1) {
      isWinner = true
      gameOver('Player 2')
    } else {
      isTie = true
      gameOver()
    }
  }
}

const resetScore = () => {
  score1El.textContent = '0'
  score2El.textContent = '0'
}

const resetButton = document.querySelector('.reset-button')
resetButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    allDots.forEach(dot => dot.classList.remove('clicked'))
    drawnLines.clear()
    resetScore()
    init()
})

const restoreMainScreen = () => {
  gameBoardEl.style.display = 'grid'
  gameBoardEl.style.gridTemplateColumns = 'repeat(5, 1fr)'
  gameBoardEl.style.gridTemplateRows = 'repeat(5, 1fr)'
  h1El.style.display = 'block'
  instructionsEl.style.display = 'block'
  howToPlayEl.style.display = 'block'
  welcomeEl.style.display = 'block'
  resetButtonEl.style.display = 'inline-block'
  document.querySelector('.game-over-container')?.remove()
  scoreBoardEl.classList.remove('scoreboard--game-over')
  document.querySelector('.container').appendChild(scoreBoardEl)
  gameOverText.remove()
  playAgainBtn.remove()
  player1IconEl.classList.remove('active')
  player2IconEl.classList.remove('active')
  turn = 'X'
  firstMove = false
}

const gameOver = (winner = null) => {
  if (isWinner || isTie) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    allDots.forEach(dot => dot.classList.remove('clicked'))
    drawnLines.clear()
    score1El.textContent = `${score1El.textContent}`
    score2El.textContent = `${score2El.textContent}`
    gameBoardEl.style.display = 'none'
    resetButtonEl.style.display = 'none'
    h1El.style.display = 'none'

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

    const gameOverHeading = document.createElement('h1')
    gameOverHeading.textContent = "Game Over"
    gameOverHeading.style.fontSize = '2.5rem'                      
    gameOverHeading.style.textAlign = 'center'
    gameOverHeading.style.margin = '0'                             
                      
    instructionsEl.style.display = 'none'
    howToPlayEl.style.display = 'none'
    welcomeEl.style.display = 'none'

    playAgainBtn.classList.add('play-again-btn')
    playAgainBtn.textContent = "Play Again"

    scoreBoardEl.classList.add('scoreboard--game-over')

    const gameOverContainer = document.createElement('div')
    gameOverContainer.classList.add('game-over-container')

    
    gameOverContainer.appendChild(gameOverHeading)
    gameOverContainer.appendChild(gameOverText)
    gameOverContainer.appendChild(scoreBoardEl)
    gameOverContainer.appendChild(playAgainBtn)
    document.querySelector('.container').appendChild(gameOverContainer)

    playAgainBtn.addEventListener('click', () => {
      restoreMainScreen()
      resetScore()
      init()
    })
  }
}


