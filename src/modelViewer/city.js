import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import sceneModelSrc from '../assets/sityModel/citylowcarblendwithbakecamera.gltf'
import '../assets/sityModel/citylowcarblendwithbakecamera.bin'
import '../assets/sityModel/txtrs/aobuild1.png'
import '../assets/sityModel/txtrs/aobuild2.png'
import '../assets/sityModel/txtrs/aobuild3.png'
import '../assets/sityModel/txtrs/aobuild4.png'
import '../assets/sityModel/txtrs/aobuild5.png'
import '../assets/sityModel/txtrs/aobuild6 21312.png'
import '../assets/sityModel/txtrs/aoground2.png'
import '../assets/sityModel/txtrs/aoground23123.png'
import '../assets/sityModel/txtrs/aomountain12312.png'
import '../assets/sityModel/txtrs/aosecondary.png'
import '../assets/sityModel/txtrs/aosecondary2.png'


const DRACO_STATIC_PATH = 'draco/gltf/'


export const createModel = (onComplete, onProcess = () => {}, onError = () => {}) => {
    let gltf
    let mixer
    let cameraForAnimationMixer
    let speedCam


    const onLoadSuccess = (model) => {
        gltf = model
        mixer = new THREE.AnimationMixer( gltf.scene );

        const clips = gltf.animations
        clips.forEach( function ( clip ) {
            if (clip.name !== 'Action') {
                mixer.clipAction( clip ).clampWhenFinished = true;
                mixer.clipAction( clip ).play();
            }
        })



        cameraForAnimationMixer = new THREE.AnimationMixer( gltf.scene.children[1] )
        const cameraForAnimationClip = gltf.animations[1]
        speedCam = 1 / (cameraForAnimationClip.duration - 0.01);
        const cameraForAnimationAction = cameraForAnimationMixer.clipAction(cameraForAnimationClip)
        cameraForAnimationAction.play()


        onComplete()
    }


    const onLoadProcess = val => {
        const v = val.loaded / val.total * 100
        console.log( v + '% loaded' );
        onProcess(v)
    }

    const onLoadError = (err) => {
        console.log( 'An error happened', err )
        onError(err)
    }


    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(DRACO_STATIC_PATH)
    dracoLoader.setDecoderConfig({type: 'js'})
    const loader = new GLTFLoader()
    loader.setDRACOLoader( dracoLoader )
    loader.load(sceneModelSrc, onLoadSuccess, onLoadProcess, onLoadError)


    let oldPhaseCam = 0

    return {
        getScene () {
            return gltf.scene
        },
        getCamera () {
            return gltf.cameras[0]
        },
        update () {
            mixer && mixer.update(0.008)
        },
        updateAnimationCamera (phase) {
            if (!cameraForAnimationMixer) {
               return;
            }
            const diff = phase - oldPhaseCam
            oldPhaseCam = phase

            cameraForAnimationMixer.update(diff / speedCam)
        }
    }
}
