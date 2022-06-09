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

        if (currentCamera) {
            studio.setCamera(currentCamera.getCamera())
            currentCamera.enable()
        }

        studio.resize()
        studio.render()

        ui && ui.hideStartScreen()
    }


    /** change view mode */
    const toggleViewMode = (mode, params = null) => {
        animatedCamera && animatedCamera.disable()
        orbitControls && orbitControls.disable()
        walkControls && walkControls.disable()

        let currentCamera = null

        if (mode === WALK) {
            if (!walkControls) {
                return;
            }
            currentCamera = walkControls
        }
        else if (mode === ORBIT) {
            if (!orbitControls) {
                return;
            }
            currentCamera = orbitControls
        }
        else if (mode === ANIMATE) {
            if (!animatedCamera) {
                return;
            }
            currentCamera = animatedCamera
            animatedCamera.flyTo(params)
        } else {
            return;
        }

        currentCamera.enable()
        studio.setCamera(currentCamera.getCamera())

        studio.resize()
        studio.render()
    }


    return {
        launch,
        toggleViewMode,
        animatedCameraFlyTo: keyFlyTo => toggleViewMode(ANIMATE, keyFlyTo)
    }
}