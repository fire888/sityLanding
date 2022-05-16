import './styleseets/style.css'

import WebGL from 'three/examples/jsm/capabilities/WebGL';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { createStudio } from './modelViewer/studio'
import { createModel } from './modelViewer/city'


const threeApp = () => {
    const studio = createStudio()
    const city = createModel(() => {
        studio.addToScene(city.getScene())
        studio.setCamera(city.getCamera())
        onWindowResize()
        studio.render()
    })


    const stats = new Stats();
    document.body.appendChild(stats.dom)





    let oldTime = Date.now()
    const animate = () => {
        requestAnimationFrame( animate );
        stats.begin()
        const currentTime = Date.now()
        const diff = currentTime - oldTime
        oldTime = currentTime
        city.update(diff / 15)
        studio.render()
        stats.end()
    }
    animate()





    const onWindowResize = () =>  {
        studio.resize()
    }
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()




    const scrollContainer = document.querySelector('#scroll-container');
    const scrolledContainer = document.querySelector('.scene-container');
    const defBetweenBlockAndScroll = scrollContainer.offsetHeight - scrolledContainer.offsetHeight;
    scrolledContainer.addEventListener('scroll', e => {
        city.updateAnimationCamera(scrolledContainer.scrollTop / defBetweenBlockAndScroll)
    })







    const isWebGL = () => {
        if ( WebGL.isWebGLAvailable() ) {
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'container' ).appendChild( warning );

        }
    }
    isWebGL()
}


threeApp()


/** OLD

import WebGL from './WebGL.js';
// tween
// import * as TWEEN from '@tweenjs/tween.js';
// three
import * as THREE from 'three';
// user interface
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { ProgressiveLightMap } from 'three/examples/jsm/misc/ProgressiveLightMap.js';
// статистика
import Stats from 'three/examples/jsm/libs/stats.module.js';
// контроль камеры
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// загрузчики
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// рефлектор
// import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
// пост-процессинг
// обязателен для процессинга
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
//ambient occlusion
// import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';
// import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
// Screen-space reflections
// import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';

// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
// import { ReflectorForSSRPass } from 'three/examples/jsm/objects/ReflectorForSSRPass.js';

// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Color } from 'three';
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';


// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
// import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export const threeApp = () => {

    //! Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    //! Scene
    const scene = new THREE.Scene();
    // const pmremGenerator = new THREE.PMREMGenerator( renderer );
    // const backgroundTexture = new THREE.TextureLoader().load('./../../img/Frame8744.png');
    // backgroundTexture.wrapS = THREE.RepeatWrapping;
    // backgroundTexture.wrapT = THREE.RepeatWrapping;
    // backgroundTexture.repeat.set( 4, 4 );
    // scene.background = backgroundTexture;

    const envTexture = new THREE.TextureLoader().load('./../../img/Frame8744.png');
    // envTexture.wrapS = THREE.RepeatWrapping;
    // envTexture.wrapT = THREE.RepeatWrapping;
    // envTexture.repeat.set( 4, 4 );
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // scene.environment = new RoomEnvironment();
    // scene.environment = pmremGenerator.fromEquirectangular(envTexture).texture;

    //! Colors
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.physicallyCorrectLights = true;

    //! Shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //! Container
    let container = document.querySelector('#scene');
    container.style.width = '100%';
    container.style.height = '100%';
    container.appendChild( renderer.domElement );

    renderer.setSize(window.innerWidth, window.innerHeight);

    //! Camera
    // const cameraGroup = new THREE.Group();
    // scene.add(cameraGroup);

    let camera;
    // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.set(200, 200, 200); // 0, 150, 0
    // let secCam = camera;
    // camera.lookAt(200, 200, 200);
    // cameraGroup.add(camera);


    //! Post-processing
    // const composer = new EffectComposer( renderer ); // добавить в анимацию composer.render( scene, camera ) вместо renderer.render( scene, camera );;

    // const renderPass = new RenderPass( scene, camera );
    // composer.addPass( renderPass );

    // const saoPass = new SAOPass( scene, camera, false, true );
    // saoPass.params.saoIntensity = 0.002;
    // composer.addPass( saoPass );

    //! orbitControls
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.enabled = true; // false

    //! Light
    //? ambient
    // const ambientLight = new THREE.AmbientLight( '#C8D1FF', 1);
    // scene.add( ambientLight );

    // //? directional light - иммитация солнечного света
    // const directionalLight = new THREE.DirectionalLight( 'red', 1);
    // directionalLight.castShadow = true;
    // // pos
    // directionalLight.position.set(0, 200, 100);
    // //sizes
    // directionalLight.shadow.mapSize.width = 2048; // default
    // directionalLight.shadow.mapSize.height = 2048; // default
    // directionalLight.shadow.camera.near = 1; // default
    // directionalLight.shadow.camera.far = 500; // default
    // directionalLight.shadow.camera.left = -150;
    // directionalLight.shadow.camera.right = 150;
    // directionalLight.shadow.camera.top = -150;
    // directionalLight.shadow.camera.bottom = 150;
    // scene.add( directionalLight );
    // const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    // scene.add( directionalLightHelper );
    // const shadowHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
    // scene.add( shadowHelper );

    //? point light
    // const light = new THREE.PointLight( 0xffffff, 1, 100 );
    // light.position.set( -9, -12, -17);
    // light.castShadow = true;
    // scene.add( light );

    // const lightCoords = {x: -9, y: -12, z: -17};
    // const LightTween = new TWEEN.Tween(lightCoords)
    // .to({x: -9, y: 12, z: -17}, 2500)
    // .easing(TWEEN.Easing.Linear.None)
    // .onUpdate(() => {
    // 	light.position.set(`${lightCoords.x}`, `${lightCoords.y}`, `${lightCoords.z}`)
    // })
    // .start();
    //? rect area light

    //? hemisphere light
    // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    // scene.add( light );
    // const helper = new THREE.HemisphereLightHelper( light, 5 );
    // scene.add( helper );

    //? spotlight

    //? pointlight - иммитация лампочки


    //! user interface
    // const gui = new GUI();

    // // GUI
    // gui.add( ssaoPass, 'output', {
    //     'Default': SSAOPass.OUTPUT.Default,
    //     'SSAO Only': SSAOPass.OUTPUT.SSAO,
    //     'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
    //     'Beauty': SSAOPass.OUTPUT.Beauty,
    //     'Depth': SSAOPass.OUTPUT.Depth,
    //     'Normal': SSAOPass.OUTPUT.Normal
    // } ).onChange( function ( value ) {

    //     ssaoPass.output = parseInt( value );

    // } );
    // gui.add( ssaoPass, 'kernelRadius' ).min( 0 ).max( 32 );
    // gui.add( ssaoPass, 'minDistance' ).min( 0.001 ).max( 0.02 );
    // gui.add( ssaoPass, 'maxDistance' ).min( 0.01 ).max( 0.3 );

    // ! Textures
    // sphere
    // let sphereT = new THREE.TextureLoader().load( "files/txtrs/txtrs/aosphere.png" );

    // let sphereLight = new THREE.TextureLoader().load( "files/txtrs/txtrs/shadow.png" );

    // let sphereLightMap = new THREE.TextureLoader().load( "files/txtrs/txtrs/shadow.png" );
    // house
    // let houseT = new THREE.TextureLoader().load( "../../img/PavingStones/color.jpg" );
    // houseT.wrapS = THREE.RepeatWrapping;
    // houseT.wrapT = THREE.RepeatWrapping;
    // houseT.repeat.set( 20, 20 );
    // scene.environment = houseT;
    // ! Material

    //! geometry


    //! mixer
    let mixer;

    //! Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./../../files/draco/gltf/');
    dracoLoader.setDecoderConfig({type: 'js'})
    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.load(
        'files/final/citylowcarblendwithbakecamera.gltf',
        function ( gltf ) {
            camera = gltf.cameras[0];
            mixer = new THREE.AnimationMixer( gltf.scene );
            console.log(gltf.scene);
            console.log(gltf.cameras);
            console.log(gltf.animations[1]);


            //? переключение камер по dblclick
            // container.addEventListener('dblclick', (e) => {
            //     container.classList.toggle('clicked');
            //     if (container.classList.contains('clicked')) {
            //         camera = gltf.cameras[0];
            //         mixer.clipAction( gltf.animations[1] ).play();
            //         console.log(camera);
            //     } else {
            //         camera = secCam;
            //         mixer.clipAction( gltf.animations[1] ).reset();
            //     }
            // });

            gltf.scene.traverse(function(node) {
                if (node.name == "Солнце") {
                    // console.log(node.children[0]);
                    //     node.children[0].castShadow = false;
                    //     node.children[0].shadow.mapSize.width = 1024;
                    //     node.children[0].shadow.mapSize.height = 1024;
                    //     node.children[0].shadow.radius = 4;
                    //     node.children[0].intensity = 80;
                    // const helper = new THREE.DirectionalLightHelper( node.children[0], 10, 'red' );
                    // scene.add(helper);
                    // const cameraHelper = new THREE.CameraHelper( node.children[0].shadow.camera );
                    // scene.add( cameraHelper );
                }
            });

            let clips = gltf.animations;
            clips.forEach( function ( clip ) {
                if (clip.name != 'Action') {
                    mixer.clipAction( clip ).clampWhenFinished = true;
                    mixer.clipAction( clip ).play();
                    // mixer.clipAction( clip ).loop = THREE.LoopOnce;
                }
            });
            // window.addEventListener("wheel", e => {
            //     let scrolled = e.deltaY;
            //     console.log(`scrolled: ${scrolled}`);
            //     mixer.clipAction( gltf.animations[1] ).play();
            //     if (scrolled > 0) {
            //         mixer.clipAction(gltf.animations[1]).warp(0, 1, 1);
            //         // mixer.clipAction(gltf.animations[1]).timeScale = 1;
            //     } else {
            //         mixer.clipAction(gltf.animations[1]).warp(0, -1, 1);
            //         // mixer.clipAction(gltf.animations[1]).timeScale = -1;
            //     }
            //     setTimeout(() => {
            //         // mixer.clipAction(gltf.animations[1]).stopWarping();
            //         // mixer.clipAction(gltf.animations[1]).setEffectiveTimeScale(0);
            //         // mixer.clipAction(gltf.animations[1]).warp(0, 0, 0);
            //         scrolled = 0;
            //     }, 300);
            // })

            let cameraForAnimation = gltf.scene.children[1];
            let cameraForAnimationMixer = new THREE.AnimationMixer( cameraForAnimation );
            let cameraForAnimationClip = gltf.animations[1];
            let cameraForAnimationAction = cameraForAnimationMixer.clipAction(cameraForAnimationClip);
            cameraForAnimationAction.play();

            const scrollContainer = document.querySelector('#scroll-container');
            const scrolledContainer = document.querySelector('.scene-container');
            let defBetweenBlockAndScroll = scrollContainer.offsetHeight - scrolledContainer.offsetHeight;
            console.log(`scroll points: ${defBetweenBlockAndScroll}`);

            let durationOfKeyframe = cameraForAnimationClip.duration; // длительность клипа
            console.log(`duration of clip: ${durationOfKeyframe}`);
            let lengthOfKeyframe = cameraForAnimationClip.tracks[0].times.length; // длина самого большого отрезка по времени
            let keyframesPerSecond = lengthOfKeyframe / durationOfKeyframe; // кол-во кадров в секунду
            console.log(`keyframes per second: ${keyframesPerSecond}`);
            let speed = durationOfKeyframe / defBetweenBlockAndScroll; // кол-во времени за 1 поинт скролла
            console.log(`second per scrollpoint: ${speed}`);

            let oldScrollValue = 0;
            scrolledContainer.addEventListener('scroll', e => {
                let newScrollValue = scrolledContainer.scrollTop;
                console.log(newScrollValue);

                if (newScrollValue - oldScrollValue > 0) {
                    cameraForAnimationMixer.update( (newScrollValue - oldScrollValue) * (speed));
                } else {
                    cameraForAnimationMixer.update( (newScrollValue - oldScrollValue) * (speed));
                }
                oldScrollValue = newScrollValue;
            });


            scene.add( gltf.scene );

            isWebGL();


            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Group
            // gltf.scenes; // Array<THREE.Group>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object

        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        }

    );


    //! статистика
    let stats = new Stats();
    container.appendChild( stats.dom );

    //! clock
    const clock = new THREE.Clock();
    let previousTime = 0 // for cursor animation

    // // ??????????????????????????????
    // const pmremGenerator = new THREE.PMREMGenerator( renderer );
    // scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;



    //! tween
    // const Xa = [0, -60];
    // const Ya = [50, 50];
    // const Za = [50, 100];
    // const tweenCoords = {x: 0, y: 200};
    // const tweenTarget = {x: -63, y: 55};
    // const tween = new TWEEN.Tween(tweenCoords)
    // .to(tweenTarget, 4000)
    // // .interpolation(TWEEN.Interpolation.CatmullRom)
    // .easing(TWEEN.Easing.Quartic.InOut)
    // .onUpdate(() => {
    // 	camera.position.set(tweenCoords.x, tweenCoords.y, 50);
    // });

    // // const coords2 = {x: 0, y: 50, z: 50}
    // // const tween2 = new TWEEN.Tween(coords2)
    // // .to({x: -64, y: 30, z: 50}, 5000)
    // // .easing(TWEEN.Easing.Quadratic.In)
    // // .onUpdate(() => {
    // // 	camera.position.set(coords2.x, coords2.y, coords2.z);
    // // });
    // // tween.chain(tween2);
    // tween.start();

    //! cursor
    const cursor = {
        x: 0,
        y: 0,
    }
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX / window.innerWidth - 0.5; // нужно указывать размер контейнера
        cursor.y = e.clientY / window.innerHeight - 0.5; // нужно указывать размер контейнера
    })

    //! animate
    // цикл рендеринга анимации - 60 кадров в секунду
    function animate() {
        requestAnimationFrame( animate );

        const delta = clock.getDelta();

        // stats start
        stats.begin();
        mixer.update(0.008);
        // renderer
        renderer.render( scene, camera );
        // composer.render(scene, camera);
        // stats end
        stats.end();

        // TWEEN.update();
        // let mixerUpdateDelta = cameraStep;
        // cameraStep = 0;
        // mixer.update(mixerUpdateDelta); //mixerUpdateDelta
        // camera.lookAt( scene.position );
        // animate();

        const elapsedTime = clock.getElapsedTime(); // for scroll animation
        const deltaTime = elapsedTime - previousTime; // for scroll animation
        previousTime = elapsedTime; // for scroll animation

        const parallaxX = cursor.x * 5; // for scroll animation (изменение цифры - изменение расстояния движения)
        const parallaxY = - cursor.y * 5; // for scroll animation (изменение цифры - изменение расстояния движения)
        camera.position.x += (parallaxX - camera.position.x) * 5 * deltaTime; // for scroll animation (если камера фиксированная)
        camera.position.y += (parallaxY - camera.position.y) * 5 * deltaTime; // for scroll animation (если камера фиксированная)
        // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1; // for scroll animation (если камера динамическая)
        // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1; // for scroll animation (если камера динамическая)
    }

    //! Resize
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // composer
        // composer.setSize(window.innerWidth, window.innerHeight);
    }


    // //! проверка поддержки webGL
    const isWebGL = () => {
        if ( WebGL.isWebGLAvailable() ) {
            animate();
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'container' ).appendChild( warning );

        }
    }


}

*/