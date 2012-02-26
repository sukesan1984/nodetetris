enchant();

window.onload = function() {
    var socket = io.connect();
    var game = new Game( 320, 320 );
    game.preload('/resource/block.png');
    game.onload = function() {
        var block = new Sprite(32, 32);
        block.image = game.assets['/resource/block.png'];
        block.addEventListener( 'touchmove', function(e) {
            var x = e.x;
            var y = e.y;
            this.x = x;
            this.y = y;
            socket.emit( 'move', {x: x, y: y} );
        });

        socket.on( 'move', function( coord ){
            block.x = coord.x;
            block.y = coord.y;
        });

        game.rootScene.addChild(block);
    };
    game.start();
};

