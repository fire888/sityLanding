import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



export const createFlyControls = root => {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    camera.position.set( -131, 45, 75);

    document.addEventListener('click', () => {
        console.log(camera.position, controls.target)
    })


    const controls = new OrbitControls(camera, root.studio.getRenderer().domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    controls.target.set( 0, 0, 200);
    controls.update();
    controls.maxPolarAngle = Math.PI / 2 - 0.1


    return {
        enable () {

        },
        disable () {

        },
        update () {

        },
        getCamera () {
            return camera
        }
    }
}
