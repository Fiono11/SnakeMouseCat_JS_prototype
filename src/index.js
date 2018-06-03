// IMPORTS
import 'phaser';

// GLOBAL VARIABLES
const GAME_WIDTH = 678;
const GAME_HEIGHT = 596;
const PLAYER_SIZE = 24;

var splashScreen;

var cursors;

var walls;

var mouse;
var mouseSpeed = 250;

//Phaser Config
var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

//preload all assets and assign object names
function preload() {
    //backgrounds
    this.load.image('splashScreen', 'assets/img/splash.png');
    this.load.image('gameBg', 'assets/img/bg.png');

    //players
    //mouse
    this.load.spritesheet('mouse', 'assets/img/mouse_sheet.png', { frameWidth: 24, frameHeight: 24 });

}


function create() {
    // this.tweens.add({
    //         targets: splashScreen,
    //         y: -450,
    //         duration: 3000,
    //         ease: 'Power2',
    //         //yoyo: true,
    //         //loop: -1
    //     });


    // Keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    //Background
    var gameBg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'gameBg');
    splashScreen = this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, 'splashScreen');

    //walls
    walls = this.physics.add.staticGroup();
    
    for(var i = 0; i < 600; i = i + 32 ){
        walls.create(600, i);
    }
    walls.visible = false;
    
    //walls.create(600, 400, 'ground');
    
    // Create player
    mouse = this.physics.add.sprite(250, 250, "mouse");
    
    // Player should collide with edges of the screen
    mouse.setCollideWorldBounds(true);
    
    this.physics.add.collider(mouse, walls);
    

    // Create animations for player
    this.anims.create({
        key: "mouseLeft",
        frames: this.anims.generateFrameNumbers("mouse", { start: 2, end: 2 }),
        repeat: -1
    });
    this.anims.create({
        key: "mouseDown",
        frames: this.anims.generateFrameNumbers("mouse", { start: 1, end: 1 }),
        repeat: -1
    });
    this.anims.create({
        key: "mouseRight",
        frames: this.anims.generateFrameNumbers("mouse", { start: 0, end: 0 }),
        repeat: -1
    });
    this.anims.create({
        key: "mouseUp",
        frames: this.anims.generateFrameNumbers("mouse", { start: 3, end: 3 }),
        repeat: -1
    });


}

function update() {
    //start
    if (cursors.space.isDown) {
        splashScreen.visible = false
    }
    
    //update players
    updateMouse();
}

//Updates mouse player
function updateMouse() {
    if (cursors.left.isDown) {
        mouse.setVelocityX(-mouseSpeed);
        mouse.setVelocityY(0);
        mouse.anims.play('mouseLeft', true);
    }
    else if (cursors.right.isDown) {
        mouse.setVelocityX(mouseSpeed);
        mouse.setVelocityY(0);
        mouse.anims.play('mouseRight', true);
    }

    else if (cursors.up.isDown) {
        mouse.setVelocityY(-mouseSpeed);
        mouse.setVelocityX(0);
        mouse.anims.play('mouseUp', true);
    }
    else if (cursors.down.isDown) {
        mouse.setVelocityY(mouseSpeed);
        mouse.setVelocityX(0);
        mouse.anims.play('mouseDown', true);
    }
}
