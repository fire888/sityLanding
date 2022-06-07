import * as THREE from 'three';

const BACK_COLOR = 0xDBE5FF

export const createStudio = () => {

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( /*window.devicePixelRatio*/ 1 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(BACK_COLOR, 1)
    //renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.physicallyCorrectLights = true;

    const domWrapper = document.querySelector('#scene')
    domWrapper.appendChild( renderer.domElement );

    //container.appendChild( renderer.domElement );
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

    const directionalLight = new THREE.DirectionalLight( 0xFFC9F6, 0.8);
    directionalLight.position.set(0, 100, -100)
    directionalLight.target.position.set(0, 0, 0)
    scene.add( directionalLight );

    const ambLight = new THREE.AmbientLight(0xECC9FF, .4)
    scene.add(ambLight)

    const fog = new THREE.Fog( BACK_COLOR, 100, 500)
    scene.fog = fog


    return {
        addToScene(model) {
            scene.add(model)
        },
        removeFromScene (obj) {
            scene.remove(obj)
        },
        getRenderer () {
          return renderer;
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
