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
