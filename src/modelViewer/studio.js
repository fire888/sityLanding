import * as THREE from 'three';
import envMapSrc from '../assets/Frame8744.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';




export const createStudio = () => {
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';


    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio( /*window.devicePixelRatio*/ 1 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.physicallyCorrectLights = true;

    container.appendChild( renderer.domElement );
    // //! Shadows
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    //const envTexture = new THREE.TextureLoader().load(envMapSrc);
    //envTexture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.environment = envTexture;

    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    camera.position.set( 0, 100, -100);
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 2;
    // controls.maxDistance = 40000;
    // controls.target.set( 0, 0, 200);
    // controls.update();
    // controls.maxPolarAngle = Math.PI / 2 - 0.1


    const light = new THREE.PointLight( 0xFFF5E5, .8 )
    light.position.set(20, 20, 40)
    camera.add(light)

    const light2 = new THREE.PointLight( 0xFFF5E5, .2 )
    light2.position.set(-30, 20, -40)
    camera.add(light2)

    const ambLight = new THREE.AmbientLight(0x474954)
    scene.add(ambLight)



    return {
        addToScene(model) {
            scene.add(model)
        },
        render () {
            camera && renderer.render( scene, camera );
        },
        setCamera (cam) {
            camera = cam
        },
        resize () {
            if (!camera) {
                return;
            }
            console.log('resize')
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            console.log(renderer.domElement)
        },
    }
}
