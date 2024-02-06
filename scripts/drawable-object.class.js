class DrawableObject {
    x = 120;
    y = 200;
    height = 70;
    width = 45;
    naturalWidth;
    naturalHeight;
    naturalX;
    naturalY;
    img;
    imageCach = {};
    currentImage = 0;
    animationComplete = false;
   
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCach[path] = img;
        });
    }

    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottles || this instanceof ThrowableObject) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '1';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.naturalX, this.naturalY, this.naturalWidth, this.naturalHeight);
        //     ctx.stroke();
        // }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCach[path];
        this.currentImage++;
    }

}