class Bottles extends DrawableObject{

    index;
    IMAGES_BOTTLES = [
        '../img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png'
    ];


    constructor(index, x, y){
        super().loadImg('../img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 70;
        this.index = index;
        // size and position of the hitbox
        this.naturalWidth = 15;
        this.naturalHeight = 40;
        this.naturalX = this.x + 27;
        this.naturalY = this.y + 10;
        
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 600);

    }

    


 
}