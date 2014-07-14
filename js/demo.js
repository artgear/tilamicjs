
(function(window, $){
	$(document).ready(function(){
		var tilamic = new Tilamic('#tiles', {
			'rows': 3,
			'cols': 5,
			'aspectRatio': 853/1280
		});
		
		var selectPatterns = {};
		selectPatterns['checkerA'] = tilamic.filter(function(index, col, row){
			return (col + row) % 2 == 0;
		});
		
		selectPatterns['checkerB'] = tilamic.filter(function(index, col, row){
			return (col + row) % 2 !== 0;
		});
		
		var flippatterns = [];
		flippatterns[0] = function(imgID){
			tilamic.setOrigin('middleOfCol').flip(imgID);
		};
		flippatterns[1] = function(imgID){
			tilamic.seqFlip(imgID, 100);
		};
		flippatterns[2] = function(imgID){
			selectPatterns['checkerA'].flip(imgID);
			setTimeout(function(){
				selectPatterns['checkerB'].flip(imgID);
			}, 800);
		};
		flippatterns[3] = function(imgID){
			tilamic.seqFlip(imgID, 100, true, true, true);
		};
		flippatterns[4] = function(imgID){
			selectPatterns['checkerA'].setOrigin('centerOfAll').flip(imgID);
			setTimeout(function(){
				selectPatterns['checkerB'].setOrigin('centerOfAll').flip(imgID, false, true);
			}, 800);
		};
		
		$(window).on('resize', function(e){
			tilamic.resize();
		});
		var counter = 1;
		
		setInterval(function(){
			(flippatterns[counter % flippatterns.length])(counter % 4);
			counter++;
		}, 3000);
	});
})(window, jQuery);
