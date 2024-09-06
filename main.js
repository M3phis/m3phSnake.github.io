const gameBoard = document.querySelector(".gameBoard")
const ctx = gameBoard.getContext('2d')
ctx.fillStyle = 'green'
const unitSize = 25
let direction = 1

let yvelocity=0; //move one tile up
let xvelocity=1;
let pause = true
let interval;
let headX;
let headY;
const BOARD_SIZE = 500
let foodPos
let score =0;

const snake = [{x:0,y:0},
               {x:1,y:0},
               {x:2,y:0},
               {x:3,y:0}]   

//console.log(snake)
//console.log(snake)
function drawSnake(){
    ctx.fillStyle = 'green'

    snake.forEach(cell => {
        ctx.fillRect(cell.x * unitSize, cell.y * unitSize, unitSize,unitSize)
    }
    )
}

drawSnake()
function playGame(){
    if (pause) return
 let gameOn = true;

 interval = setInterval(nextTick,100)
 console.log(headX)
 console.log(headY)
 
}
//game loop --- 
/*
Every X time, snake moves in DIRECTION.
If snake eats food, it grows AND food disappears and appears somwhere else
If snake hits itself - game over
if snake hits walls - game over 
snake cannot turn to direction he came from
*/
function nextTick(){
    moveSnake()
    if (isFood()){
        score++
        console.log(isFood())
        console.log("Score: ", score);
        
        growSnake()
        //clearFood()
        drawFood(generateNewFood())
    }
    if( isGameOver()) clearInterval(interval)

}
document.body.addEventListener('keydown',(e)=>keyDown(e))
function keyDown(event)
//up
{
//console.log(event);

if (event.code === 'Space' && pause === false) {
    console.log("PAUSE")
    pause = true 
    //console.log(pause)
    clearInterval(interval)
    console.log("Game is pasued: ", pause)

}

else if (event.code === 'Space' && pause === true) {
    pause = false
    playGame()

 
    
}
if (pause) return

    if(event.keyCode==38 && yvelocity !== 1){
        yvelocity=-1; //move one tile up
        xvelocity=0;


    }
    //down
    if(event.keyCode==40 && yvelocity !== -1){
        yvelocity=1;//move one tile down
        xvelocity=0;
    }
//left
    if(event.keyCode==37 && xvelocity !== 1){
        yvelocity=0;
        xvelocity=-1;//move one tile left
    }
    //right
    if(event.keyCode==39 && xvelocity !== -1){
        yvelocity=0;
        xvelocity=1;//move one tile right
    }
}
function moveSnake(){


   let newPart = {x:snake[snake.length-1].x, y: snake[snake.length-1].y} 
    newPart.x +=  1 * xvelocity
    newPart.y += 1 * yvelocity
    headY = newPart.y * unitSize
    headX = newPart.x * unitSize
    
 
    snake.push(newPart)
   let removedPart = snake.shift()

   ctx.clearRect(removedPart.x * unitSize, removedPart.y * unitSize, unitSize, unitSize)
    drawSnake()
}
function eatFood(){

}
function generateNewFood(){
     foodPos = {x:Math.floor(Math.random()* (BOARD_SIZE/unitSize)) *unitSize , y:Math.floor(Math.random()* (BOARD_SIZE/unitSize))*unitSize}

    return foodPos
}

function drawFood(foodPos){
    ctx.fillStyle= 'red'
    ctx.fillRect(foodPos.x,foodPos.y,unitSize,unitSize)
}



console.log(generateNewFood())
drawFood(generateNewFood())

function isGameOver(){
    //has started?
    if (pause) return false
    if (yvelocity === 0 & xvelocity === 0) {
        console.log("Game hasn't started")
        return false;
    }
  //edges
    else if (headX < 0 || headX > BOARD_SIZE ||
             headY < 0 || headY > BOARD_SIZE   
    ){
        console.log("Game is over")
        return true
    }
  //touched yourself
  else if (oroboros()){
    console.log("You ate yourself and loss")
    return true
  }


    console.log("Game is running")

    return false
}


function isFood(){
    if (headX === foodPos.x && headY === foodPos.y) return true
    return false
}

playGame()

function growSnake(){
    let newPart = {x:snake[snake.length-1].x, y: snake[snake.length-1].y} 
    newPart.x +=  1 * xvelocity
    newPart.y += 1 * yvelocity
    headY = newPart.y * unitSize
    headX = newPart.x * unitSize
    
 
    snake.push(newPart)
}

function oroboros(){
    for (let i = 0; i < snake.length - 1; i++) {
        if (headX === snake[i].x * unitSize && headY === snake[i].y * unitSize) return true        
    }
}