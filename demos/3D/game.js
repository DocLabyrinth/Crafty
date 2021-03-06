window.onload = function() {
	Crafty.init(1024, 768);
	Crafty.THREE.init();
	Crafty.THREE.rayEnabled = true;
	Crafty.THREE.camera.position.set(0, 300, 950);

	var score = 0,
		pointsPerBall = 100,
		scoreDiv = document.createElement('div');

	scoreDiv.id = 'score-div';
	Crafty.stage.elem.appendChild(scoreDiv);
	scoreDiv.innerHTML = 'Score: 0';

	var mouseOverMaterial = new THREE.MeshLambertMaterial({	color: 0x000000	});

	function givePoints(numPoints) {
		score += numPoints;
		scoreDiv.innerHTML = 'Score: '+score
	}
	
	Crafty.c('MovingBall', {
		movingTo: null,
		speed: 1,
		init: function() {
			this.requires('3D');

			var ballGeo = new THREE.SphereGeometry(50);

			/* use this function instead of setting directly to ensure the getters/setters get bound */
			var origMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
			this.object3DAssign(new THREE.Mesh(
				ballGeo,
				origMaterial
			));

			
			this.bind('RaycastClick', function(evInfo) {
				/* raycast evInfo contains the collision point and the event which led to the raycast */
				var point = evInfo.point,
					ev = evInfo.event;

				givePoints(pointsPerBall);
				this.destroy();

			})
			.bind('RaycastMouseOver', function() {
				this.object3D.material = mouseOverMaterial;
			})
			.bind('RaycastMouseOut', function() {
				this.object3D.material = origMaterial;
			})

			this.speed = Math.random() * 10 + 3;

			this.x = Math.random() * 1400 - 700;
			this.y = 600;
			this.z = Math.random() * 1400 - 700;

			this.bind('EnterFrame', function() {
				this.y -= this.speed;

				if(this.y < -200) {
					this.destroy();
				}
			});
		}
	});

	var spawning = true,
		spawnFunc = function() {
			var thisBall;
			for(var ballIdx = 0; ballIdx < 3; ballIdx++) {
				thisBall = Crafty.e('MovingBall');
			}

			if(spawning === true) {
				setTimeout(spawnFunc, Math.random() * 750);
			}
		};

	spawnFunc();
};
