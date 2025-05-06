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
  


let selectedDots =[]
allDots.forEach(dot =>{
  dot.addEventListener('click', (e) =>{
    const index = e.target.dataset.index
    selectedDots.push(index)
    dot.classList.add('clicked')
   

    if(selectedDots.length === 2) {
      drawLine(selectedDots[0], selectedDots[1])
      selectedDots = []
      allDots.forEach(d => d.classList.remove('clicked'))
    }
  })
})


const drawLine = (index1, index2) => {
  const dot1 = allDots[index1]
  const dot2 = allDots[index2]

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
  ctx.strokeStyle = 'red'
  ctx.stroke()
};


/*----------------------------- Event Listeners -----------------------------*/
