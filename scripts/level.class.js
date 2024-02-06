class Level {

    enemies;
    boss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 10150;

    constructor(enemies,boss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.boss = boss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

}