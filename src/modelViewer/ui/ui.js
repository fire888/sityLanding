export const createUi = root => {
    let mode = 'fly'
    const buttonToggleView = document.querySelector('#walk-button')
    buttonToggleView.addEventListener('click', () => {
        mode = mode === 'fly' ? 'walk' : 'fly'
        buttonToggleView.innerText = mode
        root.actions.toggleViewMode(mode)
    })


    const startScreen = document.querySelector('#loading')
    const progress = document.querySelector('#progress')
    let str = ''
    let timer = null
    const animateLoading = () => {
        timer = setTimeout(() => {
            str += '.'
            progress.innerText = str
            str.length > 50 && (str = '')
            animateLoading()
        }, 14)
    }
    animateLoading()




    return {
        changeModeButtonWalk: modeNew =>  {
            mode = modeNew
            buttonToggleView.innerText = mode
        },
        hideStartScreen: () => {
            clearTimeout(timer)
            startScreen.style.display = 'none'
        }
    }
}
