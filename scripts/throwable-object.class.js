class ThrowableObject extends MovableObject {

    isFlying;
    splash;
    hasCollided = false;

    IMAGES_FLYING_BOTTLE = [
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirektion) {
        super().loadImg('../img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_FLYING_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.naturalHeight = 40;
        this.naturalWidth = 40;
    

        this.trow(otherDirektion);
    }

    trow(otherDirektion) {
        this.animate();
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            if (!this.hasCollided && this.y < 360) {
                if (otherDirektion) {
                    this.x -= 6;
                } else {
                    this.x += 6;
                }
            }
            else{
                this.speedY = 0;
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                setTimeout(() => {this.hasCollided = true}, 80);
            }
            this.naturalX = this.x + 5;
            this.naturalY = this.y + 10;
        }, 25);
    }



    animateCollision() {
        let i = 0;
        const splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            clearInterval(splashInterval);
        }, 100);
    }

    animate() {
        this.isFlying = setInterval(() => {
            this.playAnimation(this.IMAGES_FLYING_BOTTLE);
        }, 100);
    }

}