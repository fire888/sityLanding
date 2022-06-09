import * as THREE from 'three';
import { createLoader } from '../helpers/loader'

import sceneModelSrc from '../../assets/sityModel/citylowcarblendwithbakecamera.gltf'
import '../../assets/sityModel/citylowcarblendwithbakecamera.bin'






export const createModel = (onComplete, onProcess = () => {}, onError = () => {}) => {
    let gltf
    let mixer
    let cameraForAnimationMixer
    let speedCam

    const loader = createLoader()


    let oldPhaseCam = 0

    return {
        initModel () {
            return new Promise(resolve => {
                loader.load(sceneModelSrc, onError, onProcess, model => {
                    //console.log(model)
                    gltf = model

                    const arrTrees = []
                    const arrCars = []
                    const arrCubes = []

                    const materials = {}


                    model.scene.traverse(item => {
                        if (!item.name) {
                            return;
                        }

                        if (item.material) {
                            let isIn = false
                            for (let key in materials) {
                                if (materials[key].uuid === item.material.uuid) {
                                    isIn = true
                                }
                            }
                            !isIn && (materials[item.name] = item.material)
                        }


                        if (item.name.includes('ель') || item.name.includes('дерево')) {
                            //console.log(item)
                            arrTrees.push(item)
                        }
                        if (item.name.includes('Машина')) {
                            arrCars.push(item)
                        }
                    })

                    //console.log(materials)

                    const colorsHouses = new THREE.Color(1, 1.1, 1.2)


                    const colors = {

                        'Плоскость025_2': new THREE.Color(.85, 0, .93),
                        /** logo2 */
                        'Плоскость025_1': new THREE.Color(.85, 0, .93),


                        /** деревья машины */
                        'дерево2346': new THREE.Color(.9, 1, 1),

                        /** гора */
                        //materials['Landscape002'].color = new THREE.Color(.90, .93, .85)
                        'Landscape002': new THREE.Color(.85, 1, .93),

                        /** ракета */
                        'Куб009_1': new THREE.Color(.91, .93, .99),

                        /** дома3 */
                        'Куб046': colorsHouses,

                        /** дома2 */
                        'Куб019_1': colorsHouses,

                        /** factory */
                        'Куб020': colorsHouses,
                        //materials['Куб020'].map = null

                        /** main */
                        'Плоскость003_2': colorsHouses,
                        //materials['Плоскость003_2'].map = null

                        /** okna */
                        'Плоскость003_3': new THREE.Color(.65, .65, .7),


                        /** skyscreapers */
                        'Плоскость005_2': colorsHouses,
                        //materials['Плоскость005_2'].map = null

                        /** hotel */
                        'Плоскость007_1': colorsHouses,
                        // materials['Плоскость007_1'].map = null

                        /** treo  */
                        'Плоскость008_1': colorsHouses,
                        //materials['Плоскость008_1'].map = null

                        /** road */
                        'Плоскость009': new THREE.Color(.77, .87, .93),

                        /** color areas */
                        'Плоскость009_1': new THREE.Color(.83, .3, .93),

                        /** ground town */
                        'Плоскость009_2': new THREE.Color(.83, 1, .9),

                        /** land */
                        'Плоскость009_3': new THREE.Color(.85, 1, .93),
                        //materials['Плоскость009_3'].map = null
                    }

                    for (let key in materials) {
                        if (colors[key]) {
                            materials[key].color = colors[key]
                        } else {
                            console.log('no material: ', key)
                        }
                    }






                    for (let i = 0; i < arrTrees.length; ++i) {
                        arrTrees[i].parent.remove(arrTrees[i])
                        // const newObj = new THREE.Mesh(
                        //     arrTrees[0].geometry,
                        //     arrTrees[0].material,
                        // )
                        // newObj.position.x = arrTrees[i].position.x
                        // newObj.position.y = arrTrees[i].position.y
                        // newObj.position.z = arrTrees[i].position.z

                        //model.scene.remove(arrTrees[i])
                        //arrTrees[i].geometry.dispose()
                        //arrTrees[i].material.dispose()

                        //model.scene.add(newObj)
                    }

                    // for (let i = 0; i < arrCars.length; ++i) {
                    //     arrCars[i].geometry.dispose()
                    //     //arrCars[i].geometry = arrCars[0].geometry
                    //     arrCars[i].geometry.needsUpdate = true
                    //     arrCars[i].material.dispose()
                    //     gltf.scene.remove(arrCars[i])
                    //
                    //     //arrCars[i].material = arrCars[0].material
                    //     //arrCars[i].material.needsUpdate = true
                    // }

                    // for (let i = 0; i < arrCars.length; ++i) {
                    //     model.scene.remove(arrCars[i])
                    //     arrCars[i].geometry.dispose()
                    //     arrCars[i].material.dispose()
                    // }

                    //model.scene.traverse(item => {
                    //    if (!item.name) {
                    //        return;
                    //    }

                        // if (
                        //     //true
                        //     //item.name.includes('Куб')
                        //     //|| item.name.includes('Плоскость')
                        //     //|| item.name.includes('Икосфера')
                        //     //|| item.name.includes('земля')
                        //     //|| item.name.includes('Landscape')
                        // ) {
                        //     arrCubes.push(item)
                        // }

                        //console.log(item.name)
                    //})

                    // for (let i = 0; i < arrCubes.length; ++i) {
                    //     model.scene.remove(arrCubes[i])
                    //     arrCubes[i].geometry && arrCubes[i].geometry.dispose()
                    //     arrCubes[i].material && arrCubes[i].material.dispose()
                    // }



                    mixer = new THREE.AnimationMixer( gltf.scene );


                    const clips = gltf.animations
                    clips.forEach( function ( clip ) {
                        if (clip.name !== 'Action') {
                            mixer.clipAction( clip ).clampWhenFinished = true;
                            mixer.clipAction( clip ).play();
                        }
                    })



                    // cameraForAnimationMixer = new THREE.AnimationMixer( gltf.scene.children[0] )
                    // const cameraForAnimationClip = gltf.animations[0]
                    // speedCam = 1 / (cameraForAnimationClip.duration - 0.01);
                    // const cameraForAnimationAction = cameraForAnimationMixer.clipAction(cameraForAnimationClip)
                    // cameraForAnimationAction.play()

                    resolve()
                })
            })
        },
        getScene () {
            return gltf.scene
        },
        getCamera () {
            return gltf.cameras[0]
        },
        update (n) {
            if (!mixer) {
                return
            }
            mixer.update(0.008 * n)
        },
        // updateAnimationCamera (phase) {
        //     console.log('update')
        //     if (!cameraForAnimationMixer) {
        //        return;
        //     }
        //     const diff = phase - oldPhaseCam
        //     oldPhaseCam = phase
        //
        //     cameraForAnimationMixer.update(diff / speedCam)
        // }
    }
}






// /** top logo */
// materials['Плоскость025_2'].color = new THREE.Color(.85, 0, .93)
// /** logo2 */
// materials['Плоскость025_1'].color = new THREE.Color(.85, 0, .93)
//
//
//
// /** деревья машины */
// materials['дерево2346'].color = new THREE.Color(.9, 1, 1)
//
// /** гора */
// //materials['Landscape002'].color = new THREE.Color(.90, .93, .85)
// materials['Landscape002'].color = new THREE.Color(.85, 1, .93)
//
// /** ракета */
// materials['Куб009_1'].color = new THREE.Color(.91, .93, .99)
//
// /** дома3 */
// materials['Куб046'].color = new THREE.Color(.86, .94, .86)
//
// /** дома2 */
// materials['Куб019_1'].color = new THREE.Color(.93, 1, .93)
//
// /** factory */
// materials['Куб020'].color = new THREE.Color(.93, 1, .93)
// materials['Куб020'].map = null
//
// /** main */
// materials['Плоскость003_2'].color = new THREE.Color(.93, 1, .93)
// materials['Плоскость003_2'].map = null
//
// setTimeout(() => {
//     /** okna */
//     if (materials['Плоскость003_3']) {
//         materials['Плоскость003_3'].color = new THREE.Color(.65, .65, .7)
//     }
// }, 100)
//
//
// /** skyscreapers */
// materials['Плоскость005_2'].color = new THREE.Color(.93, 1, .93)
// materials['Плоскость005_2'].map = null
//
// /** hotel */
// materials['Плоскость007_1'].color = new THREE.Color(.93, 1, .93)
// materials['Плоскость007_1'].map = null
//
// /** treo  */
// materials['Плоскость008_1'].color = new THREE.Color(.93, 1, .93)
// materials['Плоскость008_1'].map = null
//
// /** road */
// materials['Плоскость009'].color = new THREE.Color(.77, .87, .93)
//
// /** color areas */
// materials['Плоскость009_1'].color = new THREE.Color(.83, .3, .93)
//
// /** ground town */
// materials['Плоскость009_2'].color = new THREE.Color(.83, 1, .9)
//
// /** land */
// materials['Плоскость009_3'].color = new THREE.Color(.85, 1, .93)
// materials['Плоскость009_3'].map = null

