class StatusBar extends DrawableObject{


    LIFE = [
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    BOTTLE = [
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    COIN = [
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage;
    IMG_ARRAY = this.LIFE;

    constructor(type, x, y){
        super();
        this.selectArray(type);
        this.loadImages(this.IMG_ARRAY);
        this.setPercentage();
        this.x = x;
        this.y = y;
        this.width = 220;
        this.height = 60;
    }

    selectArray(type){
        if(type == 'life'){
            this.IMG_ARRAY = this.LIFE;
            this.percentage = 100;
        }
        else if(type == 'bottle'){
            this.IMG_ARRAY = this.BOTTLE;
            this.percentage = 0;
        }
        else if(type == 'coin'){
            this.IMG_ARRAY = this.COIN;
            this.percentage = 0;
        }
    }

    setPercentage(){
        let path = this.IMG_ARRAY[this.resolveImageIndex()];
        this.img = this.imageCach[path] ;
    }

    changePercentageValue(percentage){
        this.percentage = percentage;
        this.setPercentage();
    }

    resolveImageIndex() {
        if (this.percentage == 100){ 
            return 5;
        }
        else if(this.percentage > 79){
            return 4;
        }
        else if(this.percentage > 59){
            return 3;
        }
        else if(this.percentage > 39){
            return 2;
        }
        else if(this.percentage > 19){
            return 1;
        }
        else{
            return 0;
        }
    }
}