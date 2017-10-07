function cube() {
  var div = document.getElementById("three");
  div.style.height = `${window.innerHeight - 50}px`;

  // Scene
  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( div.offsetWidth, div.offsetHeight );
	div.appendChild(renderer.domElement);

  // Grid
  var size = 10;
  var divisions = 10;
  var gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

  // Cube
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

  camera.position.y = 2;
	camera.position.z = 5;

  // Annimation
	var animate = function () {
		requestAnimationFrame( animate );
		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
		renderer.render(scene, camera);
	};
	animate();
}

function move() {
  // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var container, stats;
			var camera, controls, scene, renderer;
			var cross;
			init();
			animate();
			function init() {
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 500;
				controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
				controls.keys = [ 65, 83, 68 ];
				controls.addEventListener( 'change', render );
				// world
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xcccccc );
				scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
				var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
				for ( var i = 0; i < 500; i ++ ) {
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = ( Math.random() - 0.5 ) * 1000;
					mesh.position.y = ( Math.random() - 0.5 ) * 1000;
					mesh.position.z = ( Math.random() - 0.5 ) * 1000;
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = false;
					scene.add( mesh );
				}
				// lights
				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );
				var light = new THREE.DirectionalLight( 0x002288 );
				light.position.set( -1, -1, -1 );
				scene.add( light );
				var light = new THREE.AmbientLight( 0x222222 );
				scene.add( light );
				// renderer
        var div = document.getElementById("three");
        div.style.height = `${window.innerHeight - 50}px`;
        /*
        // Scene
        var scene = new THREE.Scene();
      	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      	var renderer = new THREE.WebGLRenderer();
      	renderer.setSize( div.offsetWidth, div.offsetHeight );
      	div.appendChild(renderer.domElement);
        */
				renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setPixelRatio( window.devicePixelRatio );
				// renderer.setSize( window.innerWidth, window.innerHeight );
				// container = document.getElementById( 'container' );
				// container.appendChild( renderer.domElement );
        renderer.setSize( div.offsetWidth, div.offsetHeight );
        div.appendChild(renderer.domElement);
				// stats = new Stats();
				// container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
				//
				render();
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();
				render();
			}
			function animate() {
				requestAnimationFrame( animate );
				controls.update();
			}
			function render() {
				renderer.render( scene, camera );
				// stats.update();
			}
    }
