export const createActions = root => {

    const {
        studio,
        city,
        stats,
        flyControls,
        walkControls,
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
            studio.render()
            ui.hideStartScreen()
        },
        toggleViewMode (mode) {
            if (mode === 'walk') {
                studio.setCamera(walkControls.getCamera())
                flyControls.disable()
                walkControls.enable()
            }
            if (mode === 'fly') {
                walkControls.disable()
                flyControls.enable()
                studio.setCamera(flyControls.getCamera())
            }
            ui.changeModeButtonWalk(mode)
        }
    }
}