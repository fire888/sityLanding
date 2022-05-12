import * as THREE from 'three';
import envMapSrc from '../assets/Frame8744.png'




export const createStudio = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );
    //renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.physicallyCorrectLights = true;
    const container = document.querySelector('#scene');
    container.style.width = window.innerWidth + 'px'
    container.style.height = window.innerHeight + 'px';
    container.appendChild( renderer.domElement );
    // //! Shadows
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const envTexture = new THREE.TextureLoader().load(envMapSrc);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    let camera;



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
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },
    }
}
