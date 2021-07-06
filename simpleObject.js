import {VoxelGrid} from './voxelMesh.js';

// console.log(THREE);
// html data
const myCanvas = document.getElementById("myCanvas");

// // loading gls
// const loader = new THREE.GLTFLoader();
// const dracoLoader = new THREE.DRACOLoader();
// // dracoLoader.setDecoderPath( 'https://jonasward.ch/public_html/versionC.glb' );
// // loader.setDRACOLoader( dracoLoader );

// https://jonasward.ch/public_html/versionC.glb

// three.js data
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, myCanvas.width / myCanvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: myCanvas});

scene.background = new THREE.Color("yellow");
// enabling shadow maps
renderer.shadowMap.enabled = true;

var voxelGrid = new VoxelGrid(10, 10, 10, 1.);
var vertexes = voxelGrid.constructVertexeList();

const geometry = new THREE.BufferGeometry();
const positionNumComponents = 3;
geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(vertexes), positionNumComponents));


// constructing and colored box
const box = new THREE.BoxGeometry(1.);
const material = new THREE.MeshStandardMaterial({color : "white"});
const boxMesh = new THREE.Mesh(geometry, material);

scene.add(boxMesh);

//Adding Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// // Load a glTF resource
// loader.load(
// 	function ( gltf ) {
    
//     gltf.scale = .01;

// 		scene.add( gltf.scene );

// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object

// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );

// adding a baseplane
const plane = new THREE.PlaneGeometry(15, 15);
const planeMesh = new THREE.Mesh(plane, material);
planeMesh.rotation.y = .5;
planeMesh.rotation.x = -.5*Math.Pi;
scene.add(planeMesh);

// add light
const light = new THREE.HemisphereLight("white", "blue", 1.);
scene.add(light);
const dirLight = new THREE.DirectionalLight("green", .5);
dirLight.castShadow=true;
scene.add(dirLight);

// setting camere direction
console.log(camera.position);
camera.position.set(0, 10., 50.);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  var alfa = (Date.now() % 1000 / 1000.) * Math.pi * 2.;
  // camera.position.set(Math.cos(alfa) * 2., Math.sin(alfa) * 2., 1.);
  // camera.rotation.y += .01;
}

animate();