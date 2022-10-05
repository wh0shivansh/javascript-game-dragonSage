const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const gameBox = document.getElementById('game-box');

const jumpSound = document.getElementById('jump-sound');
const crashSound = document.getElementById('crash-sound');
const crawlSound = document.getElementById('crawl-sound');

const jumpBtn = document.getElementById('jump-btn');
const crawlBtn = document.getElementById('shoot-btn');
const currentScore = document.getElementById('current-score-board');
const highScore = document.getElementById('high-score-board');

const startBtn = document.getElementById('start-btn');
const optionsBtn = document.getElementById('options-btn');
const quitBtn = document.getElementById('quit-btn');
const restartBtn = document.getElementById('restart-btn');
const mainMenu = document.getElementById('main-menu');
const restartMenu = document.getElementById('restart-menu');

var gameRunning = false;
let  changeState=false;

function absDiff(a,b){
    if(a>=b){
        return a-b;
    }
    else{
        return b-a;
    }
}


startBtn.addEventListener('click',()=>{
    mainMenu.style.display="none";
    gameRunning=true;
    changeState=true;
    enemy.style.animation="enemyMotion 2s linear infinite";
})

quitBtn.addEventListener('click',()=>{
    mainMenu.style.display="flex";
    restartMenu.style.display="none";
    gameRunning=false;
})

restartBtn.addEventListener('click',()=>{
    restartMenu.style.display="none";
    enemy.style.animation="enemyMotion 2s linear infinite";
    gameRunning=true;
})

jumpBtn.addEventListener('click',()=>{
    jump();
})
crawlBtn.addEventListener('click',()=>{
    crawl();
})

const jump=()=>{
    player.classList.add('playerJump');
    jumpSound.play();
    setTimeout(()=>{
        player.classList.remove('playerJump');
    },600);
}

const crawl=()=>{
    player.classList.add('playerCrawl');
    crawlSound.play();
    setTimeout(()=>{
        player.classList.remove('playerCrawl');
    },500);
}

var checkCollision = setInterval(()=>{
    var playerPosTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    var playerPosLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    var enemyPosLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    var enemyPosTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"));
    // console.log(playerPosLeft);
    // console.log(playerPosTop);
    // console.log(enemyPosTop);

    if((absDiff(playerPosLeft,enemyPosLeft) < 15) && playerPosTop>=130 && enemyPosTop==130){
        crashSound.play();
        enemy.style.animation="none";
        if(parseInt(highScore.innerText) < score){
            highScore.innerText=score;
        }
        score=0;
        gameRunning=false;
        restartMenu.style.display="flex";
    }    
    else if((absDiff(playerPosLeft,enemyPosLeft) < 20) && playerPosTop<=160 && enemyPosTop==105){
        crashSound.play();
        enemy.style.animation="none";
        if(parseInt(highScore.innerText) < score){
            highScore.innerText=score;
        }
        score=0;
        gameRunning=false;
        restartMenu.style.display="flex";
    }

    if(gameRunning == false){
        enemy.style.animation="none";
    }
    else if(gameRunning==true){
        enemy.style.animation="enemyMotion 2s linear infinite";
    }

},10);

    var enemyNewPos = setInterval(()=>{
        var posList = [105,130];
        var newpos = Math.floor(Math.random() * 2);
        // console.log(newpos);
        enemy.style.top=`${posList[newpos]}px`;
    },2000);



var score = 0;
const scoreUpdate = setInterval(()=>{
    currentScore.innerHTML=score;
    score++;
},800);