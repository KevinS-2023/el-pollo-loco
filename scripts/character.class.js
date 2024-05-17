class Character extends MovableObject {
        height = 300;
        width = 115;
        y =  80;
        speed = 10;
        naturalWidth = 65;
        naturalHeight = 160;
        groundHeight = 120;
        deadAnimationPlayed = false;
        firstMove = false;
        previousY;
        gameOver = false;


        IMAGES_IDLE = [
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
        ];

        IMAGES_IDLE_LONG = [
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
                '../img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
        ];

        IMAGES_WALKING = [
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
                '../img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
        ];

        IMAGES_JUMP = [
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
                '../img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
        ];

        IMAGES_DEAD = [
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
                '../img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
        ];

        IMAGE_DEAD = '../img_pollo_locco/img/2_character_pepe/5_dead/D-56.png';

        IMAGES_HURT = [
                '../img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
                '../img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
                '../img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
        ];

        world;
        runningSound = new Audio('../audio/running.mp3');
        jumpingSound = new Audio('../audio/jump.mp3');
        snoringSound = new Audio('../audio/snoring.mp3');

        constructor(world) {
                super()
                this.world = world;
                this.loadImg('../img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
                this.loadImages(this.IMAGES_WALKING);
                this.loadImages(this.IMAGES_JUMP);
                this.loadImages(this.IMAGES_DEAD);
                this.loadImages(this.IMAGES_HURT);
                this.loadImages(this.IMAGES_IDLE);
                this.loadImages(this.IMAGES_IDLE_LONG);
                this.applyGravity();
                this.animate();
        }

        animate() {
                this.setIntervalByParameter(() => this.checkMovement(), 1000 / 60);
                this.setIntervalByParameter(() => this.checkAnimation(), 100);
                this.setIntervalByParameter(() => this.checkJump(), 250);
        }

        // Movement --------------------------------------
        checkMovement() {
                if (!this.gameOver) {
                        // move right
                        if (this.canMoveRight()) {
                                this.moveRight();
                        }
                        // move left
                        if (this.canMoveLeft()) {
                                this.moveLeft();
                        }
                        // jump
                        if (this.canJump()) {
                                this.jump(14);
                        }
                        // move camera
                        this.world.cameraX = -this.x + 100;
                }
                this.naturalX = this.x + 20;
                this.naturalY = this.y + 125;
        }

        setNewPosition(){
                this.naturalX = this.x + 20;
                this.naturalY = this.y + 125;
        }

        // right
        canMoveRight() {
                return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX && this.energy > 0;
        }

        moveRight() {
                this.otherDirection = false;
                this.firstMove = true;
                super.moveRight();
        }

        // left
        canMoveLeft() {
                return this.world.keyboard.LEFT && this.x > 100 && this.energy > 0;
        }

        moveLeft() {
                this.otherDirection = true;
                this.firstMove = true;
                super.moveLeft();
        }

        // jump
        canJump() {
                return this.world.keyboard.SPACE && this.y == this.groundHeight && this.energy > 0;
        }

        jump(height) {
                this.jumpingSound.play();
                this.firstMove = true;
                super.jump(height);
        }

        /**
         * Check which animation played
         * dead
         * get hurt
         * jump
         * walk
         * idle
         * long idle
         */
        checkAnimation() {
                this.runningSound.pause();
                // Dead
                if (this.isDead()) {
                        this.deadAnimation();
                }
                // Hurt
                else if (this.isHurt()) {
                        this.playAnimation(this.IMAGES_HURT);
                }
                // Jump
                else if (this.isAboveGround()) {
                        this.jumpAnimation();
                }
                // Walking 
                else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.walkAnimation();
                }
                // Standing still for 5 sec
                else if (this.isStandingStill() && this.firstMove) {
                        this.sleepAnimation();
                }
                // Standing still for under 5 sec
                else {
                        this.playAnimation(this.IMAGES_IDLE);
                }
        }

        // dead
        deadAnimation() {
                if (!this.deadAnimationPlayed) {
                        this.playAnimation(this.IMAGES_DEAD);
                        this.deadAnimationPlayed = true;
                }
                else {
                        this.loadImg(this.IMAGE_DEAD);
                        this.deadAnimationPlayed = false;
                }
        }

        jumpAnimation() {
                if (!this.jumpAnimationPlayed) {
                        this.playAnimation(this.IMAGES_JUMP);
                        this.jumpAnimationPlayed = true;
                }
                else {
                        this.jumpAnimationPlayed = false;
                }
        }

        walkAnimation() {
                this.playAnimation(this.IMAGES_WALKING);
                this.runningSound.play();
        }

        // sleep
        sleepAnimation() {
                this.snoringSound.play();
                this.playAnimation(this.IMAGES_IDLE_LONG);
        }

        checkJump() {
                this.previousY = this.y;
        }


}
