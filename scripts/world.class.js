class World {
    keyboard;
    healthBar = new StatusBar('life', 0, 0);
    bottleBar = new StatusBar('bottle', 0, 45);
    coinBar = new StatusBar('coin', 0, 90);
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    startScreen = new StartScreen();
    playerMeetsBossFirstTime = true;
    percentage = 0;
    character;
    intervals = [];
    cameraX = 0;

    collectCoinAudio = new Audio('../audio/collectCoin.mp3');
    scream = new Audio('../audio/chicken-scream.mp3');
    breakingBottle = new Audio('../audio/bottle-smash.mp3');

    audios = [this.collectCoinAudio, this.scream, this.breakingBottle];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character(this);
        this.setBackground();
        this.setWorld();
        this.drawStartScreen();
        this.run();
    }

    setBackground() {
        let x = 1;

        for (let i = 1; i < 15; i++) {
            if (x == 1) { x = 2; }
            else { x = 1; }
            this.level.backgroundObjects.push(new BackgroundObject('../img_pollo_locco/img/5_background/layers/air.png', 719 * i));
            this.level.backgroundObjects.push(new BackgroundObject(`../img_pollo_locco/img/5_background/layers/3_third_layer/${x}.png`, 719 * i));
            this.level.backgroundObjects.push(new BackgroundObject(`../img_pollo_locco/img/5_background/layers/2_second_layer/${x}.png`, 719 * i));
            this.level.backgroundObjects.push(new BackgroundObject(`../img_pollo_locco/img/5_background/layers/1_first_layer/${x}.png`, 719 * i));
        }
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.setIntervalByParameter(() => this.checkCollisionsWithEnemies(), 100);
        this.setIntervalByParameter(() => this.checkCollisionsWithEndBoss(), 100);
        this.setIntervalByParameter(() => this.checkTrowableObjects(), 100);
        this.setIntervalByParameter(() => this.checkForBossFight(), 100);
        this.sounds();
    }

    checkTrowableObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.bottleBar.changePercentageValue(this.bottleBar.percentage - 20);
            this.throwableObjects.push(bottle);
            this.keyboard.D = false;
        }
    }

    gameOver() {
        this.ctx.globalAlpha = 0.8;
        document.getElementById('endScreenText').innerHTML = 'GAME OVER';
        document.querySelector('.endScreen').style.display = 'flex';
    }

    showEndScreen() {
        this.ctx.globalAlpha = 0.8;
        document.getElementById('endScreenText').innerHTML = 'VICTORY';
        document.querySelector('.endScreen').style.display = 'flex';
    }

    // Check Collision ----------------------------------------------------------------------------------------------------------
    checkCollisionsWithEnemies() {
        // Enemies
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpOnEnemy(enemy)) {
                this.enemyGetHit(enemy);
            }
            else if (this.characterCollideWithEnemy(enemy)) {
                this.characterGetHit();
            }
            this.throwableObjects.forEach((object) => {
                if (enemy.isColliding(object)) {
                    enemy.hit();
                }
            });
            this.throwableObjectCollide();
        });

        this.throwableObjectCollide();
        // Coins
        this.selectCoins();
        // Bottles
        this.selectTrowables();
    }

    checkCollisionsWithEndBoss() {
        // Endboss
        if (this.characterJumpOnEnemy(this.level.boss[0])) {
            this.enemyGetHit(this.level.boss[0]);
        }
        else if (this.characterCollideWithEnemy(this.level.boss[0])) {
            this.characterGetHit();
        }
        this.throwableObjects.forEach((object) => {
            if (this.level.boss[0].isColliding(object)) {
                this.enemyGetHit(this.level.boss[0]);
            }
        });
    }

    characterJumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.y > this.character.previousY && !enemy.isDead();
    }

    characterCollideWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.isDead();
    }

    characterGetHit() {
        if (this.character.energy > 0) { this.canvasGlobalAlpha(); }
        this.character.hit();
        this.healthBar.changePercentageValue(this.character.energy);
        if (this.character.energy <= 0) { this.gameOver(); }
    }

    enemyGetHit(enemy) {
        this.character.jump(5);
        enemy.hit();
        this.scream.play();
    }

    throwableObjectCollide() {
        this.throwableObjects = this.throwableObjects.filter((object) => {
            let removeObject = true;
            if (object.hasCollided) {
                removeObject = false;
                this.breakingBottle.play();
            }
            return removeObject;
        });
    }

    // Select items ---------------------------------------------------------
    selectCoins() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.changePercentageValue(this.coinBar.percentage + 4);
                this.collectCoinAudio.play();
                return false;
            } else {
                return true;
            }
        });

    }

    selectTrowables() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle) && this.bottleBar.percentage < 100) {
                this.bottleBar.changePercentageValue(this.bottleBar.percentage + 20);
                return false;
            } else {
                return true;
            }
        });

    }

    // draw ------------------------------------------------------------------------------------------------------------------------------------------
    draw() {
        //clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        // backgound
        this.addObjectsToMap(this.level.backgroundObjects);
        // Clouds
        this.addObjectsToMap(this.level.clouds);
        // Collectible
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        // Status Bars
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.cameraX, 0);
        // character
        this.addToMap(this.character);
        // Enemies 
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.throwableObjects)
        this.ctx.translate(-this.cameraX, 0);
        // refresh canvas
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawStartScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.startScreen);
        let self = this;
        requestAnimationFrame(function () {
            self.drawStartScreen();
        });
    }

    // add to map ---------------------------------------------
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.mirrorImage(object);
        }

        object.draw(this.ctx);
        object.drawFrame(this.ctx);

        if (object.otherDirection) {
            this.mirrorImageBack(object);
        }
    }

    // mirror Image -----------------------------------------
    mirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    mirrorImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    // make canvas darker -----------------------------------
    canvasGlobalAlpha() {
        this.ctx.globalAlpha = 0.8;
        setTimeout(() => {
            this.ctx.globalAlpha = 1;
        }, 100);
    }

    /**
     * Initiate the boss fight when the character reaches the X position 9400 and encounters the boss for the first time:
     * set the Boss in fight mode.
     * Display the boss health bar.
     * Check if the boss is defeated.
     * Update the boss health bar.
     */
    checkForBossFight() {
        const X_POSITION = this.character.x;
        const PROGRESS_BAR = document.querySelector('.progress-bar');
        let bossEnemy = this.level.boss[0];
        // start fight
        if (X_POSITION >= 9400 && this.playerMeetsBossFirstTime) {
            bossEnemy.fight = true;
            bossEnemy.startFight();
            document.querySelector('.progressBarContainer').style.display = 'flex';
        }
        // if boss is dead 
        if (bossEnemy.isDead()) {
            this.showEndScreen();
            document.getElementById('againButton').innerHTML = 'Play Again';
            this.character.gameOver = true;
        }
        //update progress bar
        PROGRESS_BAR.style.width = bossEnemy.energy + '%';
    }

    // Intervals ----------------------------------------------------------------------
    setIntervalByParameter(fn, time) {
        let id = setInterval(fn, time);
        this.intervals.push(id);
    }

    clearAllIntervals() {
        // character
        this.character.intervals.forEach(interval => { clearInterval(interval); })
        // enemies
        this.level.enemies.forEach(enemy => {
            enemy.intervals.forEach(interval => { clearInterval(interval); })
        })
        // clouds
        this.level.clouds.forEach(cloud => {
            cloud.intervals.forEach(interval => { clearInterval(interval); })
        })
        // world
        this.intervals.forEach(interval => { clearInterval(interval) })
    }

    sounds(){
        this.audios.push(this.character.runningSound);
        this.audios.push(this.character.jumpingSound);
        this.audios.push(this.character.snoringSound);
    }

    loadNewLevel() {
        this.clearAllIntervals();
        this.level = newLevel();
        document.querySelector('.progress-bar').style.width = 100 + '%';
        document.querySelector('.progressBarContainer').style.display = 'none';
        this.character = "";
        this.character = new Character(this);
        this.setBackground();
    }

}