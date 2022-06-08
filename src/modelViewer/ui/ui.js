import { POSES } from '../CameraAnim'


export const createUi = root => {

    const buttonFly = document.querySelector('#fly-button')
    buttonFly.addEventListener('click', () => {
        root.actions.toggleViewMode('fly')
    })

    const buttonWalk = document.querySelector('#walk-button')
    buttonWalk.addEventListener('click', () => {
        root.actions.toggleViewMode('walk')
    })

    /** animated cam buttons container */
    const containerFlyButtons = document.querySelector('#fly-buttons-cont')
    for (let key in POSES) {
        const but = document.createElement('button')
        but.innerText = key
        but.addEventListener('click', () => {
            root.actions.animatedCameraFlyTo(key)
        })
        containerFlyButtons.appendChild(but)
    }


    /** loading */
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
        hideStartScreen: () => {
            clearTimeout(timer)
            startScreen.style.display = 'none'
        }
    }
}
