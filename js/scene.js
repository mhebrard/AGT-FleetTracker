var container;
var camera, controls, scene, renderer;
var cross;
var lookAtScene = true;


// Display current FOV
function setFov(fov) {
	camera.setFov(fov);
	document.getElementById('fov').innerHTML = 'FOV '+ fov.toFixed(2) +'&deg;' ;
}

function setLens(lens) {
  // try adding a tween effect while changing focal length, and it'd be even cooler!
	var fov = camera.setLens(lens);
	document.getElementById('fov').innerHTML = 'Converted ' + lens + 'mm lens to FOV '+ fov.toFixed(2) +'&deg;' ;
}

function setOrthographic() {
  camera.toOrthographic();
  document.getElementById('fov').innerHTML = 'Orthographic mode' ;
	console.log(camera);
}

function setPerspective() {
  camera.toPerspective();
  document.getElementById('fov').innerHTML = 'Perspective mode' ;
}

function init() {
	// Container
	container = document.createElement('div');
	document.body.appendChild(container);
	// Camera
	camera = new THREE.CombinedCamera( window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000, - 500, 1000 );
	camera.position.x = 200;
	camera.position.y = 100;
	camera.position.z = 200;
	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	// Grid
	var gridHelper = new THREE.GridHelper( 2 * 0x07FF, 0xFF );
	scene.add( gridHelper );
	// Content
	var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshLambertMaterial( { color: 0xff00ff, overdraw: 0.5 } );
	/* var markers = [
		{pos: '07FF:007F:07FF:0001', color: 0x00ffff},
		{pos: '07F0:007F:07FF:0001', color: 0x00ff00}, {pos: '07FF:007F:07F0:0001', color: 0x00ff00}, {pos: '07F0:007F:07F0:0001', color: 0x00ff00},
		{pos: '070F:007F:07FF:0001', color: 0x0000ff}, {pos: '07FF:007F:070F:0001', color: 0x0000ff}, {pos: '070F:007F:070F:0001', color: 0x0000ff}
	];*/
	var center = '07FF:007F:07FF:0001';
	var obj = hexToVox('07FF:007F:07FF:0001');
	var center = new THREE.Mesh(geometry, material);
	center.position.x = obj.x;
	center.position.y = obj.y;
	center.position.z = obj.z;
	scene.add(center);
	for (var i = 1; i < 0x0FFF; i++) {
		var shift = i * 0x7F;
  	var e = new THREE.Mesh(geometry, material);
		e.position.x = obj.x + shift;
    e.position.y = obj.y;
    e.position.z = obj.z;
		scene.add(e);
		var ne = new THREE.Mesh(geometry, material);
		ne.position.x = obj.x + shift;
    ne.position.y = obj.y;
    ne.position.z = obj.z + shift;
		scene.add(ne);
		var n = new THREE.Mesh(geometry, material);
		n.position.x = obj.x;
    n.position.y = obj.y;
    n.position.z = obj.z + shift;
		scene.add(n);
		var nw = new THREE.Mesh(geometry, material);
		nw.position.x = obj.x - shift;
    nw.position.y = obj.y;
    nw.position.z = obj.z + shift;
		scene.add(nw);
		var w = new THREE.Mesh(geometry, material);
		w.position.x = obj.x - shift;
    w.position.y = obj.y;
    w.position.z = obj.z;
		scene.add(w);
		var sw = new THREE.Mesh(geometry, material);
		sw.position.x = obj.x - shift;
    sw.position.y = obj.y;
    sw.position.z = obj.z - shift;
		scene.add(sw);
		var s = new THREE.Mesh(geometry, material);
		s.position.x = obj.x;
    s.position.y = obj.y;
    s.position.z = obj.z - shift;
		scene.add(s);
		var se = new THREE.Mesh(geometry, material);
		se.position.x = obj.x + shift;
    se.position.y = obj.y;
    se.position.z = obj.z - shift;
		scene.add(se);
  }
	/* for ( var i = 0; i < 100; i ++ ) {
		var cube = new THREE.Mesh( geometry, material );
		cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
		cube.position.y = ( cube.scale.y * 50 ) / 2;
		cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
		scene.add(cube);
	}
	*/
	// Lights
	var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
	scene.add( ambientLight );
	var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;
	directionalLight.position.normalize();
	scene.add( directionalLight );
	var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;
	directionalLight.position.normalize();
	scene.add( directionalLight );
	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	// stats = new Stats();
	// container.appendChild( stats.dom );
	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize(){
		camera.setSize( window.innerWidth, window.innerHeight );
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		// controls.handleResize();
		// render();
	}
	//
	setOrthographic();
	animate();
}

function movingCamera() {
  // Camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2050 );
	camera.position.x = 2000;
  camera.position.y = 100;
  camera.position.z = 2000;

  // Controls
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
	// World
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	// scene.fog = new THREE.FogExp2( 0x111111, 0.002 );
	// var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
  /* var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
	for ( var i = 0; i < 500; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = ( Math.random() ) * 1000;
		mesh.position.y = ( Math.random() ) * 1000;
		mesh.position.z = ( Math.random() ) * 1000;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
		scene.add( mesh );
	}*/
  // Boundaries
  var lim = new THREE.BoxGeometry( 10, 10, 10 );
  var limM = new THREE.MeshPhongMaterial( { color: 0xff00ff, flatShading: true } );
  // center, 0 0, x 0, x y, 0 y, 0 0
  var pos = ['07FF:007F:07FF:0001','0001:0001:0001:0001', '07FF:0001:0001:0001','07FF:007F:0001:0001','0001:007F:0001:0001', '07FF:007F:07FF:0001'];
  // create a Line
  var lineM = new THREE.LineBasicMaterial({ color: 0xff00ff });
  var lineG = new THREE.Geometry();
  pos.forEach(p => {
    var obj = hexToVox(p);
    console.log(obj);
    var mesh = new THREE.Mesh( lim, limM );
		mesh.position.x = obj.x;
    mesh.position.y = obj.y;
    mesh.position.z = obj.z;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
    // links
    lineG.vertices.push(new THREE.Vector3(obj.x, obj.y, obj.z));
		scene.add( mesh );
  });
  var line = new THREE.Line(lineG, lineM);
  scene.add(line);

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
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// stats = new Stats();
	// container.appendChild( stats.dom );
	//
	window.addEventListener( 'resize', onWindowResize, false );

	render();
  animate();
}

function animate() {
	requestAnimationFrame( animate );
	// controls.update();
	render();
}

function render() {
	// renderer.render( scene, camera );
	// stats.update();
	var timer = Date.now() * 0.0001;
	camera.position.x = Math.cos( timer ) * 200;
	camera.position.z = Math.sin( timer ) * 200;
	if ( lookAtScene ) camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
