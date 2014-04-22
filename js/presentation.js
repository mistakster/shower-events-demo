(function () {

	shower.weaver('go');

	cells(function (world) {

		shower.on('go:after', function () {
			var slideNumber = shower.getCurrentSlideNumber();
			if (slideNumber == 1) {
				// start video
				document.getElementById('devstories').play();
			} else if (slideNumber == 2) {
				// start world
				world.unpause();
			}
		});

		shower.on('go:before', function () {
			// stop video and physics world
			var video = document.getElementById('devstories');
			if (video) {
				video.pause();
			}
			world.pause();
		});

	});

}());