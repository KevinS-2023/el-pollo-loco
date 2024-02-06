class Collectibles extends DrawableObject {

    index;
    IMAGES_COINS = [
        '../img_pollo_locco/img/8_coin/coin_1.png',
        '../img_pollo_locco/img/8_coin/coin_2.png'
    ];

    IMAGES_BOTTLES = [
        '../img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_ARRAY = [];

    constructor(index, x, y, object) {
        this.loadObject(object);
        this.loadImages(this.IMAGES_ARRAY);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.index = index;
        // size and position of the hitbox
        this.naturalWidth = 30;
        this.naturalHeight = 30;
        this.naturalX = this.x + 35;
        this.naturalY = this.y + 35;
        // --------------------------------
        this.animate();
    }

    loadObject(object) {
        if (object == 'coin') {
            this.loadCoin();
        }
        else {
            this.loadBottle();
        }
    }

    loadCoin() {
        super().loadImg('../img_pollo_locco/img/8_coin/coin_1.png');
        this.IMAGES_ARRAY = this.IMAGES_COINS;
    }

    loadBottle() {
        super().loadImg('../img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.IMAGES_ARRAY = this.IMAGES_BOTTLES;
    }

    getImgPath(object) {
        if (object == 'coin') {
            return 'img_pollo_locco/img/8_coin/coin_1.png';
        }
        else {
            return 'img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png';
        }
    }

    animate() {
        setInterval(() => {

        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_ARRAY);
        }, 600);

    }





}
