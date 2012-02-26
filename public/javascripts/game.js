(function(){
	function bind(func, scope){
		return function(){
			return func.apply(scope, arguments);
		}
	}
	function initialize(){
		enchant();
		var game = new Game( 600, 800 );
		game.preload('/resources/block.png');
        var Field = Class.create( Group, {
            initialize: function( width, height ){
                console.log( "Field Initialize");
                Group.apply( this, arguments ); 
                this.width  = width;
                this.height = height;
                this.cells  = [];
                // cellの初期化
                // type: ( 0: none, 1: block, 2: wall ); 
                // color: ( 0: gray, 1: red, 2: yellow, 3: green, 4: blue, 5: purple, 6:lightblue, 7:orange )
                for ( var i = 0 ; i < this.width; i++ ){
                    this.cells[i] = []
                    for( var j = 0; j < this.height; j++ ){
                        this.cells[i][j] = new Panel();
                        this.addChild( this.cells[i][j] );
                    }
                }
            },
            draw: function(){
                for( var i = 0; i < this.width; i++ ){
                    for( var j = 0; j < this.height; j++ ){
                        this.cells[i][j].draw( i, j );
                    }
                }
            },
        });
		var GameScene = Class.create( Scene, {
			initialize: function() {
				Scene.apply( this, arguments );
                //var socket = io.connect();
                //var block = new Sprite( 32, 32);
                //block.image = game.assets['/resources/block.png'];
                //block.addEventListener( 'touchmove', function(e) {
                    //var x = e.x;
                    //var y = e.y;
                    //this.x = x;
                    //this.y = y;
                    ////socket.emit( 'move', {x: x, y: y} );
                //});

                //socket.on( 'move', function( coord ){
                    //block.x = coord.x;
                    //block.y = coord.y;
                //});

                //this.addChild(block);
                this.onEnter();
			},
            onEnter: function(){
                console.log( "Game Scene on Enter");
                this.field = new Field( 10, 20 );
                this.addChild( this.field );
                this.field.draw();
            },
            onExit: function(){

            }
		});
        var Panel = Class.create( Sprite, {
            initialize: function( ){
                console.log( "Panel initialize");
                Sprite.apply( this, arguments );
                this.type = 0;
                this.color = 0;
                this.visible = true;
                this.image = game.assets[ "/resources/block.png" ];
                this.width = 32;
                this.height = 32;
            },
            TYPE: {
                BACKGROUND: 0,
                BLOCK: 1,
                WALL: 2,
            },
            COLOR: {
                GRAY: 0,
                RED: 1,
                YELLOW: 2,
                GREEN: 3,
                BLUE: 4,
                PURPLE: 5,
                LIGHTBLUE: 6,
                ORANGE: 7
            },
            setType: function( type ){
                if( !this._isValidType( type ) ){ return; }
                this.type = type;
            },
            setColor: function( color ){
                if( !this._isValidColor( color )){ return; }
                this.frame = color;
                this.color = color;
            },
            setVisible: function( visible  ){
                if( typeof(visible) === 'boolean' ){ return;}
                this.visible = visible;
            },
            // private method
            _isValidType: function( type ){
                return ( type ===
                    ( this.TYPE.BACKGROUND ||
                      this.TYPE.BLOCK ||
                      this.TYPE.WALL) );
            },
            _isValidColor: function( color ){
                return ( color ===
                    ( this.COLOR.GRAY ||
                      this.COLOR.RED ||
                      this.COLOR.YELLOW ||
                      this.COLOR.GREEN ||
                      this.COLOR.BLUE ||
                      this.COLOR.PURPLE ||
                      this.COLOR.LIGHTBLUE ||
                      this.COLOR.ORANGE ) );
            },
            draw: function( x, y ){
                this.visible = true;
                this.moveTo( x * this.width, y * this.height );
            }
        });
        // SocketIOをラップしたクラス
        var SocketIO = Class.create({
            initialize: function() {
                this.socket = io.connect();
            },
            emit: function( action, obj ){
                this.socket.emit( action, obj );
            },
            on: function( action ){
                this.socket.on( action, obj );
            }
        });
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
		window.onload = function(){
			game.onload = function() {
				var titleScene = new TitleScene( game );
				game.pushScene(titleScene);
			}
			game.start();
		}
	}

	window.addEventListener( 'DOMContentLoaded', initialize, false );
})();
