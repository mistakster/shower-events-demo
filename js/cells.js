var cells = function (done) {

	var ID = 'physics-viewport';

	var $viewport = $('#' + ID),
		viewWidth = $viewport.width(),
		viewHeight = $viewport.height();

	var renderer = Physics.renderer('canvas', {
		el: ID,
		width: viewWidth,
		height: viewHeight,
		meta: false,
		debug: false,
		styles: {
			'circle': {
				strokeStyle: 'hsla(60, 37%, 17%, 1)',
				lineWidth: 1,
				fillStyle: 'hsla(60, 37%, 57%, 0.8)',
				angleIndicator: false
			}
		}
	});

	var edgeBounce = Physics.behavior('edge-collision-detection', {
		aabb: Physics.aabb(0, 0, viewWidth, viewHeight),
		restitution: 0.99,
		cof: 0.99
	});


	var sim = function (world, Physics) {


		born(viewWidth / 2, viewHeight / 2);

	};

	$(function () {
		Physics.util.ticker.start();
		// initialize the world
		var world = Physics();
		world.pause();
		world.add(renderer);
		world.add(edgeBounce);
		world.add(Physics.behavior('body-impulse-response'));
		world.add(Physics.behavior('newtonian', { strength: 1 }));
		world.add(Physics.behavior('sweep-prune'));
		world.add(Physics.behavior('body-collision-detection', { checkAll: false }));

		Physics.util.ticker.subscribe(function (time, dt) {
			world.step(time);
			if (!world.isPaused()) {
				world.render();
			}
		});

		var lastTime = -1;

		Physics.util.ticker.subscribe(function (time) {
			if (world.isPaused()) {
				return;
			}

			if (lastTime > 0 && time - lastTime < 2000) {
				return;
			}

			var p = Physics.body('circle', {
				x: Physics.util.random(viewWidth),
				y: Physics.util.random(viewHeight),
				mass: 1,
				radius: 40,
				vx: Physics.util.random(0.01) - 0.005,
				vy: Physics.util.random(0.01) - 0.005,
				restitution: 0.7
			});

			world.add(p);

			lastTime = time;
		});

		done(world);
	});

};
