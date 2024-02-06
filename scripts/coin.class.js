class Coin extends DrawableObject{

    index;
    IMAGES_COINS = [
        '../img_pollo_locco/img/8_coin/coin_1.png',
        '../img_pollo_locco/img/8_coin/coin_2.png'
    ];

    constructor(index, x, y){
        super().loadImg('../img_pollo_locco/img/8_coin/coin_1.png');  
        this.loadImages(this.IMAGES_COINS);
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

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 600);

    }

    


 
}