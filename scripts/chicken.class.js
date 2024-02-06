class Chicken extends MovableObject {
    y = 353;
    height = 70;
    width = 55;
    naturalHeight = 60;
    naturalWidth = 50;
    randomNumber = 1;
    move = false;

    IMAGES_WALKING = [
        '../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_STANDING_STILL = '../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png';

    IMAGE_DEAD = '../img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor(xPosition) {
        super().loadImg('../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImg(this.IMAGE_STANDING_STILL);
        this.loadImg(this.IMAGE_DEAD);
        this.x = xPosition;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
        this.groundHeigt = 353;
        this.energy = 5;
    }

    animate() {
        this.setIntervalByParameter(() => this.checkMove(), 1000 / 60);
        this.setIntervalByParameter(() => this.checkAnimation(), 200);
        this.setIntervalByParameter(() => this.getRandomNumber(), 3000);
    }

    // check move
    checkMove() {
        this.naturalX = this.x;
        this.naturalY = this.y + 5;
        if (this.isDead()) {
            this.loadImg(this.IMAGE_DEAD);
        }

        else if (this.randomNumber < 36 && this.x > 300) {
            this.moveLeft();
        }
        else if (this.randomNumber > 75 && this.x < 13500) {
            this.moveRight();
        }
        else {
            this.standingStill();
        }
    }

    // check animation
    checkAnimation() {
        if (this.isDead()) {
            this.loadImg(this.IMAGE_DEAD);
        }
        else if (this.move) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        else{
            this.loadImg(this.IMAGE_STANDING_STILL);
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

    standingStill() {
        this.move = false;
        
    }

    getRandomNumber() {
        this.randomNumber = Math.floor(Math.random() * 100) + 1
    }

 
}