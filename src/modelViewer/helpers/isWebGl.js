import WebGL from "three/examples/jsm/capabilities/WebGL";


export const isWebGL = () => {
    if ( WebGL.isWebGLAvailable() ) {
        return true;
    } else {
        const warning = WebGL.getWebGLErrorMessage();
        const warn = document.getElementById( 'warning' )
        warn.appendChild( warning );
        warn.style.display = 'flex'
        return false;
    }
}