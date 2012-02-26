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
