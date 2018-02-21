var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth/ window.innerHeight, 1, 1100);
camera.target = new THREE.Vector3(0, 0, 0);
camera.lookAt(camera.target);
var geometry = new THREE.SphereGeometry(500, 60, 40);
var texture = new THREE.TextureLoader().load('common/ESRC_VR.jpg');

var controls = new THREE.VRControls(camera);
controls.standing = true;
camera.position.y = controls.userHeight;
//controls.enabled = false;
mylist = document.getElementById("mylist");
mylist.addEventListener("change", changeTrack);
	// Functions
	function changeTrack(event){
	var src = ''+event.target.value;
    mesh.material.map = THREE.ImageUtils.loadTexture( src );
    mesh.material.needsUpdate = true;
/*    if (src.includes("_90"))
    	mesh.rotation.y = 0;
    else
    	mesh.rotation.y = -Math.PI / 2;*/
	}

var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = -1;
mesh.position.set(0, controls.userHeight, 0);
mesh.rotation.y = -Math.PI / 2;
scene.add(mesh);
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//mesh.eulerOrder = "YXZ";
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var centerGeometry = new THREE.SphereGeometry( 1, 32, 32 );
var centerMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var centerSphere = new THREE.Mesh( centerGeometry, centerMaterial );
centerSphere.position.set(0, controls.userHeight, -500);
scene.add( centerSphere );

var options = {
  color: 'black',
  background: 'white',
  corners: 'square'
};
var enterVRButton = new webvrui.EnterVRButton(renderer.domElement, options);
enterVRButton.on('exit', function() {
  camera.quaternion.set(0, 0, 0, 1);
  camera.position.set(0, controls.userHeight, 0);
});
enterVRButton.on('hide', function() {
  document.getElementById('ui').style.display = 'none';
});
enterVRButton.on('show', function() {
  document.getElementById('ui').style.display = 'inherit';
});
document.getElementById('vr-button').appendChild(enterVRButton.domElement);
document.getElementById('no-vr').addEventListener('click', function() {
  enterVRButton.requestEnterFullscreen();
});

var interacting;
var pointerX = 0;
var pointerY = 0;
var lat = 0;
var lng = 0;
var savedLat = 0;
var savedLng = 0;

animate();

function animate() {
texture.needsUpdate = true;
  material.needsUpdate = true;
  mesh.needsUpdate = true;
  effect.render(scene, camera);

  if (enterVRButton.isPresenting()) {
    controls.update();
  }

  requestAnimationFrame(animate);
}

renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('resize', onResize, false);

function onMouseDown(event) {
  event.preventDefault();
  interacting = true;
  pointerX = event.clientX;
  pointerY = event.clientY;
  savedLng = lng;
  savedLat = lat;
}

function onMouseMove(event) {
  if (interacting) {
    lng = ( pointerX - event.clientX ) * 0.1 + savedLng;
    lat = ( pointerY - event.clientY ) * 0.1 + savedLat;
  }
}

function onMouseUp(event) {
  event.preventDefault();
  interacting = false;
}

function onTouchDown(event) {
  event.preventDefault();
  interacting = true;
  pointerX = event.touches[0].clientX;
  pointerY = event.touches[0].clientY;
  savedLng = lng;
  savedLat = lat;
}

function onTouchMove(event) {
  if (interacting) {
    lng = ( pointerX - event.touches[0].clientX ) * 0.1 + savedLng;
    lat = ( pointerY - event.touches[0].clientY ) * 0.1 + savedLat;
  }
}

function onTouchEnd(event) {
  event.preventDefault();
  interacting = false;
}

function onResize() {
  effect.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("keydown", onkey, true);

function onkey(event) {
	event.preventDefault();
	if (event.keyCode == 32) { // space bar 
		if (videoElement.paused == true) {
			videoElement.play();
		} else {
			videoElement.pause();
		}
	}
	//roll
	else if (event.keyCode == 69) { //e
		camera.rotation.z += 0.01;
		effect.render(scene, camera);
	} else if (event.keyCode == 81) { //q
		camera.rotation.z -= 0.01;
		effect.render(scene, camera);
	}
	//pitch
	else if (event.keyCode == 87) { //w
		camera.rotation.x += 0.01;
		effect.render(scene, camera);
	} else if (event.keyCode == 83) { //s
		camera.rotation.x -= 0.01;
		effect.render(scene, camera);
	}
	//yaw
	else if (event.keyCode == 65) { //a
		camera.rotation.y += 0.01;
		effect.render(scene, camera);
	} else if (event.keyCode == 68) { //d
		camera.rotation.y -= 0.01;
		effect.render(scene, camera);
	}
}
