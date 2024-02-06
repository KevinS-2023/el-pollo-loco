class Cloud extends MovableObject{
    y = 25;
    width = 500;
    height = 200;
    intervals = [];

    constructor(xPosition) {
        super().loadImg('../img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.speed = Math.random() * 1;
        this.x = xPosition;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }

    moveLeft(){
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60); 
    }
}