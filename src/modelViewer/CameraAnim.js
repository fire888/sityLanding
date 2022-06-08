import * as THREE from 'three';
import { createLinear } from './helpers/tween'


export const POSES = {
    start: {
        cam: [-16.41287882792885, 23.074102553181635, 130.30291017608573],
        target: [-40.518090342270916, -24.244384703348235, 165.19354856630358],
    },
    main: {
        cam: [-19.805954910660184, 15.719783732445295, 133.46271166877176],
        target: [-47.49527741595833, -11.155287785658883, 171.9196216749328],
    },
    hotel: {
        cam: [-15.981156043296131,9.066671976726937,143.05739124893896],
        target: [-35.939880649210586,-25.513920397636134,167.29605083852454],
    },
    business: {
        cam: [-20.905469209271924,9.546984838531513,141.41224627317698],
        target: [-45.09135575449415,-11.357637993184627,175.46691279395992]
    },
    factory: {
        cam: [-14.039805535779077,4.958125188954856,134.14926013236715],
        target: [-45.32383195785656,-27.077468396797318,120.85598702196799],
    },
    rocket: {
        cam: [-29.718793908275927,12.283580628508414,157.28232150487455],
        target: [-50.0434977966361,-4.71869710173899,176.3028378417864],
    },
    apart: {
        cam: [-20.366203630451654,7.109934542808766,136.49843192700297],
        target: [-48.89616707935585,-19.587220903350023,115.46821827194314],
    }
}



export const createAnimatedCamera = () => {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .01, 3000)

    let currentPosKey = 'start'
    let targetPosKey = null
    let tween = null

    camera.position.set(...POSES[currentPosKey].cam)
    const vTarget = new THREE.Vector3(...POSES[currentPosKey].target)
    camera.lookAt(vTarget)


    /** camera movie ****************************/
    const vCamStart = new THREE.Vector3()
    const vCamEnd = new THREE.Vector3()

    const vTargetStart = new THREE.Vector3()
    const vTargetEnd = new THREE.Vector3()

    const createTween = () => {
        vCamStart.copy(camera.position)
        vCamEnd.fromArray(POSES[targetPosKey].cam)

        vTargetStart.copy(vTarget)
        vTargetEnd.fromArray(POSES[targetPosKey].target)

        tween = createLinear(1000)
    }
    const updateTween = () => {
        tween(val => {
            vTarget.lerpVectors(vTargetStart, vTargetEnd, val)
            camera.position.lerpVectors(vCamStart, vCamEnd, val)
            camera.lookAt(vTarget)
            if (val === 1) {
                currentPosKey = targetPosKey
                tween = null
            }
        })
    }



    return {
        enable () {

        },
        disable () {

        },
        update () {
            tween && updateTween()
        },
        getCamera () {
            return camera
        },
        flyTo(key) {
            if (key === currentPosKey) {
                return;
            }
            targetPosKey = key
            createTween()
        }
    }
}


