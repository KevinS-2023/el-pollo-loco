class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    lastMove = new Date().getTime();
    groundHeight;
    intervals = [];
    
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if(this.y > this.groundHeight){
                    this.y = this.groundHeight;
                }
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < this.groundHeight;
        }
    }

    isColliding(object) {
        return this.naturalX < object.naturalX + object.naturalWidth &&
            this.naturalX + this.naturalWidth > object.naturalX &&
            this.naturalY < object.naturalY + object.naturalHeight &&
            this.naturalY + this.naturalHeight > object.naturalY;
    }
   
    moveRight() {
        this.x += this.speed;
        this.lastMove = new Date().getTime();
    }

    moveLeft() {
        this.x -= this.speed;
        this.lastMove = new Date().getTime();
    }

    jump(speed) {
        this.speedY = speed;
        this.lastMove = new Date().getTime();
    }

    hit() {
        this.energy -= 5;
        this.lastHit = new Date().getTime();
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; // changes timePassed into seconds
        return timePassed < 1;
    }

    isStandingStill() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000; // changes timePassed into seconds
        return timePassed > 5;
    }

    isDead() {
        return this.energy == 0;
    }

    setIntervalByParameter(fn, time) {
        let id = setInterval(fn, time);
        this.intervals.push(id);
    }
}