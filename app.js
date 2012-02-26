/**
 * Module dependencies
 */

var express = require('express');
var app = module.exportes = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
app.listen(3000);

var socketIO = require('socket.io');
var io = socketIO.listen(app);

io.sockets.on( 'connection', function( client ) {
    client.on( 'move', function(d){
        console.log( d );
        client.broadcast.emit( 'move', d );
    });
    client.on( 'chat', function( msg ) {
        console.log( msg );
        client.broadcast.emit( msg );
    });
});

app.get('/', function(req, res){
    res.render('index.ejs', {
        layout: false,
        title: 'socket.io'
    });
});
