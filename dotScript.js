

// import * as THREE from '../build/three.module.js';

// import Stats from './jsm/libs/stats.module.js';
// import { GUI } from './jsm/libs/dat.gui.module.js';
// import { OrbitControls } from "./jsm/controls/OrbitControls.js";

let camera, scene, renderer, stats;

let mesh;
const amount = parseInt( window.location.search.substr( 1 ) ) || 25;
const count = Math.pow( amount, 3 );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );
var gui = new dat.gui.GUI();

var changingState = new function() {
    this.switchOn = true;
    this.switchOff = false;
    this.transparent = false;
    this.dispose = false;
    this.transparency = 1.;
}

const onColor = new THREE.Color().setHex('0xcb2e0c');
const offColor = new THREE.Color().setHex('0x30a5c1');
const transparent = '0x1020ffff';

const materialOn = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHex(onColor),
    opacity: 1.,
    transparent: false,
});

const materialOff = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHex(offColor),
    opacity: .2,
    transparent: false,
});


const color = new THREE.Color();

init();
animate();
gui = initUi(gui);

function initUi(gui) {
    gui = new dat.gui.GUI();

    console.log(mesh.count);
    console.log(amount);

    gui.add( mesh, 'count', 0, amount ).onChange( function () {
        mesh.count = parseInt(mesh.count) * amount * amount;
    });
    // gui.add(changingState, 'transparency', 0., 1.).onChange( function () {
    //     // init();
    // });
    gui.add(changingState, 'switchOn').onChange( function () {
        changingState.switchOff=false;
        gui.__controllers[2].updateDisplay();
    });
    gui.add(changingState, 'switchOff').onChange( function () {
        changingState.switchOn=false;
        gui.__controllers[1].updateDisplay();
    });
    gui.add(changingState, 'dispose');
    gui.add(changingState, 'transparent');

    return gui;
}

const spacing = 1.;

// brick grid
function brickGrid(count, spacing) {
    meshA = THREE.BoxGeometry(spacing*2.-.1, spacing, spacing-.1);
    meshB = THREE.BoxGeometry(spacing-.1, spacing, spacing*2.-.1);

    for (let i = 0; i < count; i++) {
        var direction = i % 2;
        var z = i * spacing;
        var inset = 0;
        if (i % 4 === 1 || i % 4 === 2 ) {
            inset = 1;
        }
        if (direction === 1) {
            for (let j = 0; j < count; j++) {
                x = (j + inset) * spacing * 2.;
                for (let k = 0; k < count * 2; k++) {
                    y = k * spacing;
                    if (direction == 1) {

                    }

                }
            }
        }

    }
}


function newMesh(mesh) {
    let i = 0;
    const offset = ( amount - 1 ) / 2;

    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < amount; x ++ ) {
        for ( let y = 0; y < amount; y ++ ) {
            for ( let z = 0; z < amount; z ++ ) {

                if (x % 4 === 0) {
                    matrix.makeRotationX(.2 * Math.PI);
                } else {
                    matrix.makeRotationX(0.);
                }

                if (x % 4 === 3) {
                    matrix.scale(new THREE.Vector3(1., .5, 1.));
                } else {
                    matrix.scale(new THREE.Vector3(1., 1., 1.));
                }

                matrix.setPosition( y - offset, x - offset, offset - z );

                mesh.setMatrixAt( i, matrix );
                mesh.setColorAt( i, color );

                i ++;

            }

        }

    }
    return mesh;

}

function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( amount, amount, amount );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();

    const light1 = new THREE.HemisphereLight( 0xffffff, 0x000088 );
    light1.position.set( - 1, 1.5, 1 );
    scene.add( light1 );

    const light2 = new THREE.HemisphereLight( 0xffffff, 0x880000, 0.5 );
    light2.position.set( - 1, - 1.5, - 1 );
    scene.add( light2 );

    const geometry = new THREE.BoxGeometry(.9, .9, .9);
    const material = new THREE.MeshPhongMaterial({
        color,
        opacity: 1.,
        transparent: false,
    });

    mesh = new THREE.InstancedMesh( geometry, material, count );

    mesh = newMesh(mesh);

    scene.add( mesh );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    const canvas = document.body.appendChild( renderer.domElement );

    new THREE.OrbitControls( camera, renderer.domElement );

    // stats = new Stats();
    // console.log(stats);
    // document.body.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'mousemove', onMouseMove );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    raycaster.setFromCamera( mouse, camera );

    const intersection = raycaster.intersectObject( mesh );


    if ( intersection.length > 0) {

        const instanceId = intersection[ 0 ].instanceId;

        if (changingState.switchOn) {
            mesh.setColorAt( instanceId, onColor );
            mesh.instanceColor.needsUpdate = true;
        } else if (changingState.switchOff){
            mesh.setColorAt( instanceId, offColor );
            mesh.instanceColor.needsUpdate = true;
        } else if (changingState.dispose) {
            console.log(instanceId);
            mesh.dispose();
            mesh.instanceColor.needsUpdate = true;
        }


    }

    renderer.render( scene, camera );

    // stats.update();

}

