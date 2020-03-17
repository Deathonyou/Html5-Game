var textGirl = document.getElementById('textGirl');
var textGreen = document.getElementById('textGreen');
var textMan = document.getElementById('textMan');
var textKabi = document.getElementById('textKabi');
var textDuck = document.getElementById('textDuck');
var textBoard = document.getElementById('textBoard');
var text = document.getElementById('text');
var textTemplate = document.querySelector('.textTemplate');

var ctx;
var npcImg;
var brickImg;
var mapImg;
var mapArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

];
var size = 32;
var npc = new Npc(11, 10);

function Npc (x, y) {
    this.x = x;
    this.y = y;


    this.moveUp = function () {
        if (this.y === 0 || mapArray[this.y-1][this.x] === 1) {
            return;
        }
        // console.log(this.x);
        this.y -= 1;
        console.log('x'+ npc.x +'y'+ npc.y);
        if (npc.y === 11 && npc.x === 11){
            console.log('就是这位');
            talk();
        }
    }

    this.moveRight = function () {
        if (this.x === mapArray[0].length - 1 || mapArray[this.y][this.x+1] === 1) {
            return;
        }
        this.x += 1;
    }

    this.moveDown = function () {
        // npc.style.animation = 'animS 1.2s infinite';
        if (this.y === mapArray.length - 1 || mapArray[this.y+1][this.x] === 1) {
            return;
        }
        this.y += 1;
    }

    this.moveLeft = function () {
        if (this.x === 0 || mapArray[this.y][this.x-1] === 1) {
            return;
        }
        this.x -= 1;
    }
}

function drawNpc (preX, preY) {
    // 将原先的小球清掉画新的小球
    ctx.drawImage(mapImg , 0 , 0);
    drawMap();
    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(preX * size, preY * size, size, size);
    ctx.drawImage(npcImg, 30, 10, 196, 196, npc.x * size, npc.y * size, size, size);
    isEnd() && winGame();
}

function drawMap () {
    for (var y = 0; y < mapArray.length; y++) {
        for (var x = 0; x < mapArray[y].length; x++) {
            mapArray[y][x] === 1 && ctx.drawImage(brickImg, 656, 16, 16, 16, x * size, y * size, size, size);
        }
    }
}

function winGame () {
    document.keydown = function (event) {}
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 800, 600);

    ctx.font = '50px Verdana';
    var gradient = ctx.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'purple');
    gradient.addColorStop('1', 'blue');

    ctx.fillStyle = gradient;
    ctx.fillText('WIN!', 100, 200);
}

function isEnd () {
    return npc.x === mapArray[0].length - 1  && npc.y === mapArray.length - 1;
}

//取消对话框
var cancelTalk = function(){
    text.style.display = 'none';
    textGirl.style.display = 'none';
    textBoard.style.display = 'none';
    textKabi.style.display = 'none';
    textDuck.style.display = 'none';
    textGreen.style.display = 'none';
    textMan.style.display = 'none';
    textTemplate.style.display = 'none';
};

/** 键盘事件 */
document.onkeydown = function (event) {
    if (isEnd()) {
        return;
    }
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var flag = true;
    var preX = npc.x;
    var preY = npc.y;
    switch (e.keyCode) {
        case 38:
            // npcImg.style.animation = 'animW 1.2s infinite';
            // npcImg.src = "imgs/images/red3_14.png";
            // var changeImg = function(){
            //     // npcImg.src = "imgs/images/red3_14.png";
            //     window.setInterval(function () {
            //         npcImg.src = "imgs/images/red3_14.png";
            //         // npcImg.style.content = "url('imgs/images/red3_15.png')";
            //     },500);
            // };
            // changeImg();
            npc.moveUp();
            // npcImg.src = "imgs/images/red3_14.png";
            break;
        case 32:
            //对话部分
            if (npc.x === 14 && npc.y ===8){
                //girl对话
                cancelTalk();
                text.style.display = 'block';
                textGirl.style.display = 'block';
            }else if (npc.x === 10 && npc.y === 10){
                //board对话
                cancelTalk();
                text.style.display = 'block';
                textBoard.style.display = 'block';
            }else if (npc.x === 4 && npc.y === 9){
                //kabi对话
                cancelTalk();
                text.style.display = 'block';
                textKabi.style.display = 'block';
            }else if (npc.x === 4 && npc.y === 8){
                //kabi对话
                cancelTalk();
                text.style.display = 'block';
                textKabi.style.display = 'block';
            }else if (npc.x === 15 && npc.y === 8){
                //duck对话
                cancelTalk();
                text.style.display = 'block';
                textDuck.style.display = 'block';
            }else if (npc.x === 4 && npc.y === 15){
                //Green对话
                cancelTalk();
                text.style.display = 'block';
                textGreen.style.display = 'block';
            }else if (npc.x === 21 && npc.y === 9){
                //Man对话
                cancelTalk();
                text.style.display = 'block';
                textMan.style.display = 'block';
            }else if (npc.x === 22 && npc.y === 10){
                //Man对话
                cancelTalk();
                text.style.display = 'block';
                textMan.style.display = 'block';
            }else {
                cancelTalk();
            }
            break;
        case 39:
            // npcImg.src = "imgs/images/red3_10.png";
            npc.moveRight();
            // npcImg.src = "imgs/images/red3_10.png";
            break;
        case 40:
            // npcImg.src = "imgs/images/red3_02.png";
            npc.moveDown();
            // npcImg.src = "imgs/images/red3_02.png";
            break;
        case 37:
            // npcImg.src = "imgs/images/red3_08.png";
            npc.moveLeft();
            // npcImg.src = "imgs/images/red3_08.png";
            break;
        case 87:
            npc.moveUp();
            break;
        case 83:
            npc.moveDown();
            break;
        case 65:
            npc.moveLeft();
            break;
        case 68:
            npc.moveRight();
            break;
        default:
            flag = false;
            break;
    }
    flag && drawNpc(preX, preY);
};



onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // ctx.fillStyle = '#bababa';
    // ctx.fillRect(0, 0, 800, 600);


    npcImg = document.getElementById('npc');
    brickImg = document.getElementById('brick');
    mapImg = document.getElementById('map');
    ctx.drawImage(mapImg , 0 , 0);

    drawNpc();
    drawMap();
}