export const Saturate = {
    uniforms: {
        "tDiffuse": { value: null },
        "uTime": { value: null },
        "uNoiseMix": { value: .1 },
    },


vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}`,


fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime; 
    uniform float uNoiseMix;
    varying vec2 vUv;
    
    float rand(vec2 uv) {
        return fract(sin(
            dot(uv, vec2(12.9898, 78.2333))) * 43758.5453123);
    }


    void main() {    
        vec2 uv = vUv;
        vec2 uvScaled = uv;
        uvScaled.x += sin(uTime * (1.0 + sqrt(5.0)) * 0.5);
        uvScaled.y += cos(uTime);
        
        vec3 noise;
        noise = vec3(rand(uvScaled)); 
        vec4 f = vec4(noise, 1.);
        
        
        vec4 texel = texture2D( tDiffuse, vUv );
        float s =(((1. - texel.a) + (1.- texel.g) + (1.-texel.b)) * .7);
        
        //gl_FragColor = texel;
        //gl_FragColor = (texel) + f;
        //gl_FragColor = (texel + mix(texel, f, s)) * .5;
        
        vec4 s2 = texel;        
        gl_FragColor = s2;
    }`,
}