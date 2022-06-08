export const createActions = root => {

    const {
        studio,
        city,
        stats,
        flyControls,
        walkControls,
        animatedCamera,
        ui,
    } = root


    /** update frame */
    let oldTime = Date.now()

    const animate = () => {
        requestAnimationFrame( animate );
        const currentTime = Date.now()
        const diff = currentTime - oldTime
        oldTime = currentTime
        stats.begin()

        city.update(diff / 15)
        flyControls.update()
        walkControls.update()
        animatedCamera.update()

        studio.render()
        stats.end()
    }
    animate()


    return {
        launch: async function () {
            await city.initModel()
            studio.addToScene(city.getScene())
            studio.setCamera(flyControls.getCamera())
            flyControls.enable()
            studio.setCamera(flyControls.getCamera())
            studio.resize()
            studio.render()
            ui.hideStartScreen()
        },
        toggleViewMode (mode) {
            if (mode === 'walk') {
                animatedCamera.disable()
                flyControls.disable()

                studio.setCamera(walkControls.getCamera())
                walkControls.enable()
            }
            if (mode === 'fly') {
                animatedCamera.disable()
                walkControls.disable()

                studio.setCamera(flyControls.getCamera())
                flyControls.enable()
            }
            studio.resize()
            ui.changeModeButtonWalk(mode)
        },
        animatedCameraFlyTo (key) {
            console.log(key)
            flyControls.disable()
            walkControls.disable()

            animatedCamera.enable()
            animatedCamera.flyTo(key)
            studio.setCamera(animatedCamera.getCamera())
        }
    }
}