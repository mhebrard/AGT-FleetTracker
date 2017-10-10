var container;
var camera, controls, scene, renderer;
var camDist = 3000; // Default camera distance from center ensure diagonal always visible

function init() {
	// Container
	container = document.createElement('div');
	document.body.appendChild(container);

	// Renderer
	// renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// Camera
	var aspect = window.innerWidth / window.innerHeight;
	var frustumSize = 4100; // -2050 .. 2050
	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, camDist * 2 );
	// camera = new THREE.PerspectiveCamera( 100, aspect, 1, 4500 );

	// Controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x111111 );
	// Grid
	var gridHelper = new THREE.GridHelper(0x0FFF, 16); // Grid from 0x0001 to 0x0FFF every 0x0100 (16 divisions)
	scene.add( gridHelper );
	// Content
	var geometry = new THREE.BoxGeometry(100, 100, 100);
	var material = new THREE.MeshLambertMaterial( { color: 0xff11ff, overdraw: 0.5 } );
	var material2 = new THREE.MeshLambertMaterial( { color: 0x11ff11, overdraw: 0.5 } );
	var center = '07FF:007F:07FF:0001';
	var obj = hexToVox('07FF:007F:07FF:0001');
	var center = new THREE.Mesh(geometry, material2);
	center.position.x = obj.x;
	center.position.y = obj.y;
	center.position.z = obj.z;
	scene.add(center);
	var min = hexToVox('0001:0001:0001:0001');
	var ma = new THREE.Mesh(geometry, material2);
	ma.position.x = min.x;
	ma.position.y = min.y;
	ma.position.z = min.z;
	scene.add(ma);
	var max = hexToVox('0FFF:00FF:0FFF:02FF');
	var mb = new THREE.Mesh(geometry, material2);
	mb.position.x = max.x;
	mb.position.y = max.y;
	mb.position.z = max.z;
	scene.add(mb);
	console.log(min, max);
	// test positie axis
	var mp = new THREE.Mesh(geometry, material2);
	mp.position.x = 200;
	mp.position.y = 100;
	mp.position.z = 200;
	scene.add(mp);
	/*
	var z = new THREE.Mesh(geometry, material2);
	z.position.x = 100;
	z.position.y = -130;
	z.position.z = 100;
	scene.add(z);
	*/
	// Markers every 0x0100
	for (var i = 1; i < 9; i++) {
		var shift = i * 0x100;
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

	// Lights
	var fillLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add(fillLight);
	var centerTopLight = new THREE.PointLight( 0xffffff, 2, 0);
	centerTopLight.position.set(0, 250, 0);
	scene.add(centerTopLight);
	var centerBottomLight = new THREE.PointLight( 0xffffff, 2, 0);
	centerBottomLight.position.set(0, -250, 0);
	scene.add(centerBottomLight);

	// Run the scene
	toTopView();
	render();
	animate();
}

function toTopView() {
	// Reset init position
	controls.reset();
	// move on top
	camera.position.x = 0;
	camera.position.y = camDist;
	camera.position.z = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function toLateralView() {
	// Reset init position
	controls.reset();
	// Move on left
	camera.position.x = -camDist;
	camera.position.y = 0;
	camera.position.z = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}
