#!/usr/bin/perl

use strict;
use warnings;

# Classに分かれたファイルを一つにまとめる。
my $fh;
`rm game.js`;

open $fh, ">>game.js";

print $fh <<"PRE";
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
PRE
my @file_list = `ls Classes`;

for ( @file_list ) {
	print $_;
	my $in;
	open ( $in, "<Classes/$_");
	while ( <$in> ) {
		print $fh $_;
	}
	close ($in);
}

print $fh <<"SUF";
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
SUF

close $fh;
