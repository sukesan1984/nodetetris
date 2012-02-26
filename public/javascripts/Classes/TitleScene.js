    var TitleScene = Class.create( Scene, {
        initialize: function( game, nextScene ) {
            Scene.apply( this, arguments );
            this.game = game;
            this.onEnter();
        },
        onEnter: function(){
            this.title     = new Label( "Node Tetris" );
            this.gamestart = new Label( "Game Start" );
            this.gamestart.moveTo( 0, 20 );
            this.gamestart.addEventListener( 'touchstart', bind( function(e){
                    this.nextScene = new GameScene( game );
                    this.game.replaceScene( this.nextScene );
                    this.onExit();
            }, this));
            this.addChild( this.title );
            this.addChild( this.gamestart );
        },
        onExit: function(){}
    });
