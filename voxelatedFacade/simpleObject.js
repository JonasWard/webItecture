console.log(THREE);
// html data
const myCanvas = document.getElementById("myCanvas");
let voxelGrid;
let voxelGeo;
let rayCastingGeo;

// setting up a simple scene
// three.js data
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, myCanvas.width / myCanvas.height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: myCanvas});

scene.background = new THREE.Color("yellow");
// enabling shadow maps
renderer.shadowMap.enabled = true;


// input data definitions
var changingState = new function() {
  this.xCount = 10;
  this.yCount = 10;
  this.zCount = 10;
  this.spacing = 1.;
  this.switchOn = true;
  this.switchOff = false;
}

// geometry generation functions
function voxelGridConstructor() {
  voxelGrid = new VoxelGrid(
    changingState.xCount,
    changingState.yCount,
    changingState.zCount,
    changingState.spacing
  );
}

function voxelGeoUpdate() {
  const vertexes = voxelGrid.constructVertexesList();

  voxelGeo = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  voxelGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(vertexes), positionNumComponents));
}

function rayCastingGeoUpdate() {
  rayCastingGeo = voxelGrid.faceDotsGeometry(.2);
}

function geoInit() {
  voxelGridConstructor();
  voxelGeoUpdate();
  rayCastingGeoUpdate();
  updateScene();
}

function updateScene() {
  for (let i = scene.children.length - 1; i >= 0; i--) {
    if(scene.children[i].type === "Mesh") {
      scene.remove(scene.children[i]);
      console.log("removed a mesh");
    };
  };

  scene.add(new THREE.Mesh(voxelGeo, material));
  scene.add(rayCastingGeo);
}

var gui = new dat.gui.GUI();
gui.add(changingState, 'xCount', 1, 25 ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'yCount', 1, 25 ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'zCount', 1, 25 ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'spacing', .2, 5. ).onChange( function () {
  geoInit();
});

voxelGrid = new VoxelGrid(10, 10, 10, 1.);
var vertexes = voxelGrid.constructVertexesList();
var meshGeo = voxelGrid.faceDotsGeometry(.2);

console.log(meshGeo);

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
scene.add(meshGeo);

//Adding Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

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