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
