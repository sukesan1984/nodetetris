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
