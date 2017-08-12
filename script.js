var mainElement = document.getElementById("main");
var speed = 150;
var sizeX = 4;
var sizeY = 4;
var head;
var newHead;
var tail;
var newTail;
var body;
var headX = 3;
var headY = Math.floor(sizeY / 2);
var step = 4;
var directionX = 1;
var directionY = 0;
var intervalId;

window.onload = function () {
    createGrid();
    createApple();
    intervalId = setInterval(mainFunc, speed);
};

/*
Main function
 */
function mainFunc() {
    newHead = mainElement.childNodes[headY + directionY].childNodes[headX + directionX];

    /*
    Check if end of square
     */
    if (newHead === undefined) {
        clearInterval(intervalId);
        alert("CRASH!! YOU ARE NOT A GHOST");
    }

    /*
    Check if eat yourself
     */
    if (newHead.className !== 'cell') {
        clearInterval(intervalId);
        alert("CRASH!! DON`T EAT YOURSELF");
    }

    /*
    Check if next field is free
     */
    if (newHead.id === '') {
        moveSnake();
    }

    /*
    Check if next fiel is apple
     */
    if (newHead.id === 'apple') {
        eatApple();
        createApple();
    }
    changeHeadXY();
}

/*
Set new coordinates of the snake head
 */
function changeHeadXY() {
    headX = headX + directionX;
    headY = headY + directionY;
}

/*
Move snake head forward
 */
function moveHead() {
    newHead.setAttribute('class', 'head');
    newHead.setAttribute('id', ++step);
    head.setAttribute('class', 'sbody');
    head = newHead;
}

/*
Move snake tail on one step
*/
function moveTail() {
    var tailId = tail.id;
    newTail = document.getElementById(++tailId);
    newTail.setAttribute('class', 'tail');
    tail.removeAttribute('id');
    tail.setAttribute('class', 'cell');
    tail = newTail;
}

/*
Create random apple
 */
function createApple() {
    var apple;
    do {
        apple = mainElement.childNodes[Math.floor(Math.random() * sizeY)].childNodes[Math.floor(Math.random() * sizeX)];
    } while (apple.className !== 'cell');
    apple.setAttribute('id', 'apple');
}

/*
Move snake forward
 */
function moveSnake() {
    moveHead();
    moveTail();
}

/*
Eat apple
 */
function eatApple() {
    moveHead();
}

/*
Create grid
*/
function createGrid() {
    for (var iteratorY = 0; iteratorY < sizeY; iteratorY++) {
        var row = mainElement.appendChild(createRow());
        for (var iteratorX = 0; iteratorX < sizeX; iteratorX++) {
            row.appendChild(createCell());
        }
    }
    setStart();
}

/*
Create simple div
*/
function createDiv() {
    return document.createElement('div');
}

/*
Create div with row style
*/
function createRow() {
    var result = createDiv();
    result.setAttribute('class', 'row');
    return result;
}

/*
Create div with cell style
*/
function createCell() {
    var result = createDiv();
    result.setAttribute('class', 'cell');
    return result;
}

/*
Set snake start
*/
function setStart() {
    head = mainElement.childNodes[headY].childNodes[headX];
    head.setAttribute('class', 'head');
    head.setAttribute('id', 4);
    body = mainElement.childNodes[headY].childNodes[2];
    body.setAttribute('class', 'sbody');
    body.setAttribute('id', 3);
    body = mainElement.childNodes[headY].childNodes[1];
    body.setAttribute('class', 'sbody');
    body.setAttribute('id', 2);
    tail = mainElement.childNodes[headY].childNodes[0];
    tail.setAttribute('class', 'tail');
    tail.setAttribute('id', 1);
}

/*
Change direction on key press
 */
window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            //left
            directionX = -1;
            directionY = 0;
            break;
        case 38:
            //up
            directionX = 0;
            directionY = -1;
            break;
        case 39:
            //right
            directionX = 1;
            directionY = 0;
            break;
        case 40:
            //down
            directionX = 0;
            directionY = 1;
            break;
    }
};