// We create our only state
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        // Load the image
        game.load.image("napoleon","napoleon.jpg");
        game.load.image("chapstick","chapstick.jpg");
    }
    , create: function () {
        // This function is called after the 'preload' function 
        // Here we set up the game, display sprites, etc.
        this.player = game.add.sprite(0,100,"napoleon");
        this.player.scale.setTo(.35,.35);
        
        this.coins=game.add.group();
        this.coins.enableBody=true;
        this.coins.createMultiple(50,"chapstick");
        game.time.events.loop(100,this.addCoins,this);
        
        
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y=5000;
        this.player.body.collideWorldBounds = true;
        this.keyboard=game.input.keyboard.createCursorKeys();
        
    }
    , update: function () {
        this.player.body.velocity.x=0;
        if (this.keyboard.right.isDown){
            this.player.body.velocity.x=300;
            }else if(this.keyboard.left.isDown){
                this.player.body.velocity.x=-300;
            }
        if (this.keyboard.up.isDown) {
            this.player.body.velocity.y=-300;
        }else if(this.keyboard.down.isDown){
            this.player.body.velocity.y=800;
        }
        
        // This contains Game Logic 
    }
    ,addCoins: function(){
        var coin=this.coins.getFirstDead();
        if(!coin){
            return;
        }
        coin.scale.setTo(.5,.5);
        coin.anchor.setTo(0.5,1);
        coin.reset(game.rnd.pick([game.width/2,0]),0);
        coin.body.gravity.y=500;
        coin.body.velocity.x=100*
        game.rnd.pick([-2,2]);
        coin.body.bounce.x=1;
        coin.checkWorldBounds=true;
        coin.outOfBoundsKill=true;
        
        
    }
};
// We initialize Phaser
var game = new Phaser.Game(800, 800, Phaser.AUTO, '');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');