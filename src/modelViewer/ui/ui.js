import { POSES } from '../entities/CameraAnim'
import {
    ORBIT,
    WALK,
    ANIMATE,
} from "../constants/constants";


export const createUi = root => {
    const buttonOrbit = document.querySelector('#fly-button')
    buttonOrbit.innerText = ORBIT
    buttonOrbit.addEventListener('click', () => {
        root.actions.toggleViewMode(ORBIT)
    })
    buttonOrbit.style.display = 'block'



    const buttonWalk = document.querySelector('#walk-button')
    buttonWalk.innerText = WALK
    buttonWalk.addEventListener('click', () => {
        root.actions.toggleViewMode(WALK)
    })
    buttonWalk.style.display = 'block'



    /** animated cam buttons container */
    const containerFlyButtons = document.querySelector('#fly-buttons-cont')
    containerFlyButtons.style.display = 'flex'
    for (let key in POSES) {
        const but = document.createElement('button')
        but.innerText = key
        but.addEventListener('click', () => {
            root.actions.toggleViewMode(ANIMATE, key)
        })
        containerFlyButtons.appendChild(but)
    }


    /** loading */
    const startScreen = document.querySelector('#loading')
    startScreen.style.display = 'flex'
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
