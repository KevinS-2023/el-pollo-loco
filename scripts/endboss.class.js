class Endboss extends MovableObject {
    // Size
    y = 180;
    height = 250
    width = 125;
    // HitBox
    naturalWidth = 115;
    naturalHeight = 210;
    naturalX = 50;
    naturalY = 80;
    // Attributes
    speed = 10;
    move;
    dead = false;
    fight = false;
    fightHasStartet = false;
    x;
    downInterval;
    upInterval;
    deadInterval;
    animationInterval;

    IMAGES_ALERT = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALK = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(xPosition) {
        super().loadImg('../img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadAllImages();
        this.x = xPosition;
        this.checkAnimation();
        this.energy = 100;
        this.applyGravity();
        this.updateNaturalValues();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    startFight() {
        if (this.fight && !this.fightHasStartet) {
            this.fightHasStartet = true;
            this.playAnimation(this.IMAGES_ALERT);
            setTimeout(() => {
                this.moveToLowerPosition();
            }, 1400)
        }
    }

    // move to position 10000
    moveToUpperPosition() {
        this.upInterval = setInterval(() => {
            if (this.x < 10000) {
                this.moveRight();
            }
            else {
                clearInterval(this.upInterval);
                this.move = false;
                setTimeout(() => {
                    this.moveToLowerPosition();
                }, 1500)
            }
            this.updateNaturalValues();
        }, 1000/60)
    }

    //move to position 8000
    moveToLowerPosition() {
        this.downInterval = setInterval(() => {
            if (this.x > 8000) {
                this.moveLeft();
            }
            else {
                clearInterval(this.downInterval);
                this.move = false;
                setTimeout(() => {
                    this.moveToUpperPosition();
                }, 1500)
            }
            this.updateNaturalValues();
        }, 1000/60)
    }

    checkAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.move && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALK);
            }
            else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.fightFinished();
            }
            else if (!this.move && !this.isDead()) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 100);
    }

    updateNaturalValues() {
        this.naturalX = this.x;
        this.naturalY = this.y + 30;
    }

    fightFinished() {
        clearInterval(this.downInterval);
        clearInterval(this.upInterval);
        this.move = false;
        this.width -= 10;
        this.height -= 7;
        if(this.width <= 0 || this.height <= 0){
            this.width = 0;
            this.height = 0;
            clearInterval(this.animationInterval);
        }
    }

    moveLeft() {
        this.otherDirection = false;
        this.move = true;
        super.moveLeft();
    }

    moveRight() {
        this.otherDirection = true;
        this.move = true;
        super.moveRight();
    }


}