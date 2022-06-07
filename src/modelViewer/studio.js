import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Saturate } from './shaders/saturate'


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



    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
    const saturate = new ShaderPass(Saturate)
    composer.addPass(saturate)

    console.log(saturate)



    const directionalLight = new THREE.DirectionalLight( 0xFFC9F6, 0.4);
    directionalLight.position.set(0, 100, -50)
    directionalLight.target.position.set(0, 0, 0)
    scene.add( directionalLight );

    const ambLight = new THREE.AmbientLight(0xECC9FF, .8)
    scene.add(ambLight)

    const fog = new THREE.Fog( BACK_COLOR, 100, 500)
    scene.fog = fog

    let time = 0.01

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
            time += 0.01
            saturate.uniforms.uTime.value = time
            saturate.uniforms.uNoiseMix.value = (Math.sin(time) + 1) * .1
            composer.render(scene, camera)
           //camera && renderer.render( scene, camera );
        },
        setCamera (cam) {
            camera = cam
            renderPass.camera = camera
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
