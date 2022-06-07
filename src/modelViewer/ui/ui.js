export const createUi = root => {
    let mode = 'fly'
    const buttonToggleView = document.querySelector('#walk-button')
    buttonToggleView.addEventListener('click', () => {
        mode = mode === 'fly' ? 'walk' : 'fly'
        buttonToggleView.innerText = mode
        root.actions.toggleViewMode(mode)
    })

    return {
        changeModeButtonWalk: modeNew =>  {
            mode = modeNew
            buttonToggleView.innerText = mode
        }
    }
}
