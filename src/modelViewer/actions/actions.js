import {
    ORBIT,
    WALK,
    ANIMATE,
} from "../constants/constants";


export const createActions = root => {

    const {
        studio,
        city,
        stats,
        orbitControls,
        walkControls,
        animatedCamera,
        ui,
    } = root


    /** update frame */
    let oldTime = Date.now()

    const animate = () => {
        requestAnimationFrame(animate)
        const currentTime = Date.now()
        const diff = currentTime - oldTime
        oldTime = currentTime

        stats && stats.begin()

        city.update(diff / 15)

        orbitControls && orbitControls.update()
        walkControls && walkControls.update()
        animatedCamera && animatedCamera.update()

        studio.render()

        stats && stats.end()
    }
    animate()


    /** launch pipeline */
    async function launch () {
        await city.initModel()
        studio.addToScene(city.getScene())

        let currentCamera
        if (animatedCamera) {
            currentCamera = animatedCamera
        } else if (orbitControls) {
            currentCamera = orbitControls
        } else if (walkControls) {
            currentCamera = walkControls
        }

        studio.setCamera(currentCamera.getCamera())
        currentCamera.enable()

        studio.resize()
        studio.render()

        ui && ui.hideStartScreen()
    }


    /** change view mode */
    const toggleViewMode = (mode, params) => {
        animatedCamera && animatedCamera.disable()
        orbitControls && orbitControls.disable()
        walkControls && walkControls.disable()

        if (mode === WALK) {
            if (!walkControls) {
                return;
            }
            studio.setCamera(walkControls.getCamera())
            walkControls.enable()
        }
        if (mode === ORBIT) {
            if (!orbitControls) {
                return;
            }
            studio.setCamera(orbitControls.getCamera())
            orbitControls.enable()
        }
        if (mode === ANIMATE) {
            if (!animatedCamera) {
                return;
            }
            animatedCamera.enable()
            animatedCamera.flyTo(params)
            studio.setCamera(animatedCamera.getCamera())
        }

        studio.resize()
        studio.render()
    }


    return {
        launch,
        toggleViewMode,
        animatedCameraFlyTo: keyFlyTo => toggleViewMode(ANIMATE, keyFlyTo)
    }
}