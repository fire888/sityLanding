import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


export const createWalkControls = (root) => {

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let prevTime = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();




    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    camera.position.set( -50, .7, 50);
    camera.rotation.set( 0, 3.14, 0);

    const controls = new PointerLockControls( camera, document.body )
    controls.disconnect()
    root.studio.addToScene(controls.getObject())


    controls.addEventListener( 'unlock', function () {
        root.actions.toggleViewMode('fly')
    });



    const onKeyDown = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );


    let isUpdate = false
    console.log(controls)


    return {
        getCamera () {
            return camera
        },
        enable () {
            if (isUpdate) {
                return;
            }
            isUpdate = true
            console.log('activate')

            prevTime = performance.now()
            controls.lock();
            controls.connect()

        },
        disable () {
            if (!isUpdate) {
                return;
            }
            isUpdate = false
            console.log('deactivate')

            controls.unlock();
            controls.disconnect()
        },
        update () {
            if (!isUpdate) {
                return;
            }

            const time = performance.now()

            if (controls.isLocked === true) {
                const delta = ( time - prevTime ) / 1000

                velocity.x -= velocity.x * 10.0 * delta
                velocity.z -= velocity.z * 10.0 * delta

                velocity.y = 0

                direction.z = Number( moveForward ) - Number( moveBackward );
                direction.x = Number( moveRight ) - Number( moveLeft );
                direction.normalize() // this ensures consistent movements in all directions

                if ( moveForward || moveBackward ) velocity.z -= direction.z * 100.0 * delta
                if ( moveLeft || moveRight ) velocity.x -= direction.x * 100.0 * delta

                controls.moveRight( - velocity.x * delta )
                controls.moveForward( - velocity.z * delta )
            }

            prevTime = time;

        },
    }
}
