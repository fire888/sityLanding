import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const CAM_POS = [-17.00085276697039, 14.833771478846735, 121.93490477876742]
const TARGET_POS = [-55.48468777487933,-16.153006104687872,161.88826713723594]



export const createFlyControls = root => {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    camera.position.set(...CAM_POS);

    document.addEventListener('click', () => {
        console.log('FlyCamPos:')
        console.log(`cam: ${JSON.stringify(camera.position.toArray())}, target: ${JSON.stringify(controls.target.toArray())}`)
    })


    const controls = new OrbitControls(camera, root.studio.getRenderer().domElement);
    controls.minDistance = 2;
    controls.maxDistance = 40000;
    //controls.target.set( 0, 0, 200);
    controls.target.set(...TARGET_POS)
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
