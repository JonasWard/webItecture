console.log(THREE);
// html data
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );

let voxelGrid;
let voxelGeo;
let rayCastingGeo;
let activeFaces;

const maxVoxels = 25;

// setting up a simple scene
// three.js data
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerWidth, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );

const canvas = document.body.appendChild( renderer.domElement );

// standard mesh properties
const material = new THREE.MeshStandardMaterial({color : "white"});
const onColor = new THREE.Color().setHex('0xcb2e0c');
const offColor = new THREE.Color().setHex('0x30a5c1');

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
  console.log("creating new geo with: "+changingState.xCount+" "+changingState.yCount+" "+changingState.zCount);
  voxelGrid = new VoxelGrid(
    changingState.xCount,
    changingState.yCount,
    changingState.zCount,
    changingState.spacing
  );
}

function voxelGeoUpdate() {
  const vertexes = voxelGrid.constructVertexesList();
  // activeFaces = voxelGrid.activeFaces;

  voxelGeo = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  voxelGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(vertexes), positionNumComponents));
}

function rayCastingGeoUpdate() {
  rayCastingGeo = voxelGrid.faceDotsGeometry(.2);
  activeFaces = voxelGrid.activeFaces;
}

function geoUpdate() {
  voxelGeoUpdate();
  rayCastingGeoUpdate();
  updateScene();
}

function geoInit() {
  // console.log("running geoInit");
  voxelGridConstructor();
  geoUpdate();
}

function updateScene() {
  for (let i = scene.children.length - 1; i >= 0; i--) {
    if(scene.children[i].type === "Mesh") {
      scene.remove(scene.children[i]);
      // console.log("removed a mesh");
    };
  };

  scene.add(new THREE.Mesh(voxelGeo, material));
  scene.add(rayCastingGeo);
}

var gui = new dat.gui.GUI();
gui.add(changingState, 'xCount', 1, maxVoxels ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'yCount', 1, maxVoxels ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'zCount', 1, maxVoxels ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'spacing', .2, 5. ).onChange( function () {
  geoInit();
});
gui.add(changingState, 'switchOn').onChange( function () {
  changingState.switchOff=!changingState.switchOn;
  gui.__controllers[5].updateDisplay();
});
gui.add(changingState, 'switchOff').onChange( function () {
  changingState.switchOn=!changingState.switchOff;
  gui.__controllers[4].updateDisplay();
});

//Adding Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// adding responsivness functions
window.addEventListener( 'resize', onWindowResize );
document.addEventListener( 'mousemove', onMouseMove );
document.addEventListener('touchstart', onTouchmove);

// initializing initial geometry
geoInit();

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

function intersection(mesh) {
  return raycaster.intersectObject( mesh );
}

// UI input
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onTouchmove( event ) {
  event.preventDefault();
  mouse.x = (event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
}

function onMouseMove( event ) {
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera( mouse, camera );
  const xs = intersection(rayCastingGeo);
  if ( xs.length > 0) {
    // console.log("intersecting");
    const instanceId = xs[0].instanceId;
    if (changingState.switchOn) {
      // rayCastingGeo.setColorAt( instanceId, onColor );
      if (activeFaces[instanceId].nf !== null){
        if (activeFaces[instanceId].nf.c.s !== 1){
          // console.log("I am happening");
          activeFaces[instanceId].nf.c.s = 1;
          geoUpdate();
        }
      }
      // rayCastingGeo.instanceColor.needsUpdate = true;
      // console.log(theMesh);
      // console.log("coloring on index "+instanceId);
      // console.log(scene.children);
    } else if (changingState.switchOff){
      // rayCastingGeo.setColorAt( instanceId, offColor );
      if (activeFaces[instanceId].c.s !== 0){
        activeFaces[instanceId].c.s = 0;
        geoUpdate();
      }
      // rayCastingGeo.instanceColor.needsUpdate = true;
    // console.log(theMesh);
    // console.log("coloring off index "+instanceId);
    // console.log(scene.children);
    }
  }
  // } else if (changingState.switchBridge){
  //     theMesh.setColorAt(instanceId, bridgeColor);
  //     vertexStates[0][(instanceId - 1) % theVertexes.count] = BRIDGESTATE;
  //     vertexStates[0][instanceId] = BRIDGESTATE;
  //     theVertexes.setColorAt((instanceId - 1) % theVertexes.count, bridgeColor);
  //     theVertexes.setColorAt(instanceId, bridgeColor);
  //     theMesh.instanceColor.needsUpdate = true;
  //     theVertexes.instanceColor.needsUpdate = true;
  // }
  renderer.render( scene, camera );
}

animate();