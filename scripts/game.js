let canvas;
let keyboard = new Keyboard();
let world;
let startScreen;
let fullscreen = false;
let instructionsVisible = false;
let soundIsMuted = false;
music = new Audio('../audio/main-music.mp3');
let checkAudioInterval;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkAudio();
}

function startGame() {
    document.querySelector('.keyLayout').style.display = 'none';
    world.startScreen.isVisible = false;
    world.draw();
    // music.play();
    playMusic();
}

function showHideInstructions() {
    if (instructionsVisible) {
        document.querySelector('.keyLayout').style.display = 'none';
        instructionsVisible = false;
    }
    else {
        document.querySelector('.keyLayout').style.display = 'block';
        instructionsVisible = true;
    }
}

// play the main sound again after main sound ended
function playMusic() {
    this.music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    });
    this.music.play();
}

// Fullscreen -----------------------------------------------------------
function getFullscreen() {
    const CANVAS = document.getElementById('canvas');
    const BUTTON_BOX = document.querySelector('.buttonContainer');
    if (fullscreen) {
        setCanvasToNormal(CANVAS, BUTTON_BOX);
    }
    else {
        setCanvasToFullscreen(CANVAS, BUTTON_BOX);
    }
}

function setCanvasToNormal(CANVAS, BUTTON_BOX) {
    // canvas width and heigth
    CANVAS.style.width = '720px'
    CANVAS.style.height = '480px';
    // canvas border style
    CANVAS.style.border = 'solid 2px rgba(0, 0 ,0 , 0.4)';
    CANVAS.style.borderRadius = '10px';
    // button box
    BUTTON_BOX.style.width = '720px';
    BUTTON_BOX.style.height = '480px';
    fullscreen = false;
}

function setCanvasToFullscreen(CANVAS, BUTTON_BOX) {
    // canvas width and heigth
    CANVAS.style.width = '100%';
    CANVAS.style.height = '100vh';
    // canvas border style
    CANVAS.style.border = 'none';
    CANVAS.style.borderRadius = '0';
    // button box
    BUTTON_BOX.style.width = '100%';
    BUTTON_BOX.style.height = '100vh';
    fullscreen = true;
}

function tryAgain() {
    world.clearAllIntervals();
    setTimeout(() => {
        document.querySelector('.endScreen').style.display = 'none';
        init();
        world.loadNewLevel();
        canvas.getContext('2d').globalAlpha = 1;
        startGame();
        world.run();
        clearInterval(checkAudioInterval);
        checkAudio();
    }, 500);
}

// Audio ----------------------------------------------------------------------------------------------
function switchAudio() {
    if (soundIsMuted) { soundIsMuted = false; }
    else { soundIsMuted = true; }
}

function checkAudio() {
    checkAudioInterval = setInterval(() => {
        if (soundIsMuted) { turnAudioOff(); }
        else { turnAudioOn(); }
    }, 500)
}

function turnAudioOff() {
    document.querySelector('.audioImg').src = "../icons/volume_mute.svg"
    music.volume = 0;
    world.audios.forEach((audio) => {
        audio.volume = 0;
    })
}

function turnAudioOn() {
    document.querySelector('.audioImg').src = "../icons/volume_up.svg"
    music.volume = 0.8;
    world.audios.forEach((audio) => {
        audio.volume = 0.8;
    })
}

// Adjust the key Instructions for mobile or desktop
document.addEventListener('DOMContentLoaded', () => { 
    window.addEventListener('resize', setKeyInstructions); 
});

function setKeyInstructions() {
    if (window.innerWidth <= 720) {setKeyInstruktionsMobile();}
    else{setKeyInstruktionsDesktop();}
}

function setKeyInstruktionsMobile() {
    document.querySelector('.tdMoveRight').innerHTML = '<img src="../icons/move_rigth.svg" alt="right arrow">';
    document.querySelector('.tdMoveLeft').innerHTML = '<img src="../icons/move_left.svg" alt="left arrow">';
    document.querySelector('.tdJump').innerHTML = '<img src="../icons/jump.svg" alt="up arrow">';
    document.querySelector('.tdThrowBottle').innerHTML = '<img src="../icons/throw.svg" alt="throw">';
}

function setKeyInstruktionsDesktop() {
    document.querySelector('.tdMoveRight').innerHTML = '<img src="../icons/arrow_right.svg" alt="Arrow-Right">Right Arrow';
    document.querySelector('.tdMoveLeft').innerHTML = '<img src="../icons/arrow_left.svg" alt="Arrow-Left">Left Arrow';
    document.querySelector('.tdJump').innerHTML = '<img src="../icons/space_bar.svg" alt="Space">Space';
    document.querySelector('.tdThrowBottle').innerHTML = '<img src="../icons/keyboard.svg" alt="Space">D';
}

/**
 * Set event listners for mobile buttons
 * move left
 * move right
 * throw bottle
 * jump
 */
document.addEventListener('DOMContentLoaded', () => { setButtonEvents(); });

function setButtonEvents() {
    const MOVE_LEFT_BUTTON = document.querySelector('.moveLeftButton');
    const MOVE_RIGHT_BUTTON = document.querySelector('.moveRightButton');
    const JUMP_BUTTON = document.querySelector('.jumpButton');
    const THROW_BOTTLE_BUTTON = document.querySelector('.throwBottleButton');
    setButtonTouchEvent(MOVE_LEFT_BUTTON, MOVE_RIGHT_BUTTON, THROW_BOTTLE_BUTTON, JUMP_BUTTON);
}

function setButtonTouchEvent(moveLeft, moveRight, throwBottle, jump) {
    // move left
    moveLeft.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });
    moveLeft.addEventListener('touchend', () => { keyboard.LEFT = false; });
    // moveRight
    moveRight.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    moveRight.addEventListener('touchend', () => { keyboard.RIGHT = false; });
    // throw bottle
    throwBottle.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });
    throwBottle.addEventListener('touchend', () => { keyboard.D = false; });
    // jump
    jump.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });
    jump.addEventListener('touchend', () => { keyboard.SPACE = false; });
}

/**
 * set event listner for keydown and keyup
 * right / D = move right
 * left / A = move left
 * space = jump
 * d = throw bottle
 */
window.addEventListener('keydown', (e) => {
    if (e['keyCode'] == 39) {
        keyboard.RIGHT = true;
    }
    if (e['keyCode'] == 37) {
        keyboard.LEFT = true;
    }
    if (e['keyCode'] == 38) {
        keyboard.UP = true;
    }
    if (e['keyCode'] == 40) {
        keyboard.DOWN = true;
    }
    if (e['keyCode'] == 32) {
        keyboard.SPACE = true;
    }
    if (e['keyCode'] == 65) {
        keyboard.A = true;
    }
    if (e['keyCode'] == 87) {
        keyboard.W = true;
    }
    if (e['keyCode'] == 83) {
        keyboard.S = true;
    }
    if (e['keyCode'] == 68) {
        keyboard.D = true;
    }
    if (e['keyCode'] == 83) {
        keyboard.F = true;
    }
});

document.addEventListener('keyup', (e) => {

    if (e['keyCode'] == 39) {
        keyboard.RIGHT = false;
    }
    if (e['keyCode'] == 37) {
        keyboard.LEFT = false;
    }
    if (e['keyCode'] == 38) {
        keyboard.UP = false;
    }
    if (e['keyCode'] == 40) {
        keyboard.DOWN = false;
    }
    if (e['keyCode'] == 32) {
        keyboard.SPACE = false;
    }
    if (e['keyCode'] == 65) {
        keyboard.A = false;
    }
    if (e['keyCode'] == 87) {
        keyboard.W = false;
    }
    if (e['keyCode'] == 83) {
        keyboard.S = false;
    }
    if (e['keyCode'] == 68) {
        keyboard.D = false;
    }
    if (e['keyCode'] == 83) {
        keyboard.F = false;
    }
});
