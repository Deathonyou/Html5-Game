var ctx;
var npcImg;
var brickImg;
var mapImg;
var mapArray = [
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],

];
var size = 40;
var npc = new Npc(0, 0);

function Npc (x, y) {
    this.x = x;
    this.y = y;

    this.moveUp = function () {
        if (this.y === 0 || mapArray[this.y-1][this.x] === 1) {
            return;
        }
        this.y -= 1;
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
        default:
            flag = false;
            break;
    }
    flag && drawNpc(preX, preY);
}

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
