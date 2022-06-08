import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Saturate } from './shaders/saturate'


const BACK_COLOR = 0xDBE5FF

/** contr */
const DIR_LIGHT_POS = [-100, 71.62169713776247, 100]
const DIR_LIGHT_TARGET = [-27.015390751035834, -21.99842461829956, 0]

/** front */
const DIR_LIGHT_F_POS = [100, 200, -100]
const DIR_LIGHT_F_TARGET = [-27.015390751035834, -21.99842461829956, 0]


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
    //scene.scale.set(1, .6, 1)
    //const envTexture = new THREE.TextureLoader().load(envMapSrc);
    //envTexture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.environment = envTexture;


    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000);
    camera.position.set( 0, 100, -100);
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    // const directionalLight = new THREE.DirectionalLight( 0xFFC9F6, 0.9);
    // directionalLight.position.set(...DIR_LIGHT_POS)
    // directionalLight.target.position.set(...DIR_LIGHT_TARGET)
    // scene.add(directionalLight)

    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
    const saturate = new ShaderPass(Saturate)
    composer.addPass(saturate)

    const directionalLight2 = new THREE.DirectionalLight( 0xFFC9F6, 0.9);
    directionalLight2.position.set(...DIR_LIGHT_F_POS)
    directionalLight2.target.position.set(...DIR_LIGHT_F_TARGET)
    scene.add(directionalLight2)


    const ambLight = new THREE.AmbientLight(0x9999FF, .7)
    scene.add(ambLight)

    const fog = new THREE.Fog( BACK_COLOR, 30, 80)
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
           //camera && renderer.render( scene, camera );
            time += 0.01
            saturate.uniforms.uTime.value = time
            saturate.uniforms.uNoiseMix.value = (Math.sin(time) + 1) * .1
            composer.render(scene, camera)
           //camera && renderer.render( scene, camera );
        },
        setCamera (cam) {
            camera = cam
            scene.add(cam)
            cam.scale.set(1, 1.3, 1)
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
