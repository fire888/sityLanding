import * as THREE from 'three';
import envMapSrc from '../assets/Frame8744.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';



const BACK_COLOR = 0xDBE5FF


export const createStudio = () => {
    // const container = document.querySelector('#scene');
    // container.style.width = window.innerWidth + 'px'
    // container.style.height = window.innerHeight + 'px';


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( /*window.devicePixelRatio*/ 1 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(BACK_COLOR, 1)
    //renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.physicallyCorrectLights = true;
    document.body.appendChild( renderer.domElement );

    //container.appendChild( renderer.domElement );
    // //! Shadows
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    //const envTexture = new THREE.TextureLoader().load(envMapSrc);
    //envTexture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.environment = envTexture;




    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let prevTime = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const vertex = new THREE.Vector3();
    const color = new THREE.Color();




    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    //camera.position.set( 0, 100, -100);
    camera.position.set( -50, .7, 150);
    camera.rotation.set( 0, 3.14, 0);
    //camera.lookAt(0, 0, 0)
    scene.add(camera)

    const controls = new PointerLockControls( camera, document.body )
    scene.add( controls.getObject() );


    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {

        controls.lock();

    } );

    controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    } );

    controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    } );


    
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













    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 2;
    // controls.maxDistance = 40000;
    // controls.target.set( 0, 0, 200);
    // controls.update();
    // controls.maxPolarAngle = Math.PI / 2 - 0.1

    const directionalLight = new THREE.DirectionalLight( 0xFFC9F6, 0.4);
    directionalLight.position.set(0, 100, -50)
    directionalLight.target.position.set(0, 0, 0)
    scene.add( directionalLight );

    //const light = new THREE.PointLight( 0xFFF5E5, 1.4 )
    //light.position.set(20, 20, 40)
    //camera.add(light)

    //const light2 = new THREE.PointLight( 0xFFF5E5, .1)
    //light2.position.set(-30, 20, -40)
    //camera.add(light2)

    const ambLight = new THREE.AmbientLight(0xECC9FF, .8)
    scene.add(ambLight)


    const fog = new THREE.Fog( BACK_COLOR, 100, 500)
    scene.fog = fog



    return {
        addToScene(model) {
            scene.add(model)
        },
        render () {
           // camera && renderer.render( scene, camera );



            const time = performance.now();

            if ( controls.isLocked === true ) {

                // raycaster.ray.origin.copy( controls.getObject().position );
                // raycaster.ray.origin.y -= 10;

                //const intersections = raycaster.intersectObjects( objects, false );

                //const onObject = intersections.length > 0;

                const delta = ( time - prevTime ) / 1000;

                velocity.x -= velocity.x * 10.0 * delta;
                velocity.z -= velocity.z * 10.0 * delta;

                velocity.y = 0//-= 9.8 * 100.0 * delta; // 100.0 = mass

                direction.z = Number( moveForward ) - Number( moveBackward );
                direction.x = Number( moveRight ) - Number( moveLeft );
                direction.normalize(); // this ensures consistent movements in all directions

                if ( moveForward || moveBackward ) velocity.z -= direction.z * 100.0 * delta;
                if ( moveLeft || moveRight ) velocity.x -= direction.x * 100.0 * delta;

                //if ( onObject === true ) {

                //    velocity.y = Math.max( 0, velocity.y );
                //    canJump = true;

                //}

                controls.moveRight( - velocity.x * delta );
                controls.moveForward( - velocity.z * delta );

                //controls.getObject().position.y += ( velocity.y * delta ); // new behavior

                // if ( controls.getObject().position.y < 10 ) {

                //     velocity.y = 0;
                //     controls.getObject().position.y = 10;

                //     canJump = true;

                // }

            }

            prevTime = time;


           camera && renderer.render( scene, camera );











        },
        setCamera (cam) {
            camera = cam
        },
        resize () {
            if (!camera) {
                return;
            }
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },
    }
}
