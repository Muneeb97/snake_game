const Canva = document.getElementById("canvas");
const Canva_data = Canva.getContext("2d");
const speed_cntrl = document.getElementById('speed_cntrl');
const restart_button = document.getElementById('restart');
var speed = "" ;
var gameover = document.getElementById('gameover');

// create the unit
const box = 32;

const Base_img = new Image();
Base_img.src = "Base.png";

const bug_img = new Image();
bug_img.src = "bug.png";

const bug_img2 = new Image();
bug_img2.src = "bug2.png";

// create the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// initiate score
let score = 0;

// randomly place food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let bonus = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


//configure movement
let d_move;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        d_move = "LEFT";
    }else if(key == 38){
        d_move = "UP";
    }else if(key == 39){
        d_move = "RIGHT";
    }else if(key == 40){
        d_move = "DOWN";
    }
}

//collision scenario
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// create canvas
function draw(){
    
    Canva_data.drawImage(Base_img,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        Canva_data.fillStyle = ( i == 0 )? "green" : "white";
        Canva_data.fillRect(snake[i].x,snake[i].y,box,box);
        Canva_data.clearRect(snake[i].x+4,snake[i].y+4,box-8,box-8);
    }
    
    if(score % 10 == 0 && score > 1){
        Canva_data.drawImage(bug_img2, bonus.x, bonus.y);
    }
    Canva_data.drawImage(bug_img, food.x, food.y);
  


    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d_move == "LEFT") snakeX -= box;
    if( d_move == "UP") snakeY -= box;
    if( d_move == "RIGHT") snakeX += box;
    if( d_move == "DOWN") snakeY += box;
    
    
     //bonus
    if(snakeX == bonus.x && snakeY == bonus.y){
        score = score + 5;
        bonus = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    // if the snake eats the food
    else if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
     // we don't remove the tail
    else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        gameover.innerHTML = "Game Over";
    }
    
    snake.unshift(newHead);
    
    Canva_data.fillStyle = "red";
    Canva_data.font = "45px Franklin Gothic Medium";
    Canva_data.fillText(score,6*box,1.4*box);
}
let game = 0 ;
function speed_change(){
    speed = document.getElementById('speed').value;
    //console.log(speed);
    game = setInterval(draw,speed);
    
}

function restart(){
    snake = []
    snake[0] = {
        x : 9 * box,
        y : 10 * box
    };
    score = 0;
    gameover.innerHTML = "";
    speed_change();
}

restart_button.addEventListener('click',restart);
speed_cntrl.addEventListener('click', speed_change);
